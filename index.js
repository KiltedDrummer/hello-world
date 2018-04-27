// Main app logic.

// Save the reference to the display as a variable to make it easy to read/update later in your code.
const calculatorDisplay = document.getElementById('calculator-display');
let memory = 0;
//create an array to hold current number as well as commands in order
let currentFunction = [0];
let lastElement = currentFunction[currentFunction.length - 1];
let currentNumber = Number(currentFunction[lastElement].toString());

let currentDisplay = calculatorDisplay.innerHTML;

/**
 * Set the value of what is displayed on the calculator.
 */
function setCalculatorDisplay (val) {
    calculatorDisplay.innerHTML = val;
}

function updateCalculatorDisplay (val) {
    currentDisplay = calculatorDisplay.innerHTML;

    if (calculatorDisplay.innerHTML == 0) {
        setCalculatorDisplay (val);
    } else if (!isNaN(calculatorDisplay.innerHTML)) {
        setCalculatorDisplay ('' + currentDisplay + val);
    }
    currentDisplay = calculatorDisplay.innerHTML;

}

// Set initial default value for the calculator display.
setCalculatorDisplay(0);



/**
 * Save the current display value to memory.
 */
function setMemory () {
    memory = calculatorDisplay.innerHTML;
}

/**
 * Set the calculator display to the last saved memory value.
 */
function recallMemory () {
    calculatorDisplay.innerHTML = memory;
}


function test () {
    var x = Math.round(Math.random() * 100000) / 100;
    console.log(x);
    setCalculatorDisplay(x);
}

function clearDisplay () {
    currentFunction = [0];
    setCalculatorDisplay (currentFunction[0]);
}

function pressNumber (num) {
    updateCalculatorDisplay (num);
}


/**
 * Main function to update array holding current function as well as update display
 * to properly show current number
 */
function callOperator(button) {
    if (lastElement === 0) {
        currentFunction.splice(currentFunction.length - 1, 1, currentDisplay);
    }
        currentFunction.push(button);
        currentFunction.push(0);
        setCalculatorDisplay (0);
    
}