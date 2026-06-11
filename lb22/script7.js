function processMatrix() {
    const size = 5;
    let originalMatrix = [];
    let modifiedMatrix = [];

    for (let i = 0; i < size; i++) {
        const row = Array.from({ length: size }, () => Math.floor(Math.random() * 21) - 10);

        originalMatrix.push([...row]);

        if (row[i] < 0) {
            row[i] = 0;
        } else if (row[i] > 0) {
            row[i] = 1;
        }

        modifiedMatrix.push(row);
    }

    function formatMatrix(matrix, highlightDiagonal = false) {
        return matrix.map((row, i) => {
            return row.map((val, j) => {
                let valStr = val.toString();
                if (highlightDiagonal && i === j) {
                    return `[${valStr}]`.padStart(6, ' ');
                }
                return ` ${valStr} `.padStart(6, ' ');
            }).join(' ');
        }).join('\n');
    }

    let output = `--- Початкова матриця ${size}х${size} ---\n`;
    output += formatMatrix(originalMatrix) + '\n\n';
    output += '--- Модифікована матриця (головна діагональ: - на 0, + на 1) ---\n';
    output += formatMatrix(modifiedMatrix, true);

    const num = document.getElementById('num');
    if (num) {
        num.textContent = output;
    } else {
        console.log(output);
    }
}

processMatrix();
