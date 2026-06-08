const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

/*
 * Конфігурація middleware та маршрутизації
 * - express.static: обслуговування клієнтських файлів (CSS, JS, зображення)
 * - app.get: обробка маршрутів для HTML-сторінок
 * - app.get('/api/...'): REST API ендпоінт для отримання кількості файлів у директоріях
 */
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

app.get('/game', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'game.html'));
});

app.get('/api/images-count/:category', (req, res) => {
    const category = req.params.category;
    const folderPath = path.join(__dirname, 'public', 'images', category);

    fs.readdir(folderPath, (err, files) => {
        if (err) {
            return res.json({ count: 0 });
        }
        const imageFiles = files.filter(file => file.endsWith('.jpg'));
        res.json({ count: imageFiles.length });
    });
});

app.use((req, res) => {
    res.status(404).send('<h1>404 - Сторінку не знайдено</h1>');
});

app.listen(PORT, () => {
    console.log(`Сервер запущено на http://localhost:${PORT}`);
});