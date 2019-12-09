"use strict";

window.onload = function () {

  var localStorage = window.localStorage;

  var gameContainer = document.getElementById("game-container");

  var scoreText = document.getElementById("score");

  var rockButton = document.getElementById("rock-button-container");
  var paperButton = document.getElementById("paper-button-container");
  var scissorsButton = document.getElementById("scissors-button-container");
  var lizardButton = document.getElementById("lizard-button-container");
  var spockButton = document.getElementById("spock-button-container");

  var rulesButton = document.getElementById("rules-button-container");
  var rulesContainer = document.getElementById("rules-container");
  var closeRulesButton = document.getElementById("rules-exit");

  var rulesActive = false;

  var resultsViewContainer = document.getElementById("results-view-container");
  var resultsText = document.getElementById("results");
  var playerPickIcon = document.getElementById("pick-icon");
  var playerPickIconContainer = document.getElementById("pick-icon-container");
  var computerPickIcon = document.getElementById("com-icon");
  var computerPickIconContainer = document.getElementById("com-icon-container");
  var redoButton = document.getElementById("redo");

  var buttonIcons = document.querySelectorAll(".button-chooser-container");

  var choices = {
    ROCK: "rock",
    PAPER: "paper",
    SCISSORS: "scissors",
    LIZARD: "lizard",
    SPOCK: "spock",
    NONE: "none"
  };

  var playerChoice = choices.NONE;
  var computerChoice = choices.NONE;

  var score = void 0;

  if (localStorage.getItem("score") === null) {
    score = 0;
    localStorage.setItem("score", "0");
  } else {
    score = localStorage.getItem("score");
  }

  updateScore(score);

  rulesButton.addEventListener("click", function () {
    if (rulesContainer.classList.length == 0) {
      rulesContainer.classList.toggle("rules-open");
    } else {
      rulesContainer.classList.toggle("rules-open");
      rulesContainer.classList.toggle("rules-closed");
    }
    rulesActive = true;
  });

  closeRulesButton.addEventListener("click", function () {
    rulesContainer.classList.toggle("rules-closed");
    rulesContainer.classList.toggle("rules-open");
    rulesActive = false;
  });

  buttonIcons.forEach(function (icon) {
    icon.addEventListener("click", function () {
      if (!rulesActive) {
        if (gameContainer.classList.length == 0) {
          gameContainer.classList.toggle("chooser-closed");
        } else {
          gameContainer.classList.toggle("chooser-open");
          gameContainer.classList.toggle("chooser-closed");
        }
        if (resultsViewContainer.classList.length == 0) {
          resultsViewContainer.classList.toggle("results-open");
        } else {
          resultsViewContainer.classList.toggle("results-open");
          resultsViewContainer.classList.toggle("results-closed");
        }
      }
    });
  });

  redoButton.addEventListener("click", function () {
    gameContainer.classList.toggle("chooser-open");
    gameContainer.classList.toggle("chooser-closed");
    resultsViewContainer.classList.toggle("results-open");
    resultsViewContainer.classList.toggle("results-closed");
  });

  rockButton.addEventListener("click", function () {
    handleChoice(choices.ROCK);
  });

  paperButton.addEventListener("click", function () {
    handleChoice(choices.PAPER);
  });

  scissorsButton.addEventListener("click", function () {
    handleChoice(choices.SCISSORS);
  });

  lizardButton.addEventListener("click", function () {
    handleChoice(choices.LIZARD);
  });

  spockButton.addEventListener("click", function () {
    handleChoice(choices.SPOCK);
  });

  function getWinner(p1, p2) {
    if (p1 == "rock") {
      if (p2 == "scissors" || p2 == "lizard") {
        return 2;
      } else if (p2 == "spock" || p2 == "paper") {
        return -1;
      }
    } else if (p1 == "paper") {
      if (p2 == "rock" || p2 == "spock") {
        return 2;
      } else if (p2 == "scissors" || p2 == "lizard") {
        return -1;
      }
    } else if (p1 == "scissors") {
      if (p2 == "paper" || p2 == "lizard") {
        return 2;
      } else if (p2 == "rock" || p2 == "spock") {
        return -1;
      }
    } else if (p1 == "lizard") {
      if (p2 == "spock" || p2 == "paper") {
        return 2;
      } else if (p2 == "scissors" || p2 == "rock") {
        return -1;
      }
    } else if (p1 == "spock") {
      if (p2 == "scissors" || p2 == "rock") {
        return 2;
      } else if (p2 == "lizard" || p2 == "paper") {
        return -1;
      }
    }
    return 0;
  }

  function getComputerChoice() {
    var rand = Math.floor(5 * Math.random() + 1);
    if (rand == 1) {
      return choices.ROCK;
    } else if (rand == 2) {
      return choices.PAPER;
    } else if (rand == 3) {
      return choices.SCISSORS;
    } else if (rand == 4) {
      return choices.LIZARD;
    }
    return choices.SPOCK;
  }

  function handleChoice(choice) {
    playerChoice = choice;
    computerChoice = getComputerChoice();

    var winnerNum = getWinner(playerChoice, computerChoice);
    score = (parseInt(score) + winnerNum).toString();

    if (winnerNum == -1) {
      resultsText.innerHTML = "YOU LOSE!";
    } else if (winnerNum == 2) {
      resultsText.innerHTML = "YOU WIN!";
    } else {
      resultsText.innerHTML = "TIE!";
    }

    showChoices(playerChoice, computerChoice);

    updateScore(score);
  }

  function updateScore(newScore) {
    localStorage.setItem("score", newScore);
    scoreText.innerHTML = localStorage.getItem("score");
  }

  function showChoices(choice, computer) {
    playerPickIcon.src = "images/icon-" + choice + ".svg";
    computerPickIcon.src = "images/icon-" + computer + ".svg";
    if (choice == "rock") {
      playerPickIconContainer.style.background = "radial-gradient(hsl(349, 71%, 52%), hsl(349, 70%, 56%))";
    } else if (choice == "paper") {
      playerPickIconContainer.style.background = "radial-gradient(hsl(230, 89%, 62%), hsl(230, 89%, 65%))";
    } else if (choice == "scissors") {
      playerPickIconContainer.style.background = "radial-gradient(hsl(39, 89%, 49%), hsl(40, 84%, 53%))";
    } else if (choice == "lizard") {
      playerPickIconContainer.style.background = "radial-gradient(hsl(261, 73%, 60%), hsl(261, 72%, 63%))";
    } else if (choice == "spock") {
      playerPickIconContainer.style.background = "radial-gradient(hsl(189, 59%, 53%), hsl(189, 58%, 57%))";
    }
    if (computer == "rock") {
      computerPickIconContainer.style.background = "radial-gradient(hsl(349, 71%, 52%), hsl(349, 70%, 56%))";
    } else if (computer == "paper") {
      computerPickIconContainer.style.background = "radial-gradient(hsl(230, 89%, 62%), hsl(230, 89%, 65%))";
    } else if (computer == "scissors") {
      computerPickIconContainer.style.background = "radial-gradient(hsl(39, 89%, 49%), hsl(40, 84%, 53%))";
    } else if (computer == "lizard") {
      computerPickIconContainer.style.background = "radial-gradient(hsl(261, 73%, 60%), hsl(261, 72%, 63%))";
    } else if (computer == "spock") {
      computerPickIconContainer.style.background = "radial-gradient(hsl(189, 59%, 53%), hsl(189, 58%, 57%))";
    }
  }
};
