//Global variables
let shouldResetScreen = false;
let firstOperand = "";
let secondOperand = "";
let operator = "";
let isDecimal = false;
let maxLength = 14; //maximum length of number entered by user which can be occupied on screen

//Getting elements from DOM
const userInput = document.getElementById("user-input");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const resultDisplay = document.getElementById("result");
const equalBtn = document.getElementById("equal-btn");
const acBtn = document.getElementById("ac-btn");
const cBtn = document.getElementById("c-btn");
const decimalBtn = document.getElementById("decimal");

//Adding event listeners for these elements
numberButtons.forEach((button) => {
  button.addEventListener("click", () => appendNumber(button.textContent));
});
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => appendOperator(button.textContent));
});
equalBtn.addEventListener("click", getResult);
acBtn.addEventListener("click", clear);
cBtn.addEventListener("click", deleteNumber);
decimalBtn.addEventListener("click", addDecimal);

window.addEventListener("keydown", keyboardInput);

function keyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) {
    appendNumber(e.key);
  } else if (
    e.key === "+" ||
    e.key === "-" ||
    e.key === "/" ||
    e.key === "%") {
      appendOperator(e.key);
  } else if (e.key === ".") {
    addDecimal();
  } else if (
    e.key === "=" ||
    e.key === "Enter") {
      getResult();
  } else if (e.key === "Backspace"){
    deleteNumber();
  } else if (e.key === "*") {
    appendOperator("x");
  }
}

/*
This function ensures that the number entered by user in the result area
is removed.
 */
function resetDisplay() {
  resultDisplay.textContent = "";
  shouldResetScreen = false;
}

/*
This function appends the number to the existing number present in the result area.
 */
function appendNumber(number) {
  //The first comparison ensures that the default 0 is removed before the user enters the number
  if (resultDisplay.textContent === "0" || shouldResetScreen) {
    resetDisplay();
  } else if (resultDisplay.textContent.length === maxLength) {
    return null;
  }
  resultDisplay.append(number);
}

/*
This function:
- Takes the operator & puts it with the previously entered number to the display area.
- Toggles the shouldResetScreen variable to make sure that the current number gets erased.
- Toggles the isDecimal variable to make sure that the user can enter the decimal for second 
operand as well.
- It also ensures that the answer from previous operation can be used for next operation again.
 */
function appendOperator(operation) {
  firstOperand = resultDisplay.textContent;
  operator = operation;

  //This line will add "of" when the operator is "%"
  let showX = (operator === "%") ? "of" : "";

  userInput.textContent = `${firstOperand} ${operator} ${showX}`;
  shouldResetScreen = true;
  isDecimal = false;
}

/*
This function sends both the operands & operators for calculation & displays it in the 
result area.
*/
function getResult() {
  secondOperand = resultDisplay.textContent;

  //This line will add "of" when the operator is "%"
  let showX = (operator === "%") ? "of" : "";

  userInput.textContent = `${firstOperand} ${operator} ${showX} ${secondOperand} =`;
  let answer = calculate(firstOperand, secondOperand, operator);

  //If the answer's length is > 14 then convert it into exponent form
  let answerStr = answer.toString();
  if (answerStr.length > maxLength && answerStr.length <= 21) {
    answer = answer.toExponential(1);
  }

  resultDisplay.textContent = answer;
}

/*
This function is for AC button to make sure everything on the screen gets reset to defualt values.
*/
function clear() {
  userInput.textContent = "";
  resultDisplay.textContent = "0";
  firstOperand = "";
  secondOperand = "";
  operator = "";
}

/*
This function is for C button to delete the last entered number.
*/
function deleteNumber() {
  num = resultDisplay.textContent;
  num = num.slice(0, num.length - 1);
  resultDisplay.textContent = num;
}

/*
This function adds the decimal to the number entered by the user & toggles
the isDecimal variable to makes sure that it appears only once.
 */
function addDecimal() {
  if (isDecimal) {
    return null;
  }
  resultDisplay.append(".");
  isDecimal = true;
}

/*
This function is for doing all the mathematical operations.
It returns the result which is displayed on the screen when the "=" button is pressed.
*/
function calculate(a, b, operator) {
  let num1 = Number(a);
  let num2 = Number(b);

  switch (operator) {
    case "+":
      return num1 + num2;

    case "-":
      return num1 - num2;

    case "x":
      return num1 * num2;

    case "/":
      if (num2 === 0) return "lol!";
      return num1 / num2;

    case "%":
      return (num1 / 100) * num2;

    default:
      return null;
  }
}
