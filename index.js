const calcDisplay = document.querySelector(".calc-display");;

const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    let num = e.target.textContent;
    calcDisplay.textContent = num;
    console.log(num);
  })
});