let shouldResetScreen = false;
let firstOperand = "";
let secondOperand = "";
let operator = "";

const userInput = document.getElementById("user-input");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const resultDisplay = document.getElementById("result");
const equalBtn = document.getElementById("equal-btn");
const acBtn = document.getElementById("ac-btn");
const cBtn = document.getElementById("c-btn");

numberButtons.forEach(button => {
  button.addEventListener("click", appendNumber)
});

operatorButtons.forEach(button => {
  button.addEventListener("click", appendOperator)
});

equalBtn.addEventListener("click", getResult);
acBtn.addEventListener("click", clear);
cBtn.addEventListener("click", deleteNumber);


// window.addEventListener("keydown", keyboardInput);

// function keyboardInput(e) {
//   if (e.key >= 0 && e.key <= 9) {
//     console.log(typeof e.key);
//   }
// }

function resetDisplay() {
  resultDisplay.textContent = "";
  shouldResetScreen = false;
}

function appendNumber(e) {
  if (resultDisplay.textContent === "0" || shouldResetScreen) {
    resetDisplay();
  }
  resultDisplay.append(e.target.textContent);
}

function appendOperator(e) {
  // if (resultDisplay.textContent === "0") {
  //   return null;
  // }
  firstOperand = resultDisplay.textContent;
  operator = e.target.textContent;
  userInput.textContent = `${firstOperand} ${operator}`;
  shouldResetScreen = true;
}

function getResult() {
  secondOperand = resultDisplay.textContent;
  userInput.textContent = `${firstOperand} ${operator} ${secondOperand} =`;
  let answer = calculate(firstOperand, secondOperand, operator);
  resultDisplay.textContent = answer;
}

function clear() {
  userInput.textContent = "";
  resultDisplay.textContent = "0";
  firstOperand = "";
  secondOperand = "";
  operator = "";
}

function deleteNumber() {
  num = resultDisplay.textContent;
  num = num.slice(0, num.length - 1);
  resultDisplay.textContent = num;
}

function calculate(a, b, operator) {
  let num1 = Number(a);
  let num2 = Number(b);
  
  switch(operator) {
    case "+":
      return num1 + num2;
    
    case "-":
      return num1 - num2;

    case "x":
      return num1 * num2;

    case "/":
      if (num2 === 0) return "lol!";
      return num1 / num2;

    default:
      return null;
  }
}