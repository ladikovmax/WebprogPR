function reverseAndSquare(arr) {
    const reversed = [...arr].reverse();
    return reversed.map(item => {
        if (typeof item === 'number' && !isNaN(item)) {
            return item * item;
        }
        return item;
    });
}

{
    const numEl = document.getElementById('num');
    if (numEl) {
        const input = prompt('Введіть елементи масиву через кому (числа, рядки, булеві або JSON-об\'єкти):', '1, 2, привіт, 3, світ, 4, true, {"x": 10}, 5');
        if (input !== null) {
            const originalArr = input.split(',').map(item => {
                const trimmed = item.trim();
                if (trimmed === 'true') return true;
                if (trimmed === 'false') return false;

                const parsedNum = Number(trimmed);
                if (trimmed !== '' && !isNaN(parsedNum)) return parsedNum;

                if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
                    try {
                        return JSON.parse(trimmed);
                    } catch (e) {
                    }
                }

                return trimmed;
            });
            const processedArr = reverseAndSquare(originalArr);

            function formatVal(val) {
                if (typeof val === 'string') return `"${val}"`;
                if (typeof val === 'object' && val !== null) return JSON.stringify(val);
                return String(val);
            }

            let output = '--- Тестування функції reverseAndSquare ---\n\n';
            output += `Початковий масив:\n[${originalArr.map(formatVal).join(', ')}]\n\n`;
            output += `Результат (перевернутий масив, числа піднесені до квадрату):\n[${processedArr.map(formatVal).join(', ')}]`;

            numEl.textContent = output;
        }
    }
}
