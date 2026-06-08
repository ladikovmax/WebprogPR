/* Налаштування Express-сервера з підтримкою статичних файлів, парсингу JSON та API-маршрутизацією */
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/calculator', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/api/square', (req, res) => {
    const num = parseFloat(req.body.number);
    if (isNaN(num)) {
        return res.status(400).json({ error: 'Некоректне число' });
    }
    res.json({ result: num * num });
});

app.use((req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});