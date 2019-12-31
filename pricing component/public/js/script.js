
window.onload = () => {
  
  let switchButton = document.getElementById("toggle-switch");
  let button = document.getElementById("toggle-switch-button");
  
  const planPriceBasic = document.getElementById("plan-price-basic");
  const planPricePro = document.getElementById("plan-price-pro");
  const planPriceMaster = document.getElementById("plan-price-master");

  
  let hasBeenToggled = false;
  
  switchButton.addEventListener("click", () => {
    if (!hasBeenToggled) {
      button.classList.toggle("toggle-annual");
      hasBeenToggled = true;
    } else {
      button.classList.toggle("toggle-monthly");
      button.classList.toggle("toggle-annual");
    }
    
    if (button.classList.contains("toggle-monthly")) {
      planPriceBasic.innerHTML = "19.99";
      planPricePro.innerHTML = "24.99";
      planPriceMaster.innerHTML = "39.99";
    } else if (button.classList.contains("toggle-annual")) {
      planPriceBasic.innerHTML = "199.99";
      planPricePro.innerHTML = "249.99";
      planPriceMaster.innerHTML = "399.99";
    }
  });
  
}