const num = document.getElementById('num');
let primesText = 'Прості числа від 1 до 100: ';

for (let i = 2; i <= 100; i++) {
    let isPrime = true;
    for (let j = 2; j <= Math.sqrt(i); j++) {
        if (i % j === 0) {
            isPrime = false;
            break;
        }
    }
    if (isPrime) {
        primesText += (primesText === 'Прості числа від 1 до 100: ' ? i : ', ' + i);
    }
}

if (num) {
    num.textContent += ' ' + primesText;
}