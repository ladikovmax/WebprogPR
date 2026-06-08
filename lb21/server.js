/* Настройка Express-сервера для отдачи HTML из папки views и статики из папки public */
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/api/square', (req, res) => {
    const num = parseFloat(req.body.number);
    if (isNaN(num)) return res.status(400).json({ error: 'Некорректное число' });
    res.json({ result: num * num });
});

app.listen(PORT);