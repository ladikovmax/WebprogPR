function removeDuplicates(arr) {
    return [...new Set(arr)];
}

{
    const numEl = document.getElementById('num');
    if (numEl) {
        const input = prompt('Введіть елементи масиву через кому:', '1, 2, 2, 4, 5, 4, 7, 8, 7, 3, 6');
        if (input !== null) {
            const originalArr = input.split(',').map(item => {
                const trimmed = item.trim();
                const num = Number(trimmed);
                return (trimmed !== '' && !isNaN(num)) ? num : trimmed;
            });
            const processedArr = removeDuplicates(originalArr);

            let output = '--- Видалення дублікатів з масиву ---\n\n';
            output += `Початковий масив:\n[${originalArr.join(', ')}]\n\n`;
            output += `Масив після видалення дублікатів:\n[${processedArr.join(', ')}]`;

            numEl.textContent = output;
        }
    }
}
