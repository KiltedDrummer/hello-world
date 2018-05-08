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
        setCalculatorDisplay(0);
        currentFunction =[];
    }
    updateCalculatorDisplay (num);
    lastHit = num;
}


/**
 * Main function to update array holding current function as well as update display
 * to properly show current number
 */
function callOperator(button) {

    if (button === '=') {    // if '=' is hit
        if (lastHit === '=') {   // is '=' is hit a second time in a row, repeat last function
            if (toSolve.length > 1) {
                let solveAgain = [currentDisplay, toSolve[1], toSolve[2]];
                console.log(solveAgain);
                solution = eval(solveAgain.join(''));
                console.log(solution);
                currentFunction = [solution];
                setCalculatorDisplay(solution);
            } else {
                setCalculatorDisplay(currentFunction[0]);
            }
        } else if (!isNaN(lastHit)) {    // if lastHit is a number
            currentFunction.push(currentDisplay);
            toSolve = currentFunction.splice(0, 3);
            solution = eval(toSolve.join(''));
            currentFunction = [solution];
            console.log(currentFunction);
            setCalculatorDisplay(solution);
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
            setCalculatorDisplay(0);
        }
        else if (!isNaN(lastHit)) {   // if lastHit is a number
            currentFunction.push(currentDisplay);
            currentFunction.push(button);
            setCalculatorDisplay(0);
        } else if (!isNaN(lastElement)) {  // if lastElement is a number
            currentFunction.push(button);
            setCalculatorDisplay(0);
        }
    }
    
    
    if (currentFunction.length >= 3) {
        toSolve = currentFunction.splice(0, 3);
        solution = eval(toSolve.join(''));
        if (lastHit === '=') {
            currentFunction = [solution];
            setCalculatorDisplay(solution);
        } else {
            currentFunction.splice(0, 0, solution);
        }
    }
    lastHit = button;
    lastElement = currentFunction[currentFunction.length - 1];

}

