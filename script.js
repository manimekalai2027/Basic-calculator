
const previousTextElement = document.getElementById('previous');
const currentTextElement = document.getElementById('current');

let currentOperand = '0';
let previousOperand = '';
let operation = undefined;


function clearScreen() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

function deleteNumber() {
    if (currentOperand === '0') return;
    currentOperand = currentOperand.toString().slice(0, -1);
    if (currentOperand === '') currentOperand = '0';
    updateDisplay();
}

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    
    if (currentOperand === '0' && number !== '.') {
        currentOperand = number.toString();
    } else {
        currentOperand = currentOperand.toString() + number.toString();
    }
    updateDisplay();
}


function chooseOperator(selectedOperation) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = selectedOperation;
    previousOperand = currentOperand;
    currentOperand = '0';
    updateDisplay();
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '−':
            computation = prev - current;
            break;
        case '×':
            computation = prev * current;
            break;
        case '÷':
            if (current === 0) {
                alert("Math Error: Division by zero is undefined.");
                clearScreen();
                return;
            }
            computation = prev / current;
            break;
        case '%':
            computation = prev % current;
            break;
        default:
            return;
    }

    currentOperand = Math.round(computation * 1e12) / 1e12;
    operation = undefined;
    previousOperand = '';
    updateDisplay();
}


function updateDisplay() {
    currentTextElement.innerText = currentOperand;
    if (operation != null) {
        previousTextElement.innerText = `${previousOperand} ${operation}`;
    } else {
        previousTextElement.innerText = '';
    }
}

window.addEventListener('keydown', e => {
    let key = e.key;
    
    if (key === 'Enter') key = '=';
    if (key === 'Backspace') key = 'Backspace';
    if (key === 'Escape') key = 'Escape';
    if (key === '*') key = '×';
    if (key === '/') key = '÷';
    if (key === '-') key = '−';

    const buttons = Array.from(document.querySelectorAll('button'));
    let targetButton = buttons.find(btn => {
        if (key === 'Escape' && btn.classList.contains('clear')) return true;
        if (key === 'Backspace' && btn.classList.contains('delete')) return true;
        return btn.innerText === key;
    });

    if (targetButton) {
        targetButton.classList.add('active');
        setTimeout(() => targetButton.classList.remove('active'), 100);
        targetButton.click();
    }
});