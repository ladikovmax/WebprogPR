const SCRIPTS = {
    1: { file: 'script1.js', title: 'Секунди', icon: '⏱️', hasDomOutput: true, desc: 'Обчислює залишок секунд від початку останньої хвилини (seconds(total)).' },
    2: { file: 'script2.js', title: 'Периметр багатокутника', icon: '⬡', hasDomOutput: true, desc: 'Обчислює периметр правильного багатокутника (perimeter(side, count)).' },
    3: { file: 'script3.js', title: 'FizzBuzz', icon: '🥤', hasDomOutput: true, desc: 'Виводить у консоль та на сторінку числа від 1 до n з заміною кратних 3 на fizz, кратних 5 на buzz, та кратних обом на fizzbuzz.' },
    4: { file: 'script4.js', title: 'Середнє арифметичне', icon: '📊', hasDomOutput: true, desc: 'Обчислює середнє арифметичне трьох чисел (Calculate(a, b, c)).' },
    5: { file: 'script5.js', title: 'Подільність чисел', icon: '➗', hasDomOutput: true, desc: 'Перевіряє, чи ділиться n на x та y (isDivisible(n, x, y)) трьома способами.' },
    6: { file: 'script6.js', title: 'Аналіз масиву', icon: '🔢', hasDomOutput: true, desc: 'Генерує випадковий масив розміром N та обчислює мін, макс, суму, середнє та виводить непарні.' },
    7: { file: 'script7.js', title: 'Двовимірний масив', icon: '▦', hasDomOutput: true, desc: 'Створює матрицю 5х5 та змінює значення на головній діагоналі (<0 на 0, >0 на 1).' },
    8: { file: 'script8.js', title: 'Арифметика', icon: '🧮', hasDomOutput: true, desc: 'Чотири арифметичні функції (Add, Sub, Mul, Div) з перевіркою ділення на 0 та інтерактивним вводом.' },
    9: { file: 'script9.js', title: 'Аналіз числа', icon: '🔍', hasDomOutput: true, desc: 'Перевіряє знак числа, чи є воно простим та чи ділиться на 2, 3, 5, 6, 9 без залишку.' },
    10: { file: 'script10.js', title: 'Обернення масиву', icon: '🔁', hasDomOutput: true, desc: 'Перевертає масив та підносить усі числові значення до квадрату.' },
    11: { file: 'script11.js', title: 'Видалення дублікатів', icon: '✂️', hasDomOutput: true, desc: 'Видаляє дублюючі елементи з масиву (removeDuplicates(arr)).' },
};

const trigger = document.getElementById('selectTrigger');
const triggerText = document.getElementById('triggerText');
const triggerIcon = document.getElementById('triggerIcon');
const dropdown = document.getElementById('selectDropdown');
const items = dropdown.querySelectorAll('.dropdown-item');
const runBtn = document.getElementById('runBtn');
const infoPanel = document.getElementById('infoPanel');
const infoIcon = document.getElementById('infoIcon');
const infoText = document.getElementById('infoText');
const outputSection = document.getElementById('outputSection');
const numEl = document.getElementById('num');

let selectedValue = null;
let isOpen = false;

function openDropdown() {
    isOpen = true;
    dropdown.classList.add('open');
    trigger.classList.add('active');
    trigger.setAttribute('aria-expanded', 'true');
}

function closeDropdown() {
    isOpen = false;
    dropdown.classList.remove('open');
    trigger.classList.remove('active');
    trigger.setAttribute('aria-expanded', 'false');
}

function toggleDropdown() {
    isOpen ? closeDropdown() : openDropdown();
}

function selectItem(value) {
    selectedValue = value;
    const script = SCRIPTS[value];

    triggerText.textContent = `${script.icon}  ${script.title}`;
    triggerIcon.textContent = '';
    triggerIcon.style.display = 'none';

    items.forEach(item => item.classList.remove('selected'));
    const activeItem = dropdown.querySelector(`[data-value="${value}"]`);
    if (activeItem) activeItem.classList.add('selected');

    infoIcon.textContent = script.icon;
    infoText.textContent = script.desc;
    infoPanel.classList.add('has-selection');

    runBtn.disabled = false;

    closeDropdown();
}

function runSelectedScript() {
    if (!selectedValue) return;
    const script = SCRIPTS[selectedValue];

    numEl.textContent = '';
    outputSection.classList.remove('visible');

    runBtn.classList.add('running');
    setTimeout(() => runBtn.classList.remove('running'), 500);

    const existingScript = document.getElementById('dynamicScript');
    if (existingScript) existingScript.remove();

    const s = document.createElement('script');
    s.id = 'dynamicScript';
    s.onload = () => {
        if (script.hasDomOutput) {
            if (numEl.textContent.trim()) {
                outputSection.classList.add('visible');
            }
        }
    };
    s.onerror = () => {
        console.error(`Не вдалося завантажити або виконати скрипт: ${script.file}`);
    };
    s.src = script.file + '?t=' + Date.now();
    document.body.appendChild(s);
}

trigger.addEventListener('click', toggleDropdown);

items.forEach(item => {
    item.addEventListener('click', () => {
        selectItem(Number(item.dataset.value));
    });

    item.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            selectItem(Number(item.dataset.value));
        }
    });
});

runBtn.addEventListener('click', runSelectedScript);

document.addEventListener('click', e => {
    if (isOpen && !trigger.contains(e.target) && !dropdown.contains(e.target)) {
        closeDropdown();
    }
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen) {
        closeDropdown();
        trigger.focus();
    }
    if (isOpen) {
        const current = document.activeElement;
        const idx = [...items].indexOf(current);
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            (items[idx + 1] || items[0]).focus();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            (items[idx - 1] || items[items.length - 1]).focus();
        }
    }
});
