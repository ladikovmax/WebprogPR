function processArray() {
    let input = prompt('Введіть розмірність масиву N(до 25):');
    if (input === null) return;
    let n = parseInt(input);
    if (isNaN(n) || n <= 0 || n > 25) {
        alert('Будь ласка, введіть коректне позитивне число(до 25)!');
        return;
    }

    let arr = [];
    for (let i = 0; i < n; i++) {
        arr.push(Math.floor(Math.random() * 201) - 100);
    }

    let minVal = Math.min(...arr);
    let maxVal = Math.max(...arr);
    let sumVal = 0;
    for (const item of arr) {
        sumVal += item;
    }
    let avgVal = sumVal / n;
    let oddVals = [];
    for (const item of arr) {
        if (item % 2 !== 0) {
            oddVals.push(item);
        }
    }

    let resultText = `Згенерований масив: [${arr.join(', ')}]\n\n`;
    resultText += `Найбільше значення: ${maxVal}\n`;
    resultText += `Найменше значення: ${minVal}\n`;
    resultText += `Загальна сума елементів: ${sumVal}\n`;
    resultText += `Середнє арифметичне: ${avgVal.toFixed(2)}\n`;
    resultText += `Непарні значення: [${oddVals.join(', ')}]`;

    const num = document.getElementById('num');
    if (num) {
        num.textContent = resultText;
    } else {
        alert(resultText);
    }
}

processArray();