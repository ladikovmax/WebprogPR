let numb = 10000;
let rezult = 0;
let counter = 0;

for (counter = 0; numb > 50; counter++) {
    numb = numb/2;
    rezult = numb;
}

console.log('Кінцеве число:', rezult);
console.log('Кількість ітерацій:', counter);
