const num = document.getElementById('num');
let text = '';
let i = 0;

do {
    if (i === 0) {
        text += '0 - це нуль\n';
    } else {
        text += i + (i % 2 === 0 ? ' - це парне число\n' : ' - це непарне число\n');
    }
    i++;
} while (i <= 10);

if (num) {
    num.innerText = text; 
}