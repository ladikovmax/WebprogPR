function analyzeNumber(num) {
    if (isNaN(num)) {
        return "Помилка: Введено не число.";
    }

    let signStr = "";
    if (num > 0) {
        signStr = "позитивне";
    } else if (num < 0) {
        signStr = "негативне";
    } else {
        signStr = "число є нулем (нейтральне)";
    }

    let isPrime = true;
    if (num <= 1 || !Number.isInteger(num)) {
        isPrime = false;
    } else {
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) {
                isPrime = false;
                break;
            }
        }
    }
    const primeStr = isPrime ? "так, є простим" : "ні, не є простим";

    const divisors = [2, 5, 3, 6, 9];
    let divisibilityResults = [];
    for (const d of divisors) {
        if (num % d === 0) {
            divisibilityResults.push(d);
        }
    }
    const divisibilityStr = divisibilityResults.length > 0
        ? `ділиться без залишку на: ${divisibilityResults.join(', ')}`
        : "не ділиться без залишку на жодне з чисел [2, 3, 5, 6, 9]";


    let result = `Аналіз числа: ${num}\n\n`;
    result += `1. Знак числа: воно ${signStr}\n`;
    result += `2. Чи є простим: ${primeStr}\n`;
    result += `3. Подільність: ${divisibilityStr}`;

    return result;
}

function runAnalysis() {
    const input = prompt('Введіть число для аналізу:');
    if (input === null) return;

    const num = parseFloat(input);
    const result = analyzeNumber(num);

    const numEl = document.getElementById('num');
    if (numEl) {
        numEl.textContent = result;
    } else {
        alert(result);
    }
}

runAnalysis();
