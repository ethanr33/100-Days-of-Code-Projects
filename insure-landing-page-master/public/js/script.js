
window.onload = () => {
    
  let navToggleButton = document.getElementById("nav-toggle-button");
  let navContainer = document.getElementsByTagName("nav")[0];
  
  let heroImg = document.getElementById("hero-img");
  let heroOverlayLeft = document.getElementById("hero-overlay-left");
  let heroOverlayRight = document.getElementById("hero-overlay-right");
  let ctaOverlay = document.getElementById("cta-bg");
  let footerOverlay = document.getElementById("footer-bg");

  
  let isNavDown = false;
  
  const heroBreakpoint = 1000;
  
  adjustImages();

  navToggleButton.addEventListener("click", () => {
    if (navContainer.classList.length == 0) {
      navContainer.classList.toggle("in");
    } else {
      navContainer.classList.toggle("in");
      navContainer.classList.toggle("out");
    }
    if (!isNavDown) {
      navToggleButton.src = "images/icon-close.svg";
    } else {
      navToggleButton.src = "images/icon-hamburger.svg";
    }
    isNavDown = !isNavDown;
  })
  
  window.addEventListener("resize", () => {
    adjustImages();
  });
  
  function adjustImages() {
    if (window.screen.width >= heroBreakpoint) {
      heroImg.src = "images/image-intro-desktop.jpg";
      heroOverlayLeft.src = "images/bg-pattern-intro-left-desktop.svg";
      heroOverlayRight.src = "images/bg-pattern-intro-right-desktop.svg";
      ctaOverlay.src = "images/bg-pattern-how-we-work-desktop.svg";
      footerOverlay.src = "images/bg-pattern-footer-desktop.svg";
    } else {
      heroImg.src = "images/image-intro-mobile.jpg";
      heroOverlayLeft.src = "images/bg-pattern-intro-left-mobile.svg";
      heroOverlayRight.src = "images/bg-pattern-intro-right-mobile.svg";
      ctaOverlay.src = "images/bg-pattern-how-we-work-mobile.svg";
      footerOverlay.src = "images/bg-pattern-footer-mobile.svg";
    }
  }
  
}