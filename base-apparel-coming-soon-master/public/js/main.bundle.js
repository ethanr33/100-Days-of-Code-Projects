"use strict";

window.onload = function () {

  var emailInput = document.getElementById("email-input");
  var warningIcon = document.getElementById("warning-icon");
  var feedbackText = document.getElementById("feedback");

  var submitButton = document.getElementById("button-div");

  submitButton.addEventListener("click", function () {
    var userInput = emailInput.value;
    if (!validateInput(userInput)) {
      giveErrorMessage();
    } else {
      clearErrorMessage();
    }
  });

  var validateInput = function validateInput(input) {
    if (input.length == 0) {
      return false;
    } else if (!validateEmail(input)) {
      return false;
    } else {
      return true;
    }
  };

  var validateEmail = function validateEmail(email) {
    var expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    return expression.test(String(email).toLowerCase());
  };

  var giveErrorMessage = function giveErrorMessage() {
    emailInput.classList.add("highlighted");
    warningIcon.classList.remove("hidden");
    feedbackText.innerHTML = "Please provide a valid email";
  };

  var clearErrorMessage = function clearErrorMessage() {
    emailInput.classList.toggle("highlighted");
    warningIcon.classList.toggle("hidden");
    feedbackText.innerHTML = "";
  };
};
