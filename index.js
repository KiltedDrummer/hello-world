// Main app logic.

// Save the reference to the display as a variable to make it easy to read/update later in your code.
const calculatorDisplay = document.getElementById('calculator-display');
let memory = 0;

// Set initial default value for the calculator display.
setCalculatorDisplay(0);

/**
 * Save the current display value to memory.
 */
function setMemory () {
    memory = calculatorDisplay.innerHTML;
}

/**
 * Set the calculator dispay to the last saved memory value.
 */
function recallMemory () {
    calculatorDisplay.innerHTML = memory;
}

/**
 * Set the value of what is displayed on the calculator.
 */
function setCalculatorDisplay (val) {
    calculatorDisplay.innerHTML = val;
}

function test () {
    var x = Math.round(Math.random() * 100000) / 100;
    console.log(x);
    setCalculatorDisplay(x);
}
