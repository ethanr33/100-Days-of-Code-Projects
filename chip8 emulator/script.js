
window.onload = () => {
  
  const startButton = document.getElementById("start");
  
  startButton.addEventListener("click", () => {
    Tone.start();
    let chip8 = new Chip8();
    chip8.start();
  })
  
  class Chip8 {
    constructor() {
      this.canvas = document.getElementById("canvas");
      this.ctx = this.canvas.getContext("2d");
      
      this.clockRate = 1 / 500;
      
      this.CPU = new CPU(this);
      this.display = new Display(this);
      this.keyboard = new Keyboard();
      this.delayTimer = new DelayTimer();
      this.soundTimer = new SoundTimer();
            
      this.loadedProgram = "";
      
      this.isRunning = false;
      this.isWaiting = false;
          
    }
    start() {
      this.isRunning = true;
      this.loadGame("roms/TETRIS");
      setInterval(() => {
        if (this.isRunning) {
          this.cycle();
        }
      }, this.clockRate);
    }
    cycle() {
      if (!this.isWaiting) {
        this.CPU.cycle();
        this.display.drawScreen();
      }
    }
    loadGame(game) {
      var req = new XMLHttpRequest();
      let self = this;
       req.open("GET", game, true);
       req.overrideMimeType('text/plain; charset=x-user-defined');
       req.responseType = 'arraybuffer';
       req.onreadystatechange = function() {
           if (req.readyState !== 4)  { return; }
           if (req.status !== 200)  {
               console.error('Could not load ROM file: ' + req.statusText);
           }
       };
       req.onload = function () {
           let view = new DataView(req.response);
           let memory = "";
           for (let i = 0; i < view.byteLength; i++) {
             let value = view.getUint8(i).toString(16);
             if (parseInt(value, 16) < 16) {
                value = "0" + value;
             }
             if (parseInt(value, 16) == 0) {
               value = "00";
             }
             self.CPU.RAM[0x200 + i] = value;
           }
           console.log(self.CPU.RAM);
       };
       req.onerror = function () {
           console.error('Could not load ROM file');
       };
       req.send();
    }
  }
  
  class CPU {
    constructor(chip8) {
      
      this.chip8 = chip8;
      
      this.RAM = new Array(0x1000);
      this.clearRAM();
      
      this.V = new Array(0x10);
      this.V.fill(0);
      
      this.I = 0x0000;
      
      this.programStart = 0x200;
      
      this.PC = this.programStart;
      this.SP = 0x00;
      
      this.stack = new Array(16);
      this.stack.fill(0);
      
      this.resetCPU();
      
    }
    clearRAM() {
      this.RAM.forEach(code => {
        code = "";
      })
    }
    resetCPU() {
      this.clearRAM();
      
      this.V.fill("00");
      
      this.stack.fill(0);
      
      this.generateNumberSprites();
    }
    generateNumberSprites() {
      this.RAM[0] = "F0";
      this.RAM[1] = "90";
      this.RAM[2] = "90";
      this.RAM[3] = "90";
      this.RAM[4] = "F0";
      
      this.RAM[5] = "20";
      this.RAM[6] = "60";
      this.RAM[7] = "20";
      this.RAM[8] = "20";
      this.RAM[9] = "70";
      
      this.RAM[10] = "F0";
      this.RAM[11] = "10";
      this.RAM[12] = "F0";
      this.RAM[13] = "80";
      this.RAM[14] = "F0";
      
      this.RAM[15] = "F0";
      this.RAM[16] = "10";
      this.RAM[17] = "F0";
      this.RAM[18] = "10";
      this.RAM[19] = "F0";
      
      this.RAM[20] = "90";
      this.RAM[21] = "90";
      this.RAM[22] = "F0";
      this.RAM[23] = "10";
      this.RAM[24] = "10";
      
      this.RAM[25] = "F0";
      this.RAM[26] = "80";
      this.RAM[27] = "F0";
      this.RAM[28] = "10";
      this.RAM[29] = "F0";
      
      this.RAM[30] = "F0";
      this.RAM[31] = "80";
      this.RAM[32] = "F0";
      this.RAM[33] = "90";
      this.RAM[34] = "F0";
      
      this.RAM[35] = "F0";
      this.RAM[36] = "10";
      this.RAM[37] = "20";
      this.RAM[38] = "40";
      this.RAM[39] = "40";

      this.RAM[40] = "F0";
      this.RAM[41] = "90";
      this.RAM[42] = "F0";
      this.RAM[43] = "90";
      this.RAM[44] = "F0";

      this.RAM[45] = "F0";
      this.RAM[46] = "90";
      this.RAM[47] = "F0";
      this.RAM[48] = "10";
      this.RAM[49] = "F0";

      this.RAM[50] = "F0";
      this.RAM[51] = "90";
      this.RAM[52] = "F0";
      this.RAM[53] = "90";
      this.RAM[54] = "90";
      
      this.RAM[55] = "E0";
      this.RAM[56] = "90";
      this.RAM[57] = "E0";
      this.RAM[58] = "90";
      this.RAM[59] = "E0";
      
      this.RAM[60] = "F0";
      this.RAM[61] = "80";
      this.RAM[62] = "80";
      this.RAM[63] = "80";
      this.RAM[64] = "F0";
      
      this.RAM[65] = "E0";
      this.RAM[66] = "90";
      this.RAM[67] = "90";
      this.RAM[68] = "90";
      this.RAM[69] = "E0";

      this.RAM[70] = "F0";
      this.RAM[71] = "80";
      this.RAM[72] = "F0";
      this.RAM[73] = "80";
      this.RAM[74] = "F0";

      this.RAM[75] = "F0";
      this.RAM[76] = "80";
      this.RAM[77] = "F0";
      this.RAM[78] = "80";
      this.RAM[79] = "80";

    }
    cycle() {
      let curCode = this.RAM[this.PC] + this.RAM[this.PC + 1];
      this.runCommandFromCode(curCode);
      console.log(this.PC, curCode, this.SP, this.I, this.V);
      if (this.SP > 15) {
        this.chip8.isRunning = false;
        throw new Error("Call stack size exceeded");
      }
      for (let i = 0; i < this.V.length; i++) {
        let curRegister = this.V[i];
        while(curRegister > 255) {
          curRegister -= 255;
        }
        this.V[i] = parseInt(curRegister, 16).toString(16);
      }
      this.PC += 2;
    }
    runCommandFromCode(code) {
      let arg1 = parseInt(code.charAt(1), 16);
      let arg2 = parseInt(code.charAt(2), 16);
      let arg3 = parseInt(code.charAt(3), 16);
      if (code.toLowerCase() == "00e0") {
        this.chip8.display.clearScreen();
      } else if (code.toLowerCase() == "00ee") {
        this.PC = this.stack.pop();
        this.SP -= 1;
      } else if (code.charAt(0) == "1") {
        this.PC = parseInt(arg1.toString(16) + arg2.toString(16) + arg3.toString(16), 16) - 2;
      } else if (code.charAt(0) == "2") {
        this.SP++;
        this.stack.push(this.PC);
        this.PC = (256 * arg1) + (16 * arg2) + arg3;
      } else if (code.charAt(0) == "3") {
        if (parseInt(this.V[arg1], 16) == parseInt(arg2.toString(16) + arg3.toString(16), 16)) {
          this.PC += 2;
        }
      } else if (code.charAt(0) == "4") {
        if (parseInt(this.V[arg1], 16) != (16 * arg2) + arg3) {
          this.PC += 2;
        }
      } else if (code.charAt(0) == "5") {
        if (parseInt(this.V[arg1], 16) == parseInt(this.V[arg2], 16)) {
          this.PC += 2;
        }
      } else if (code.charAt(0) == "6") {
        this.V[arg1] = arg2.toString(16) + arg3.toString(16)
      } else if (code.charAt(0) == "7") {
        this.V[arg1] = (parseInt(arg2.toString(16) + arg3.toString(16), 16) + parseInt(this.V[arg1], 16)).toString(16);
      } else if (code.charAt(0) == "8" && code.charAt(3) == "0") {
        this.V[arg1] = this.V[arg2];
      } else if (code.charAt(0) == "8" && code.charAt(3) == "1") {
        this.V[arg1] = (parseInt(this.V[arg1], 16) | parseInt(this.V[arg2], 16)).toString(16);
      } else if (code.charAt(0) == "8" && code.charAt(3) == "2") {
        this.V[arg1] = (parseInt(this.V[arg1], 16) & parseInt(this.V[arg2], 16)).toString(16);
      } else if (code.charAt(0) == "8" && code.charAt(3) == "3") {
        this.V[arg1] = (parseInt(this.V[arg1], 16) ^ parseInt(this.V[arg2], 16)).toString(16);
      } else if (code.charAt(0) == "8" && code.charAt(3) == "4") {
        let sum = parseInt(this.V[arg1], 16) + parseInt(this.V[arg2], 16);
        if (sum > 255) {
          sum -= 255;
          this.V[15] = "01";
        }
        this.V[arg1] = sum.toString(16);
      } else if (code.charAt(0) == "8" && code.charAt(3) == "5") {
        let diff = parseInt(this.V[arg1], 16) - parseInt(this.V[arg2], 16);
        if (diff > 0) {
          this.V[15] = "01";
        } else {
          this.V[15] = "00";
        }
        this.V[arg1] = diff.toString(16);
      } else if (code.charAt(0) == "8" && code.charAt(3) == "6") {
        if (parseInt(this.V[arg1], 16) % 2 == 1) {
          this.V[15] = "01";
        } else {
          this.V[15] = "00";
        }
        this.V[arg1] = (parseInt(this.V[arg1], 16) / 2, 16).toString(16)
      } else if (code.charAt(0) == "8" && code.charAt(3) == "7") {
        let diff = parseInt(this.V[arg2], 16) - parseInt(this.V[arg1], 16);
        if (diff > 0) {
          this.V[15] = "01";
        } else {
          this.V[15] = "00";
        }
        this.V[arg1] = diff.toString(16);
      } else if (code.charAt(0) == "8" && code.charAt(3).toLowerCase() == "e") {
        if (Math.log2(parseInt(this.V[arg1], 16)) >= 8) {
          this.V[15] = "01";
        } else {
          this.V[15] = "00";
        }
        this.V[arg1] = (parseInt(this.V[arg1], 16) * 2, 16).toString(16);
      } else if (code.charAt(0) == "9") {
        if (this.V[arg1] != this.V[arg2]) {
          this.PC += 2;
        }
      } else if (code.charAt(0).toLowerCase() == "a") {
        this.I = ((256 * arg1) + (16 * arg2) + arg3);
      } else if (code.charAt(0).toLowerCase() == "b") {
        this.PC = (256 * arg1) + (16 * arg2) + arg3 + parseInt(this.V[0], 16);
      } else if (code.charAt(0).toLowerCase() == "c") {
        let rand = Math.floor((Math.random() * 256));
        this.V[arg1] = (parseInt((16 * arg2) + arg3, 16) & rand).toString(16);
      } else if (code.charAt(0).toLowerCase() == "d") {
        let x = parseInt(this.V[arg1], 16);
        let y = parseInt(this.V[arg2], 16);
        
        let memIndex = this.I;
        
        let curRow = 0;
        
        this.V[15] = "00";
        
        for (let i = 0; i < arg3; i++) {
          x = parseInt(this.V[arg1], 16);
          y = y % 32;
          let rowVal = parseInt(this.RAM[memIndex], 16).toString(2).padStart(8, "0");
          for (let j = 0; j < 8; j++) {
              x = x % 64;
              let pixelVal = parseInt(rowVal.charAt(j));
              let override = this.chip8.display.drawPixel(x, y, pixelVal);
              if (override) {
                this.V[15] = "01";
              }
              x++;
          }
          y++;
          memIndex++;
        }
      } else if (code.charAt(0).toLowerCase() == "e" && code.substring(2, 4).toLowerCase() == "9e") {
        let keyIndex = parseInt(this.V[arg1], 16);
        if (this.chip8.keyboard.keyStatuses[keyIndex] == true) {
          this.PC += 2;
        }
      } else if (code.charAt(0).toLowerCase() == "e" && code.substring(2, 4).toLowerCase() == "a1") {
        let keyIndex = parseInt(this.V[arg1], 16);
        if (this.chip8.keyboard.keyStatuses[keyIndex] != true) {
          this.PC += 2;
        }
      } else if (code.charAt(0).toLowerCase() == "f" && code.substring(2, 4) == "07") {
        this.V[arg1] = (this.chip8.delayTimer.timer).toString(16);
      } else if (code.charAt(0).toLowerCase() == "f" && code.substring(2, 4).toLowerCase() == "0a") {
        this.chip8.isWaiting = true;
        
        let keyPressed;
        
        console.log("waiting...");
        
        setInterval(() => {
          if (this.chip8.isWaiting) {
            for (let i = 0; i < this.chip8.keyboard.keyStatuses.length; i++) {
              let curKey = this.chip8.keyboard.keyStatuses[i];
              if (curKey) {
                keyPressed = i;
                this.V[arg1] = keyPressed.toString(16);
                this.chip8.isWaiting = false;
                console.log("got it!");
              }
            }
          }
        }, 1/60);
                
      } else if (code.charAt(0).toLowerCase() == "f" && code.substring(2, 4) == "15") {
        this.chip8.delayTimer.timer = parseInt(this.V[arg1], 16);
      } else if (code.charAt(0).toLowerCase() == "f" && code.substring(2, 4) == "18") {
        this.chip8.soundTimer.timer = parseInt(this.V[arg1], 16);
      } else if (code.charAt(0).toLowerCase() == "f" && code.substring(2, 4).toLowerCase() == "1e") {
        this.I = this.I + parseInt(this.V[arg1], 16);
      } else if (code.charAt(0).toLowerCase() == "f" && code.substring(2, 4) == "29") {
        this.I = 5 * parseInt(this.V[arg1], 16);
      } else if (code.charAt(0).toLowerCase() == "f" && code.substring(2, 4) == "33") {
        let num = parseInt(this.V[arg1], 16);
        
        let hundreds = Math.floor(num / 100).toString(16);
        let tens = Math.floor((num % 100) / 10).toString(16);
        let ones = (num % 10).toString(16);
        
        this.RAM[this.I] = hundreds.toString(16);
        this.RAM[this.I + 1] = tens.toString(16);
        this.RAM[this.I + 2] = ones.toString(16);
      } else if (code.charAt(0).toLowerCase() == "f" && code.substring(2, 4) == "55") {
        for (let i = 0; i < arg1 + 1; i++) {
          this.RAM[this.I + i] = this.V[i];
        }
      } else if (code.charAt(0).toLowerCase() == "f" && code.substring(2, 4) == "65") {
        for (let i = 0; i < arg1 + 1; i++) {
          this.V[i] = this.RAM[this.I + i];
        }
      }
    }
  }
  
  class Display {
    constructor(chip8) {
      
      this.chip8 = chip8;
      
      this.width = 64;
      this.height = 32;
      
      this.screen = [];
      this.clearScreen();
      
      this.pixelSize = 10;
    }
    drawScreen() {
      for (let i = 0; i < 64; i++) {
        for (let j = 0; j < 32; j++) {
          let val = this.screen[i][j];
          if (val == 0) {
            this.chip8.ctx.fillRect(i * 10, j * 10, this.pixelSize, this.pixelSize);
          } else {
            this.chip8.ctx.clearRect(i * 10, j * 10, this.pixelSize, this.pixelSize);
          }
        }
      }
    }
    drawPixel(x, y, val) {
      let prev = this.screen[x][y];
      this.screen[x][y] = val ^ prev;
      if (this.screen[x][y] == 0 && prev == 1) {
        return true;
      } else {
        return false;
      }
    }
    clearScreen() {
      for (let i = 0; i < 64; i++) {
        this.screen[i] = [];
        for (let j = 0; j < 32; j++) {
          this.screen[i][j] = 0;
        }
      }
    }
  }
  
  class Keyboard {
    constructor() {
      
      this.keyStatuses = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
      
      window.addEventListener("keydown", e => {
        this.activateKeys(e);
      });
      
      window.addEventListener("keyup", e => {
        this.deactivateKeys(e);
      });      

    }
    activateKeys(e) {
      if (e.which == 65) {
        this.keyStatuses[0] = true;
      }
      if (e.which == 83) {
        this.keyStatuses[1] = true;
      }
      if (e.which == 68) {
        this.keyStatuses[2] = true;
      }
      if (e.which == 70) {
        this.keyStatuses[3] = true;
      }
      if (e.which == 71) {
        this.keyStatuses[4] = true;
      }
      if (e.which == 72) {
        this.keyStatuses[5] = true;
      }
      if (e.which == 74) {
        this.keyStatuses[6] = true;
      }
      if (e.which == 75) {
        this.keyStatuses[7] = true;
      }
      if (e.which == 76) {
        this.keyStatuses[8] = true;
      }
      if (e.which == 90) {
        this.keyStatuses[9] = true;
      }
      if (e.which == 88) {
        this.keyStatuses[10] = true;
      }
      if (e.which == 67) {
        this.keyStatuses[11] = true;
      }
      if (e.which == 86) {
        this.keyStatuses[12] = true;
      }
      if (e.which == 66) {
        this.keyStatuses[13] = true;
      }
      if (e.which == 78) {
        this.keyStatuses[14] = true;
      }
      if (e.which == 77) {
          this.keyStatuses[15] = true;
      }      
    }
    deactivateKeys(e) {
        if (e.which == 65) {
            this.keyStatuses[0] = false;
        }
        if (e.which == 83) {
            this.keyStatuses[1] = false;
        }
        if (e.which == 68) {
            this.keyStatuses[2] = false;
        }
        if (e.which == 70) {
            this.keyStatuses[3] = false;
        }
        if (e.which == 71) {
            this.keyStatuses[4] = false;
        }
        if (e.which == 72) {
            this.keyStatuses[5] = false;
        }
        if (e.which == 74) {
            this.keyStatuses[6] = false;
        }
        if (e.which == 75) {
            this.keyStatuses[7] = false;
        }
        if (e.which == 76) {
            this.keyStatuses[8] = false;
        }
        if (e.which == 90) {
            this.keyStatuses[9] = false;
        }
        if (e.which == 88) {
            this.keyStatuses[10] = false;
        }
        if (e.which == 67) {
            this.keyStatuses[11] = false;
        }
        if (e.which == 86) {
            this.keyStatuses[12] = false;
        }
        if (e.which == 66) {
            this.keyStatuses[13] = false;
        }
        if (e.which == 78) {
            this.keyStatuses[14] = false;
        }
        if (e.which == 77) {
            this.keyStatuses[15] = false;
        }      
    }
  }
  
  class DelayTimer {
    constructor() {
      this.timer = 0;
      this.timerRate = 1 / 60;
      
      setInterval(() => {
        if (this.timer > 0) {
          this.timer -= 1;
        }
      }, this.timerRate);
    }
  }
  
  class SoundTimer {
    constructor() {
      this.timer = 0;
      this.timerRate = 1 / 60;
      
      this.synth = new Tone.Synth().toMaster();
      
      this.isSoundPlaying = false;
      
      setInterval(() => {
        if (this.timer > 0) {
          this.timer -= 1;
          if (!this.isSoundPlaying) {
            this.isSoundPlaying = true;
            this.playSound();
          }
        } else {
          this.stopSound();
          this.isSoundPlaying = false;
        }
      }, this.timerRate);
      
    }
    playSound() {
      this.synth.triggerAttack("C4");
    }
    stopSound() {
      this.synth.triggerRelease();
    }
  }
  
}