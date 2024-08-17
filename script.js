let firstOperand = '';
let secondOperand = '';
let currentOperation = null;
let shouldResetScreen = false;
let shouldClearScreen = false;

const numButs = document.querySelectorAll('[data-number]');
const opButs = document.querySelectorAll('[data-operator]');
const equalsBut = document.getElementById('equalsBtn');
const clearBut = document.getElementById('clearBtn');
const deleteBut = document.getElementById('deleteBtn');
const pointBut = document.getElementById('pointBtn');
const lastScreen = document.getElementById('last');
const currentScreen = document.getElementById('current');

equalsBut.addEventListener('click', evaluate);
clearBut.addEventListener('click', clear);
deleteBut.addEventListener('click', deleteNumber);
pointBut.addEventListener('click', appendPoint);

numButs.forEach((button) =>
    button.addEventListener('click', () => appendNumber(button.textContent))
);

opButs.forEach((button) =>
    button.addEventListener('click', () => setOperation(button.textContent))
);

function appendNumber(num) {
    if (shouldClearScreen) clear();
    if (currentScreen.textContent === '0' || shouldResetScreen) resetScreen();
    currentScreen.textContent += num;
}

function resetScreen() {
    currentScreen.textContent = '';
    shouldResetScreen = false;
}

function setOperation(operator) {
    if (currentOperation !== null) evaluate();
    if (shouldClearScreen) {
        return;
    }
    firstOperand = currentScreen.textContent;
    currentOperation = operator;
    lastScreen.textContent = `${firstOperand} ${currentOperation}`;
    shouldResetScreen = true;
}

function evaluate() {
    if (currentOperation === null || shouldResetScreen || shouldClearScreen) return;
    if (currentOperation === '÷' && currentScreen.textContent === '0') {
        lastScreen.textContent = 'Error';
        currentScreen.textContent = 'Cannot divide by zero';
        shouldClearScreen = true;
        return;
    }
    secondOperand = currentScreen.textContent;
    currentScreen.textContent = roundResult(
        operate(currentOperation, firstOperand, secondOperand)
    );
    lastScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
    currentOperation = null;
}

function clear() {
    currentScreen.textContent = '0';
    lastScreen.textContent = '';
    firstOperand = '';
    secondOperand = '';
    currentOperation = null;
    shouldClearScreen = false;
}

function deleteNumber() {
    if (shouldClearScreen) return;
    if (currentScreen.textContent === "0") return;
    if (currentScreen.textContent.length === 1) {
        currentScreen.textContent = "0";
        return;
    }
    currentScreen.textContent = currentScreen.textContent.toString().slice(0, -1);
}

function appendPoint() {
    if (shouldClearScreen) clear();
    if (shouldResetScreen) resetScreen();
    if (currentScreen.textContent === '')
        currentScreen.textContent = '0';
    if (currentScreen.textContent.includes('.')) return; 
    currentScreen.textContent += '.';
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

function add(a, b) {
    return a + b;
}
  
function substract(a, b) {
    return a - b;
}
  
function multiply(a, b) {
    return a * b;
}
  
function divide(a, b) {
    return a / b;
}
  
function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
      case '+':
        return add(a, b);
      case '-':
        return substract(a, b);
      case 'x':
        return multiply(a, b);
      case '÷':
        if (b === 0) return null;
        else return divide(a, b);
      default:
        return null;
    }
}