function isDivisibleWithIf(n, x, y) {
    if (n % x === 0 && n % y === 0) {
        return true;
    } else {
        return false;
    }
}

function isDivisibleWithTernary(n, x, y) {
    return (n % x === 0 && n % y === 0) ? true : false;
}

function isDivisibleWithoutIfAndTernary(n, x, y) {
    return n % x === 0 && n % y === 0;
}

{
    const num = document.getElementById('num');
    if (num) {
        const nInput = prompt('Введіть число n:');
        if (nInput !== null) {
            const n = parseInt(nInput);
            const xInput = prompt('Введіть число x:');
            if (xInput !== null) {
                const x = parseInt(xInput);
                const yInput = prompt('Введіть число y:');
                if (yInput !== null) {
                    const y = parseInt(yInput);
                    if (isNaN(n) || isNaN(x) || isNaN(y) || x === 0 || y === 0) {
                        alert('Помилка: всі значення повинні бути числами, x та y не дорівнюють 0!');
                    } else {
                        let output = '--- Перевірка роботи isDivisible (3 варіанти) ---\n\n';
                        output += `Перевірка для n = ${n}, x = ${x}, y = ${y}:\n`;
                        output += `  1. З допомогою if: ${isDivisibleWithIf(n, x, y)}\n`;
                        output += `  2. З тернарним оператором: ${isDivisibleWithTernary(n, x, y)}\n`;
                        output += `  3. Без if та тернарного: ${isDivisibleWithoutIfAndTernary(n, x, y)}\n`;
                        num.textContent = output;
                    }
                }
            }
        }
    }
}