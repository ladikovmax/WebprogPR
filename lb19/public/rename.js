const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'images', 'insects'); 

fs.readdir(folderPath, (err, files) => {
    if (err) return console.log('Помилка читання папки:', err);

    files.forEach((file, index) => {
        const oldPath = path.join(folderPath, file);
        // Формуємо нове ім'я: 1.jpg, 2.jpg...
        const newPath = path.join(folderPath, `${index + 1}.jpg`); 
        
        fs.rename(oldPath, newPath, (err) => {
            if (err) console.log(`Помилка перейменування ${file}`);
        });
    });
    console.log('Всі файли успішно перейменовано!');
});