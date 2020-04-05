
window.onload = () => {
  
  let modeToggler = document.getElementById("toogleA");
  
  let headerText = document.querySelectorAll(".text-header");
  let numText = document.querySelectorAll(".text-number");
  let cards = document.querySelectorAll(".card");
  let descText = document.querySelectorAll(".desc-text");
  let statText = document.querySelectorAll(".text-stat");
  let subtitleText = document.querySelectorAll(".text-subtitle");

  
  let header = document.querySelector("header");
  
  modeToggler.addEventListener("change", () => {
    
    cards.forEach(element => {
      element.classList.toggle("bg-light-grayish-blue");
      element.classList.toggle("bg-dark-desaturated-blue");
      
      element.classList.toggle("hover:bg-light-grayish-blue");
      element.classList.toggle("hover:bg-card-dark-hover");
      
      element.classList.toggle("shadow");
      element.classList.toggle("shadow-md");
    })
    
    header.classList.toggle("bg-very-pale-blue");
    header.classList.toggle("bg-very-dark-blue-bg");
    
    headerText.forEach(element => {
      element.classList.toggle("text-very-dark-blue");
      element.classList.toggle("text-white");
    });
    
    numText.forEach(element => {
      element.classList.toggle("text-very-dark-blue");
      element.classList.toggle("text-white");
    });
    
    statText.forEach(element => {
      element.classList.toggle("text-very-dark-grayish-blue");
      element.classList.toggle("text-white");
    });   
    
    descText.forEach(element => {
      element.classList.toggle("text-dark-grayish-blue");
      element.classList.toggle("text-white");
    });
    
    subtitleText.forEach(element => {
      element.classList.toggle("text-dark-grayish-blue");
      element.classList.toggle("text-desaturated-blue");
    })
    
    document.querySelector("body").classList.toggle("bg-very-dark-blue");
    
    document.querySelector(".toggle__dot").classList.toggle("bg-white");
    document.querySelector(".toggle__dot").classList.toggle("bg-very-dark-blue-bg");
    
    document.querySelector(".toggle__line").classList.toggle("toggle-bg");
  });
  
}