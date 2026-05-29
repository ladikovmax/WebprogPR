let text = '';
let input = '';
while (true) {
    input = prompt('Введіть градуси по Цельсію:');
    if (input === null) {
        break; 
    }
    let num = Number(input);
    if (num < -273) {
        text = 'Невірне значення температури';
    } else{
        num = (num * 9/5) + 32;
        text = `Температура по Фаренгейту: ${num.toFixed(2)} Щоб повернутися до головного меню, оновіть сторінку.`;
    }
    alert(text);
}