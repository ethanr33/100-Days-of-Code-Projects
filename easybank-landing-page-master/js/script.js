
window.onload = () => {

  let navToggleButton = document.getElementById("nav-toggle-button");
  let navContainer = document.querySelector("nav");
  let navBackground = document.getElementById("bg-cover");
  let backgroundIntro = document.getElementById("bg-intro");
  
  let isNavActive = false;
  
  let updateImages = () => {
    if (window.innerWidth + 30 <= 1024) {
      backgroundIntro.src = "images/bg-intro-mobile.svg";
    } else {
      backgroundIntro.src = "images/bg-intro-desktop.svg";
    }
  }
  
  navToggleButton.addEventListener("click", () => {
    if (isNavActive) {
      navToggleButton.src = "images/icon-hamburger.svg";
    } else {
      navToggleButton.src = "images/icon-close.svg";
    }
    navContainer.classList.toggle("hidden");
    navBackground.classList.toggle("hidden");
    isNavActive = !isNavActive;
  });
  
  window.addEventListener("resize", () => {
    updateImages();
  });
  
  updateImages();

}