
window.onload = () => {
  
  let navScreen = document.getElementsByTagName("nav")[0];
  let navToggleButton = document.getElementById("nav-toggle-button");
  
  let darkHeaderElements = document.querySelectorAll(".dark");
  
  let appletSelections = document.querySelectorAll(".features-applet-choice");
  
  let appletDescHeader = document.querySelector(".applet-desc-header");
  let appletDescText = document.querySelector(".applet-desc-text");
  let appletImg = document.getElementById("applet-img");
  
  let faqQuestions = document.querySelectorAll(".faq-question");
  
  let emailInput = document.querySelector(".cta-email");
  let emailInputContainer = document.querySelector(".cta-email-container");
  let emailSubmit = document.querySelector(".cta-submit");
  
  navToggleButton.addEventListener("click", () => {
    if (navScreen.classList.length == 0) {
      navScreen.classList.add("in");
    } else {
      navScreen.classList.toggle("in");
      navScreen.classList.toggle("out");
    }
    //setTimeout to account for delay in animation reaching top of screen
    setTimeout(() => {
      darkHeaderElements.forEach(elem => {
        elem.classList.toggle("dark");
        elem.classList.toggle("light");
      })
    }, 100)
  });
  
  appletSelections.forEach(selection => {
    selection.addEventListener("click", () => {
      if (selection.id == "simple-bookmarking") {
        appletImg.src = "images/illustration-features-tab-1.svg";
        changeText(appletDescHeader, "Simple Bookmarking");
        changeText(appletDescText, "Organize your bookmarks however you like. Our simple drag-and-drop interface gives you complete control over how you manage your favourite sites.");
      } else if (selection.id == "speedy-searching") {
        appletImg.src = "images/illustration-features-tab-2.svg";
        changeText(appletDescHeader, "Intelligent search");
        changeText(appletDescText, "Our powerful search feature will help you find saved sites in no time at all. No need to trawl through all of your bookmarks.");
      } else if (selection.id == "easy-sharing") {
        appletImg.src = "images/illustration-features-tab-3.svg";
        changeText(appletDescHeader, "Share your bookmarks");
        changeText(appletDescText, "Easily share your bookmarks and collections with others. Create a shareable link that you can send at the click of a button.");
      }
      appletSelections.forEach(elem => {
        if (elem.id != selection.id) {
          elem.classList.remove("selected")
        }
      })
      selection.classList.add("selected");
    });
  })
  
  faqQuestions.forEach(question => {
    question.addEventListener("click", () => {
      question.classList.toggle("active");
    });
  });
  
  emailSubmit.addEventListener("click", () => {
    let userInput = emailInput.value;
    if (!validateEmail(userInput)) {
      if (!emailInputContainer.classList.contains("highlighted")) {
        emailInputContainer.classList.add("highlighted");
      }
    } else {
      if (emailInputContainer.classList.contains("highlighted")) {
        emailInputContainer.classList.remove("highlighted");
      }
    }
  });
  
  function validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
  }
  
  function changeText(element, newText) {
    element.textContent = newText;
  }
  
}