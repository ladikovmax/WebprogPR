let text = '';
let input = '';
while (true) {
    input = prompt('Введіть номер місяця (1-12)');
    if (input === null) {
        break; 
    }
    const month = Number(input);
    switch (month) {
        case 3:
        case 4:
        case 5:
            text = 'Весна';
            break;
        case 6:
        case 7:
        case 8:
            text = 'Літо';
            break;
        case 9:
        case 10:
        case 11:
            text = 'Осінь';
            break;
        case 12:
        case 1:
        case 2:
            text = 'Зима';
            break;
        default:
            text = 'Невірний номер місяця';
    }
    alert(text);
}