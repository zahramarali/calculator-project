"use strict";
let $ = document;

const buttons = $.querySelectorAll('.button');
const ChangerButton = $.querySelector('.fa-bars');
const displayOutput = $.querySelector('.output-top');
const displayInput = $.querySelector('#calculator');
const historyList = $.querySelector('.text-side');
const clearAll = $.querySelector('#clear');
const clearLastAction = $.querySelector('#clear-last-action');
const backSpace = $.querySelector('#back-space');
const equal = $.querySelector('#equal');
const point = $.querySelector('#point');
const positiveNegative = $.querySelector('#positive-negative');
const operatorButtons = $.querySelectorAll(".operator");
const advancedButtons = $.querySelectorAll('[data-operation]');
const trashButton = $.querySelector('.fa-trash-can');


let currentNumber = '';
let previousNumber = '';
let operator = '';
let result = null;
let history = [];
let setPoint = false;
let showResult = false;

// Change Theme
function changeStyle() {
    const styles = ['theme1', 'theme2', 'theme3', 'theme4'];
    let currentStyle = document.body.className;
    let currentIndex = styles.indexOf(currentStyle);
    let nextIndex = (currentIndex + 1) % styles.length;
    document.body.className = styles[nextIndex];
}
ChangerButton.addEventListener('click', changeStyle);


//functionality

function updateDisplay(value) {
    displayInput.value = value;
}

// Add display output to history
function addToHistory(calcString) {
    history.push(calcString);
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    if (history.length > 0) {
        historyList.innerHTML = history.map(entry => `<p>${entry}</p>`).join('');
    } else {
        historyList.innerHTML = '<p>There is no history yet</p>';
    }
}

// clear all button
clearAll.addEventListener('click', function () {
    currentNumber = '';
    previousNumber = '';
    operator = '';
    result = null;
    setPoint = false;
    showResult = false;
    updateDisplay('0');
    displayOutput.textContent = '';
});

// clear lastAction button
clearLastAction.addEventListener('click', function () {
    currentNumber = '';
    updateDisplay('0');
});

// backSpace button
backSpace.addEventListener('click', function () {
    currentNumber = currentNumber.slice(0, -1) || '0';
    updateDisplay(currentNumber);
});

// num & operators
buttons.forEach(button => {
    button.addEventListener('click', function (e) {
        const buttonClass = button.classList;

        // num button
        if (buttonClass.contains('num')) {
            if (showResult) {
                currentNumber = e.target.value;
                showResult = false;
            } else {
                currentNumber = currentNumber === '0' ? e.target.value : currentNumber + e.target.value;
            }
            updateDisplay(currentNumber);
        }

        // operator button
        if (buttonClass.contains('operator')) {
            if (!operator) {
                previousNumber = currentNumber;
                currentNumber = '';
            }
            operator = button.value;
            displayOutput.textContent = `${previousNumber} ${button.textContent}`;
        }

        // equal button
        if (buttonClass.contains('equal')) {
            if (previousNumber && currentNumber && operator) {
                calculate();
            }
        }
    });
});

// operators logic
function calculate() {
    let calcString = `${previousNumber} ${operator} ${currentNumber}`;
    switch (operator) {
        case '+':
            result = parseFloat(previousNumber) + parseFloat(currentNumber);
            break;
        case '-':
            result = parseFloat(previousNumber) - parseFloat(currentNumber);
            break;
        case '×':
            result = parseFloat(previousNumber) * parseFloat(currentNumber);
            break;
        case '÷':
            result = parseFloat(previousNumber) / parseFloat(currentNumber);
            break;
        default:
            return;
    }

    displayOutput.textContent = `${calcString}`;
    updateDisplay(result);
    addToHistory(`${calcString} = ${result}`);

    previousNumber = result;
    currentNumber = '';
    operator = '';
    showResult = true;
}

// positive $ negative
positiveNegative.addEventListener('click', function () {
    currentNumber = currentNumber ? (parseFloat(currentNumber) * -1).toString() : '0';
    updateDisplay(currentNumber);
});

// point
point.addEventListener('click', function () {
    if (!setPoint) {
        currentNumber += ".";
        updateDisplay(currentNumber);
        setPoint = true;
    }
});

//history part
// Add display output to history
function addToHistory(calcString) {
  history.push(calcString);
  updateHistoryDisplay();
}

function updateHistoryDisplay() {
  if (history.length > 0) {
      historyList.innerHTML = history.map(entry => `<p>${entry}</p>`).join('');
  } else {
      historyList.innerHTML = '<p>There is no history yet</p>';
  }
}
// clear history
trashButton.addEventListener('click', function () {
    history = [];  
    updateHistoryDisplay();  //bring text again
});

updateHistoryDisplay();



// advance operations
advancedButtons.forEach(button => {
    button.addEventListener('click', function (e) {
        const operation = e.target.getAttribute('data-operation');
        let value = parseFloat(displayInput.value);

        switch (operation) {
            case 'percentage':
                value = handlePercentage(value); 
                break;
            case 'sqrt':
                value = handleSqrt(value); 
                break;
            case 'square':
                value = handleSquare(value); 
                break;
            case 'cube':
                value = handleCube(value); 
                break;
            case 'reciprocal':
                value = handleReciprocal(value); 
                break;
            default:
                return;
        }

        displayInput.value = value;
        addToHistory(`${operationSymbol(operation)}(${parseFloat(displayInput.value)}) = ${value}`);  //add to history

    });
});
function operationSymbol(operation) {
  switch (operation) {
      case 'percentage': return '%';
      case 'sqrt': return '√';
      case 'square': return '𝓍²';
      case 'cube': return '𝓍³';
      case 'reciprocal': return '¹/𝓍';
      default: return '';
  }
}

//percentage
function handlePercentage(value) {
    return value / 100; 
}

//radical
function handleSqrt(value) {
    return value >= 0 ? Math.sqrt(value) : 'Error'; 
}

//square
function handleSquare(value) {
    return Math.pow(value, 2); 
}

//cube
function handleCube(value) {
    return Math.pow(value, 3); 
}

//reverse
function handleReciprocal(value) {
    return value !== 0 ? 1 / value : 'Error';  
}




