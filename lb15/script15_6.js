let text = '';
let input = '';
while (true) {
    input = prompt('Введіть число:');
    if (input === null) {
        break; 
    }
    let num = Number(input);
    if (num < 1 || num > 7) {
        text = 'Невірне значення дня тижня';
    } else{
        switch (num) {
            case 1:
                text = 'Понеділок';
                break;
            case 2:
                text = 'Вівторок';
                break;
            case 3:
                text = 'Середа';
                break;
            case 4:
                text = 'Четвер';
                break;
            case 5:
                text = 'П\'ятниця';
                break;
            case 6:
                text = 'Субота';
                break;
            case 7:
                text = 'Неділя';
                break;
            case null:
                document.body.appendChild(document.createElement("script")).src = "script15_main.js";
                break;
            default:
                text = 'Невірне значення дня тижня. Введіть ціле число від 1 до 7.';
        }

    }
    alert(text + ' Щоб повернутися до головного меню, оновіть сторінку.');
}