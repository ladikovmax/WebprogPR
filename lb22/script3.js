function fizzBuzz(n) {
    let outputLines = [];
    for (let i = 1; i <= n; i++) {
        let val = '';
        if (i % 3 === 0 && i % 5 === 0) {
            val = 'fizzbuzz';
        } else if (i % 3 === 0) {
            val = 'fizz';
        } else if (i % 5 === 0) {
            val = 'buzz';
        } else {
            val = i.toString();
        }
        console.log(val);
        outputLines.push(val);
    }

    const num = document.getElementById('num');
    if (num) {
        num.textContent = `--- FizzBuzz (n = ${n}) ---\n` + outputLines.join('\n');
    }
}

{
    const input = prompt('Введіть число n для FizzBuzz:', '15');
    if (input !== null) {
        const n = parseInt(input);
        if (isNaN(n) || n <= 0) {
            alert('Будь ласка, введіть коректне додатне число!');
        } else {
            fizzBuzz(n);
        }
    }
}
