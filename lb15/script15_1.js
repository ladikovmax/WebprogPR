const num = document.getElementById('num');
let primesText = '';

for (let i = 2; i <= 100; i++) {
    let isPrime = true;
    for (let j = 2; j <= Math.sqrt(i); j++) {
        if (i % j === 0) {
            isPrime = false;
            break;
        }
    }
    if (isPrime) {
        primesText += (primesText === '' ? i : ', ' + i);
    }
}

if (num) {
    num.textContent += ' ' + primesText;
}