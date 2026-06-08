document.body.style.margin = '0';
document.body.style.padding = '0';
document.body.style.display = 'flex';
document.body.style.justifyContent = 'center';
document.body.style.alignItems = 'center';
document.body.style.minHeight = '100vh';
document.body.style.backgroundColor = '#121212';
document.body.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif';

const appContainer = document.createElement('div');
appContainer.style.width = '100%';
appContainer.style.maxWidth = '400px';
appContainer.style.height = '100dvh'; // Використання динамічної висоти для мобільних
appContainer.style.maxHeight = '850px';
appContainer.style.backgroundColor = '#000000';
appContainer.style.display = 'flex';
appContainer.style.flexDirection = 'column';
appContainer.style.boxSizing = 'border-box';
appContainer.style.overflowY = 'auto'; // Дозвіл на прокрутку, якщо екран занадто низький
appContainer.style.position = 'relative';

const displayContainer = document.createElement('div');
displayContainer.style.flexGrow = '1';
displayContainer.style.flexShrink = '0'; // Заборона стискання дисплею
displayContainer.style.display = 'flex';
displayContainer.style.flexDirection = 'column';
displayContainer.style.justifyContent = 'flex-end';
displayContainer.style.padding = '20px 20px 10px 20px';
displayContainer.style.boxSizing = 'border-box';
displayContainer.style.minHeight = '150px';

const historyDisplay = document.createElement('div');
historyDisplay.style.color = '#7a7a7a';
historyDisplay.style.fontSize = '1.5rem';
historyDisplay.style.textAlign = 'right';
historyDisplay.style.minHeight = '30px';
historyDisplay.style.marginBottom = '5px';
historyDisplay.style.wordWrap = 'break-word';

const mainDisplay = document.createElement('div');
mainDisplay.style.color = '#ffffff';
mainDisplay.style.fontSize = '4.5rem';
mainDisplay.style.textAlign = 'right';
mainDisplay.style.wordWrap = 'break-word';
mainDisplay.style.lineHeight = '1';
mainDisplay.textContent = '0';

displayContainer.appendChild(historyDisplay);
displayContainer.appendChild(mainDisplay);
appContainer.appendChild(displayContainer);

const sciPanel = document.createElement('div');
sciPanel.style.display = 'grid';
sciPanel.style.gridTemplateColumns = 'repeat(5, 1fr)';
sciPanel.style.gap = '10px';
sciPanel.style.padding = '10px 20px';
sciPanel.style.borderBottom = '1px solid #1c1c1c';
sciPanel.style.flexShrink = '0'; 


const sciFunctions = ['sin', 'cos', 'tan', 'log', 'ln', '√', 'π', '^', '(', ')'];

sciFunctions.forEach(func => {
    const btn = document.createElement('button');
    btn.textContent = func;
    btn.style.background = 'none';
    btn.style.border = 'none';
    btn.style.color = '#ff6b00';
    btn.style.fontSize = '1.2rem';
    btn.style.cursor = 'pointer';
    btn.style.padding = '10px 0';
    btn.style.width = '100%';
    
    btn.addEventListener('click', () => handleInput(func));
    sciPanel.appendChild(btn);
});

appContainer.appendChild(sciPanel);

// Сітка кнопок
const gridContainer = document.createElement('div');
gridContainer.style.display = 'grid';
gridContainer.style.gridTemplateColumns = 'repeat(4, 1fr)';
gridContainer.style.gap = '15px';
gridContainer.style.padding = '20px';
gridContainer.style.boxSizing = 'border-box';
gridContainer.style.flexShrink = '0'; // Заборона стискання сітки

const buttonsData = [
    { text: 'AC', color: '#ff6b00', bg: '#1c1c1c' },
    { text: '⌫', color: '#ff6b00', bg: '#1c1c1c' },
    { text: '%', color: '#ff6b00', bg: '#1c1c1c' },
    { text: '/', color: '#ff6b00', bg: '#1c1c1c' },
    
    { text: '7', color: '#ffffff', bg: '#1c1c1c' },
    { text: '8', color: '#ffffff', bg: '#1c1c1c' },
    { text: '9', color: '#ffffff', bg: '#1c1c1c' },
    { text: '*', color: '#ff6b00', bg: '#1c1c1c' },
    
    { text: '4', color: '#ffffff', bg: '#1c1c1c' },
    { text: '5', color: '#ffffff', bg: '#1c1c1c' },
    { text: '6', color: '#ffffff', bg: '#1c1c1c' },
    { text: '-', color: '#ff6b00', bg: '#1c1c1c' },
    
    { text: '1', color: '#ffffff', bg: '#1c1c1c' },
    { text: '2', color: '#ffffff', bg: '#1c1c1c' },
    { text: '3', color: '#ffffff', bg: '#1c1c1c' },
    { text: '+', color: '#ff6b00', bg: '#1c1c1c' },
    
    { text: 'e', color: '#ffffff', bg: '#1c1c1c' },
    { text: '0', color: '#ffffff', bg: '#1c1c1c' },
    { text: '.', color: '#ffffff', bg: '#1c1c1c' },
    { text: '=', color: '#ffffff', bg: '#ff6b00' }
];

buttonsData.forEach(item => {
    const btn = document.createElement('button');
    btn.textContent = item.text;
    btn.style.backgroundColor = item.bg;
    btn.style.color = item.color;
    btn.style.border = 'none';
    btn.style.borderRadius = '50%';
    btn.style.fontSize = '1.8rem';
    btn.style.cursor = 'pointer';
    btn.style.width = '100%';
    btn.style.maxWidth = '80px';
    btn.style.aspectRatio = '1 / 1';
    btn.style.margin = '0 auto';
    btn.style.display = 'flex';
    btn.style.justifyContent = 'center';
    btn.style.alignItems = 'center';
    btn.style.transition = 'filter 0.1s';

    btn.addEventListener('mousedown', () => btn.style.filter = 'brightness(1.5)');
    btn.addEventListener('mouseup', () => btn.style.filter = 'none');
    btn.addEventListener('mouseleave', () => btn.style.filter = 'none');
    
    btn.addEventListener('touchstart', () => btn.style.filter = 'brightness(1.5)', {passive: true});
    btn.addEventListener('touchend', () => btn.style.filter = 'none');

    btn.addEventListener('click', () => handleInput(item.text));

    gridContainer.appendChild(btn);
});

appContainer.appendChild(gridContainer);
document.body.appendChild(appContainer);

let currentExpression = '';
let isEvaluated = false;

function handleInput(value) {
    if (value === 'AC') {
        currentExpression = '';
        historyDisplay.textContent = '';
        mainDisplay.textContent = '0';
        isEvaluated = false;
        return;
    }

    if (value === '⌫') {
        if (isEvaluated) return;
        
        // Массив sciFuncs возвращен к первоначальному состоянию
        const sciFuncs = ['sin(', 'cos(', 'tan(', 'log(', 'ln(', '√('];
        let deletedFunc = false;

        for (const func of sciFuncs) {
            if (currentExpression.endsWith(func)) {
                currentExpression = currentExpression.slice(0, -func.length);
                deletedFunc = true;
                break;
            }
        }

        if (!deletedFunc) {
            currentExpression = currentExpression.slice(0, -1);
        }

        mainDisplay.textContent = currentExpression || '0';
        return;
    }

    if (value === '=') {
        if (!currentExpression) return;
        evaluateExpression();
        return;
    }

    if (isEvaluated) {
        // Добавлен оператор '^'
        if (['+', '-', '*', '/', '%', '^'].includes(value)) {
            isEvaluated = false;
        } else {
            currentExpression = '';
            isEvaluated = false;
        }
    }

    if (['sin', 'cos', 'tan', 'log', 'ln', '√'].includes(value)) {
        currentExpression += value + '(';
    } else {
        currentExpression += value;
    }
    
    mainDisplay.textContent = currentExpression;
}

/*
 * Математичний парсер
 */
function evaluateExpression() {
    historyDisplay.textContent = currentExpression + ' =';
    let mathString = currentExpression
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, 'Math.PI')
        .replace(/\^/g, '**') // Трансформация '^' в оператор '**'
        .replace(/%/g, '/100') 
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/√\(/g, 'Math.sqrt(');

    try {
        const result = new Function('return ' + mathString)();
        
        if (!isFinite(result) || isNaN(result)) {
            throw new Error('Invalid');
        }

        const formattedResult = Number.isInteger(result) ? result : parseFloat(result.toFixed(8));
        mainDisplay.textContent = formattedResult;
        currentExpression = formattedResult.toString();
        isEvaluated = true;
    } catch (error) {
        mainDisplay.textContent = 'Помилка';
        currentExpression = '';
        isEvaluated = true;
    }
}

/*
 * Обробка подій клавіатури
 */
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
if (/[0-9\.\+\-\*\/%\(\)]/.test(key)) {
        handleInput(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault(); 
        handleInput('=');
    } else if (key === 'Backspace') {
        handleInput('⌫');
    } else if (key === 'Escape' || key === 'Delete') {
        handleInput('AC');
    }
});

/*
 * Динамічна зміна розміру тексту дисплею для довгих чисел
 */
const resizeObserver = new ResizeObserver(() => {
    if (mainDisplay.textContent.length > 10) {
        mainDisplay.style.fontSize = '2.5rem';
    } else if (mainDisplay.textContent.length > 7) {
        mainDisplay.style.fontSize = '3.5rem';
    } else {
        mainDisplay.style.fontSize = '4.5rem';
    }
});
resizeObserver.observe(mainDisplay);