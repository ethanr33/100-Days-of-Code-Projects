
window.onload = () => {
  
    const emailInput = document.getElementById("user-input");
    const submitButton = document.getElementById("submit");
    const userFeedback = document.getElementById("input-feedback");
    
    submitButton.addEventListener("click", () => {
      let userInput = emailInput.value;
      if (!isValidEmail(userInput)) {
        userFeedback.classList.remove("hidden");
        emailInput.classList.add("highlighted");
      } else {
        userFeedback.classList.add("hidden");
        emailInput.classList.remove("highlighted");
      }
    });
    
    const isValidEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }
  
}