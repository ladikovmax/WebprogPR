function seconds(total) {
    return total % 60;
}

{
    const num = document.getElementById('num');
    if (num) {
        const input = prompt('Введіть загальну кількість секунд:', '125');
        if (input !== null) {
            const total = parseInt(input);
            if (isNaN(total) || total < 0) {
                alert('Будь ласка, введіть коректне додатне число секунд!');
            } else {
                num.textContent = `Введені секунди: ${total}\nЗалишок секунд від початку хвилини: seconds(${total}) = ${seconds(total)}`;
            }
        }
    }
}