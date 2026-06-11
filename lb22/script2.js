function perimeter(side, count) {
    return count * side;
}

{
    const num = document.getElementById('num');
    if (num) {
        const sideInput = prompt('Введіть довжину сторони багатокутника:', '5');
        if (sideInput !== null) {
            const side = parseFloat(sideInput);
            if (isNaN(side) || side <= 0) {
                alert('Довжина сторони повинна бути додатним числом!');
            } else {
                const countInput = prompt('Введіть кількість сторін багатокутника:', '4');
                if (countInput !== null) {
                    const count = parseInt(countInput);
                    if (isNaN(count) || count < 3) {
                        alert('Кількість сторін повинна бути цілим числом не менше 3!');
                    } else {
                        num.textContent = `Довжина сторони: ${side}\nКількість сторін: ${count}\nПериметр багатокутника: perimeter(${side}, ${count}) = ${perimeter(side, count)}`;
                    }
                }
            }
        }
    }
}