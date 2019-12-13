
window.onload = () => {
  
  const startButton = document.getElementById("start");
  
  startButton.addEventListener("click", () => {
    Tone.start();
    let chip8 = new Chip8();
  })
  
  class Chip8 {
    constructor() {
      this.canvas = document.getElementById("canvas");
      this.ctx = this.canvas.getContext("2d");
      
      this.clockRate = 1 / 500;
      
      this.CPU = new CPU();
      this.display = new Display();
      this.keyboard = new Keyboard();
      this.delayTimer = new DelayTimer();
      this.soundTimer = new SoundTimer();
    }
  }
  
  class CPU {
    constructor() {
      
      this.RAM = new Array(0x1000);
      this.V = new Array(0x10);
      this.I = 0x0000;
      
      this.PC = 0x0000;
      this.SP = 0x00;
      
    }
  }
  
  class Display {
    constructor() {
      this.width = 64;
      this.height = 32;
      
      this.screen = [];
      for (let i = 0; i < 64; i++) {
        this.screen[i] = [];
        for (let j = 0; j < 32; j++) {
          this.screen[i][j] = 0;
        }
      }
      
      this.pixelWidth = 10;
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