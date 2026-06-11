function Add(a, b) {
    const res = a + b;
    displayResult(a, b, '+', res);
    return res;
}

function Sub(a, b) {
    const res = a - b;
    displayResult(a, b, '-', res);
    return res;
}

function Mul(a, b) {
    const res = a * b;
    displayResult(a, b, '*', res);
    return res;
}

function Div(a, b) {
    if (b === 0) {
        displayResult(a, b, '/', 'Помилка: ділення на нуль!');
        return null;
    }
    const res = a / b;
    displayResult(a, b, '/', res);
    return res;
}

function displayResult(a, b, op, result) {
    const output = `Введені числа: a = ${a}, b = ${b}\nОперація: ${op}\n\nРезультат: ${result}`;
    const num = document.getElementById('num');
    if (num) {
        num.textContent = output;
    } else {
        alert(output);
    }
}

function runCalculator() {
    const val1 = prompt('Введіть перше число:');
    if (val1 === null) return;
    const num1 = parseFloat(val1);
    if (isNaN(num1)) {
        alert('Помилка: перше введення не є числом.');
        return;
    }

    const val2 = prompt('Введіть друге число:');
    if (val2 === null) return;
    const num2 = parseFloat(val2);
    if (isNaN(num2)) {
        alert('Помилка: друге введення не є числом.');
        return;
    }

    const op = prompt('Виберіть операцію (+, -, *, / або Add, Sub, Mul, Div):');
    if (op === null) return;

    const opNormalized = op.trim().toLowerCase();
    if (opNormalized === '+' || opNormalized === 'add') {
        Add(num1, num2);
    } else if (opNormalized === '-' || opNormalized === 'sub') {
        Sub(num1, num2);
    } else if (opNormalized === '*' || opNormalized === 'mul') {
        Mul(num1, num2);
    } else if (opNormalized === '/' || opNormalized === 'div') {
        Div(num1, num2);
    } else {
        alert('Невідома операція: ' + op);
    }
}

runCalculator();
