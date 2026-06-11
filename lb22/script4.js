function Calculate(a, b, c) {
    const mean = (a + b + c) / 3;

    const num = document.getElementById('num');
    if (num) {
        num.textContent = `Параметри: a = ${a}, b = ${b}, c = ${c}\nСереднє арифметичне: ${mean}`;
    } else {
        alert(`Середнє арифметичне (${a}, ${b}, ${c}) = ${mean}`);
    }
    return mean;
}

{
    const aInput = prompt('Введіть перше число a:', '12');
    if (aInput !== null) {
        const a = parseFloat(aInput);
        const bInput = prompt('Введіть друге число b:', '15');
        if (bInput !== null) {
            const b = parseFloat(bInput);
            const cInput = prompt('Введіть третє число c:', '21');
            if (cInput !== null) {
                const c = parseFloat(cInput);
                if (isNaN(a) || isNaN(b) || isNaN(c)) {
                    alert('Помилка: всі введені значення повинні бути числами!');
                } else {
                    Calculate(a, b, c);
                }
            }
        }
    }
}