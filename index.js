// Main app logic.

// Save the reference to the display as a variable to make it easy to read/update later in your code.
const calculatorDisplay = document.getElementById('calculator-display');
let memory = 0;
//create an array to hold current number as well as commands in order
let currentFunction = [];
let lastElement = currentFunction[currentFunction.length - 1];
//let currentNumber = Number(currentFunction[lastElement].toString());

let currentDisplay = calculatorDisplay.innerHTML;
let lastHit;
let toSolve;
let solution;
let num1;
let num2;
let lastOperator;

/**
 * Set the value of what is displayed on the calculator.
 */
function setCalculatorDisplay (val) {
    calculatorDisplay.innerHTML = val;
    currentDisplay = val;
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

// changes number from positive to negative or back
function posNeg () {
    currentDisplay = currentDisplay * (-1);
    setCalculatorDisplay(currentDisplay);
    if (currentFunction.length === 1) {
        currentFunction[0] = currentDisplay;
    }
}

function clearDisplay () {
    currentFunction = [];
    setCalculatorDisplay (0);
    lastHit = undefined;
}

function pressNumber (num) {
    if (lastHit === '=') {
        setCalculatorDisplay(num);
        currentFunction =[];
        lastElement = currentFunction[0];
    } else if (lastHit === '.') {
        updateCalculatorDisplay(num);
    } else if (typeof lastElement == 'number' || (typeof lastElement == 'string' && isNaN(lastElement)) && isNaN(lastHit)) {  //if last element is a number or an operator
        setCalculatorDisplay(num);
    } else {
        updateCalculatorDisplay(num);
    }
    lastHit = num;
}

function decimal (dot) {
    if (!isNaN(currentDisplay && !isNaN(lastHit))) {
        setCalculatorDisplay('' + currentDisplay + dot);
    } else  {
        setCalculatorDisplay(0.);
        currentFunction = [];
        lastElement = currentFunction[0];
    }
}

function solveIt() {
    num1 = Number(currentFunction[0]);

    if (currentFunction.length >= 3) {
        lastOperator = currentFunction[1];
        num2 = Number(currentFunction[2]);
    }

    if (lastOperator == '+') {
        solution = num1+num2;
    } else if (lastOperator == '-') {
        solution = num1 - num2;
    } else if (lastOperator == '*') {
        solution = num1 * num2;
    } else if (lastOperator == '/') {
        solution = num1 / num2;
    }

}

/**
 * Main function to update array holding current function as well as update display
 * to properly show current number
 */
function callOperator(button) {

    if (button === '=') {    // if '=' is hit
        if (lastHit === '=') {   // is '=' is hit a second time in a row, repeat last function
            if (currentFunction.length > 0) {
                solveIt();
                currentFunction = [solution];
                setCalculatorDisplay(solution);
            } else {
                setCalculatorDisplay(currentFunction[0]);
            }
        } else if (!isNaN(lastHit)) {    // if lastHit is a number
            currentFunction.push(currentDisplay);
            solveIt();
            currentFunction = [solution];

            setCalculatorDisplay(solution);
        } else if (isNaN(lastHit)){     //last hit was another operator
            setCalculatorDisplay(currentFunction[0]);
            currentFunction.pop();
            
        }

    } else if (button !== '=') {    //if an operator other than '=' is hit
        if (lastHit == undefined) {  //first hit is an operator
            currentFunction.push(currentDisplay);
            currentFunction.push(button);
            setCalculatorDisplay(0);
        } else if (isNaN(lastHit) && isNaN(lastElement)) {     //if lastHit and lastElement are operators 
            currentFunction.splice(currentFunction.length - 1, 1, button);
        } else if (isNaN(lastHit) && !isNaN(lastElement)) {    // if lastHit was an operator and lastElement is a number
            currentFunction.push(button);
            //setCalculatorDisplay(currentFunction[0]);
        }
        else if (!isNaN(lastHit)) {   // if lastHit is a number
            currentFunction.push(currentDisplay);
            currentFunction.push(button);
            //setCalculatorDisplay(currentFunction[0]);
        } else if (!isNaN(lastElement)) {  // if lastElement is a number
            currentFunction.push(button);
            //setCalculatorDisplay(currentFunction[0]);
        }
        setCalculatorDisplay(currentFunction[0]);
    }
    console.log(currentFunction);
    
    if (currentFunction.length >= 3) {
        solveIt();
        if (lastHit === '=') {
            currentFunction = [solution];
            setCalculatorDisplay(solution);
        } else {
            currentFunction.splice(0, 3, solution);
        }
        setCalculatorDisplay(currentFunction[0]);
    }
    lastHit = button;
    lastElement = currentFunction[currentFunction.length - 1];

}

