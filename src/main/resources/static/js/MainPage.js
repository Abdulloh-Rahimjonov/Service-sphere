document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".link-btn");
  function animateButtons() {
    buttons.forEach((btn, index) => {
      setTimeout(() => {
        btn.classList.add("pulse");
        setTimeout(() => {
          btn.classList.remove("pulse");
        }, 1000); 
      }, index * 300); 
    });
  }
  setInterval(animateButtons, 8000);
  animateButtons();
});
