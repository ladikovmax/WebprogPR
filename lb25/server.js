const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/book', (req, res) => {
    res.sendFile(path.join(__dirname, 'book.html'));
});

app.get('/film', (req, res) => {
    res.sendFile(path.join(__dirname, 'film.html'));
});

app.use((req, res) => {
    res.status(404).send('<h1>404 - Сторінку не знайдено</h1>');
});

app.listen(PORT, () => {
    console.log(`Лабораторна 25 запущена: http://localhost:${PORT}`);
    console.log(`Книга: http://localhost:${PORT}/book`);
    console.log(`Фільм: http://localhost:${PORT}/film`);
});
