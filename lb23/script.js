const weekData = {
    languageQuestion: 'Виберіть мову "ua" або "en"?',
    invalidLanguageMessage: 'Неправильний ввід даних. Введіть "ua" або "en".',
    languages: {
        ua: {
            dayQuestion: 'Введіть номер дня неділі від 1 до 7?',
            invalidDayMessage: 'Неправильний ввід даних. Введіть число від 1 до 7.',
            resultLabel: 'День тижня',
            days: {
                1: 'Понеділок',
                2: 'Вівторок',
                3: 'Середа',
                4: 'Четвер',
                5: "П'ятниця",
                6: 'Субота',
                7: 'Неділя',
            },
        },
        en: {
            dayQuestion: 'Enter the day number of the week (from 1 to 7)?',
            invalidDayMessage: 'Invalid input. Enter a number from 1 to 7.',
            resultLabel: 'Week day',
            days: {
                1: 'Monday',
                2: 'Tuesday',
                3: 'Wednesday',
                4: 'Thursday',
                5: 'Friday',
                6: 'Saturday',
                7: 'Sunday',
            },
        },
    },
};

const runBtn = document.getElementById('runBtn');
const resultEl = document.getElementById('result');

function askLanguage() {
    while (true) {
        const answer = prompt(weekData.languageQuestion);

        if (answer === null) {
            return null;
        }

        const languageCode = answer.trim().toLowerCase();

        if (weekData.languages[languageCode]) {
            return languageCode;
        }

        alert(weekData.invalidLanguageMessage);
    }
}

function askDayNumber(languageCode) {
    const language = weekData.languages[languageCode];

    while (true) {
        const answer = prompt(language.dayQuestion);

        if (answer === null) {
            return null;
        }

        const dayText = answer.trim();
        const isCorrectDay = /^[1-7]$/.test(dayText);

        if (isCorrectDay) {
            return Number(dayText);
        }

        alert(language.invalidDayMessage);
    }
}

function showWeekDay() {
    const languageCode = askLanguage();

    if (languageCode === null) {
        return;
    }

    const dayNumber = askDayNumber(languageCode);

    if (dayNumber === null) {
        return;
    }

    const language = weekData.languages[languageCode];
    const dayName = language.days[dayNumber];

    alert(dayName);
    resultEl.textContent = `${language.resultLabel}: ${dayName}`;
}

runBtn.addEventListener('click', showWeekDay);

class GridElement {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }

    getGeneration() {
        return 0;
    }

    getConsumption() {
        return 0;
    }

    getDescription() {
        return this.name;
    }
}

class PowerPlant extends GridElement {
    constructor(name, power) {
        super(name, 'plant');
        this.power = power;

        if (power < 1 || power > 100) {
            throw new Error('Потужність електростанції повинна бути від 1 до 100 МВт.');
        }
    }

    getGeneration() {
        return this.power;
    }

    getDescription() {
        return formatMW(this.power);
    }
}

class SolarPanel extends GridElement {
    constructor(name, dayPower) {
        super(name, 'solar');
        this.dayPower = dayPower;

        if (dayPower < 1 || dayPower > 5) {
            throw new Error('Сонячна панель повинна генерувати від 1 до 5 МВт вдень.');
        }
    }

    getGeneration(period) {
        return period === 'day' ? this.dayPower : 0;
    }

    getDescription() {
        return `${formatMW(this.dayPower)} вдень`;
    }
}

class ResidentialBuilding extends GridElement {
    constructor(name, apartments) {
        super(name, 'house');
        this.apartments = apartments;

        if (!Number.isInteger(apartments) || apartments < 1 || apartments > 400) {
            throw new Error('У житловому будинку повинно бути від 1 до 400 квартир.');
        }
    }

    getConsumption(period) {
        const kilowattsPerApartment = period === 'day' ? 4 : 1;
        return (this.apartments * kilowattsPerApartment) / 1000;
    }

    getDescription() {
        return `${this.apartments} квартир`;
    }
}

class PowerLine extends GridElement {
    constructor(name, capacity, pricePerMW) {
        super(name, 'line');
        this.capacity = capacity;
        this.pricePerMW = pricePerMW;

        if (capacity <= 0 || pricePerMW <= 0) {
            throw new Error('Лінія електропередачі повинна мати додатні потужність і ціну.');
        }
    }

    getDescription() {
        return `${formatMW(this.capacity)}, ${formatMoney(this.pricePerMW)} за МВт`;
    }
}

class ElectricNetwork {
    constructor(elements) {
        this.elements = elements;
    }

    getTransferLines() {
        return this.elements.filter(element => element instanceof PowerLine);
    }

    getGeneration(period) {
        return this.elements.reduce((sum, element) => sum + element.getGeneration(period), 0);
    }

    getConsumption(period) {
        return this.elements.reduce((sum, element) => sum + element.getConsumption(period), 0);
    }

    calculateBalance(period) {
        const generation = roundMW(this.getGeneration(period));
        const consumption = roundMW(this.getConsumption(period));
        const balance = roundMW(generation - consumption);

        if (balance > 0) {
            return this.calculateTrade(period, generation, consumption, balance, 'sell');
        }

        if (balance < 0) {
            return this.calculateTrade(period, generation, consumption, Math.abs(balance), 'buy');
        }

        return {
            period,
            generation,
            consumption,
            balance,
            action: 'balanced',
            amount: 0,
            transferred: 0,
            remaining: 0,
            money: 0,
            financialImpact: 0,
            operations: [],
        };
    }

    calculateTrade(period, generation, consumption, amount, action) {
        const lines = [...this.getTransferLines()].sort((first, second) => {
            return action === 'buy'
                ? first.pricePerMW - second.pricePerMW
                : second.pricePerMW - first.pricePerMW;
        });

        let remaining = amount;
        let transferred = 0;
        let money = 0;
        const operations = [];

        for (const line of lines) {
            if (remaining <= 0) {
                break;
            }

            const currentAmount = Math.min(remaining, line.capacity);
            const currentMoney = currentAmount * line.pricePerMW;

            transferred = roundMW(transferred + currentAmount);
            money += currentMoney;
            remaining = roundMW(remaining - currentAmount);
            operations.push({ line, amount: currentAmount, money: currentMoney });
        }

        return {
            period,
            generation,
            consumption,
            balance: roundMW(generation - consumption),
            action,
            amount,
            transferred,
            remaining,
            money,
            financialImpact: action === 'sell' ? money : -money,
            operations,
        };
    }
}

const elementProfiles = {
    plant: {
        title: 'Електростанції',
        details: '8-40 МВт',
        min: 0,
        max: 4,
        powers: [8, 14, 24, 40],
    },
    solar: {
        title: 'Сонячні панелі',
        details: '1-5 МВт вдень',
        min: 0,
        max: 8,
        powers: [1, 2, 3, 4, 5, 2, 3, 4],
    },
    house: {
        title: 'Житлові будинки',
        details: '1-400 квартир',
        min: 0,
        max: 10,
        apartments: [90, 140, 180, 230, 280, 320, 360, 400, 120, 260],
    },
    line: {
        title: 'Лінії передачі',
        details: 'ціна за МВт',
        min: 0,
        max: 5,
        lines: [
            { capacity: 3, pricePerMW: 45 },
            { capacity: 4, pricePerMW: 80 },
            { capacity: 5, pricePerMW: 120 },
            { capacity: 2, pricePerMW: 60 },
            { capacity: 6, pricePerMW: 95 },
        ],
    },
};

const elementGroups = [
    { title: 'Генерація', types: ['plant', 'solar'] },
    { title: 'Споживання', types: ['house'] },
    { title: 'Передача', types: ['line'] },
];

const defaultGridCounts = {
    plant: 1,
    solar: 3,
    house: 6,
    line: 3,
};

const gridState = {
    activePeriod: 'day',
    counts: { ...defaultGridCounts },
};

const gridDom = {
    networkElements: document.getElementById('networkElements'),
    networkControls: document.getElementById('networkControls'),
    gridResult: document.getElementById('gridResult'),
    activeBalance: document.getElementById('activeBalance'),
    transferAmount: document.getElementById('transferAmount'),
    financeResult: document.getElementById('financeResult'),
    lineCapacity: document.getElementById('lineCapacity'),
    generationValue: document.getElementById('generationValue'),
    consumptionValue: document.getElementById('consumptionValue'),
    generationMeter: document.getElementById('generationMeter'),
    consumptionMeter: document.getElementById('consumptionMeter'),
    resetGridBtn: document.getElementById('resetGridBtn'),
    periodButtons: document.querySelectorAll('.period-btn'),
};

const iconSvg = {
    plant: `
        <svg class="tile-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 19h16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M6 19V8l5 4V8l5 4V7h3v12" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        </svg>
    `,
    solar: `
        <svg class="tile-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/>
        </svg>
    `,
    house: `
        <svg class="tile-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 11 12 4l8 7v9H5v-9" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <path d="M10 20v-6h4v6" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        </svg>
    `,
    line: `
        <svg class="tile-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 20 9 4h6l4 16M7 12h10M6 16h12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `,
};

function createNetworkElements(counts) {
    const elements = [];

    for (let index = 0; index < counts.plant; index += 1) {
        elements.push(new PowerPlant(`Станція ${index + 1}`, elementProfiles.plant.powers[index]));
    }

    for (let index = 0; index < counts.solar; index += 1) {
        elements.push(new SolarPanel(`Панель ${index + 1}`, elementProfiles.solar.powers[index]));
    }

    for (let index = 0; index < counts.house; index += 1) {
        elements.push(new ResidentialBuilding(`Будинок ${index + 1}`, elementProfiles.house.apartments[index]));
    }

    for (let index = 0; index < counts.line; index += 1) {
        const line = elementProfiles.line.lines[index];
        elements.push(new PowerLine(`Лінія ${index + 1}`, line.capacity, line.pricePerMW));
    }

    return elements;
}

function renderShopControls() {
    gridDom.networkControls.innerHTML = elementGroups.map(group => {
        return `
            <section class="control-group">
                <h4>${group.title}</h4>
                ${group.types.map(type => renderControlRow(type)).join('')}
            </section>
        `;
    }).join('');

    gridDom.networkControls.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            const type = button.dataset.type;
            const change = Number(button.dataset.change);
            updateElementCount(type, change);
        });
    });
}

function renderControlRow(type) {
    const profile = elementProfiles[type];
    const count = gridState.counts[type];

    return `
        <article class="shop-card">
            <div>
                <span>${profile.title}</span>
                <strong>${profile.details}</strong>
            </div>
            <div class="stepper">
                <button type="button" data-type="${type}" data-change="-1" aria-label="Зменшити ${profile.title}" ${count <= profile.min ? 'disabled' : ''}>-</button>
                <output>${count}</output>
                <button type="button" data-type="${type}" data-change="1" aria-label="Збільшити ${profile.title}" ${count >= profile.max ? 'disabled' : ''}>+</button>
            </div>
        </article>
    `;
}

function renderNetworkElements(elements) {
    if (elements.length === 0) {
        gridDom.networkElements.innerHTML = '<div class="empty-board">Мережа порожня</div>';
        return;
    }

    gridDom.networkElements.innerHTML = elementGroups.map(group => {
        const groupElements = elements.filter(element => group.types.includes(element.type));

        return `
            <section class="element-group">
                <h4>${group.title}</h4>
                <div class="element-list">
                    ${groupElements.length > 0
                        ? groupElements.map(renderElementRow).join('')
                        : '<p class="empty-row">Немає</p>'}
                </div>
            </section>
        `;
    }).join('');
}

function renderElementRow(element) {
    return `
        <article class="element-card ${element.type}">
            ${iconSvg[element.type]}
            <div>
                <div class="tile-title">${element.name}</div>
                <div class="tile-detail">${element.getDescription()}</div>
            </div>
        </article>
    `;
}

function renderMeters(activeResult) {
    const maxValue = Math.max(activeResult.generation, activeResult.consumption, 1);
    const generationWidth = Math.min(100, (activeResult.generation / maxValue) * 100);
    const consumptionWidth = Math.min(100, (activeResult.consumption / maxValue) * 100);

    gridDom.generationValue.textContent = formatMW(activeResult.generation);
    gridDom.consumptionValue.textContent = formatMW(activeResult.consumption);
    gridDom.generationMeter.style.width = `${generationWidth}%`;
    gridDom.consumptionMeter.style.width = `${consumptionWidth}%`;
}

function renderSummary(activeResult, network) {
    const totalLineCapacity = network.getTransferLines()
        .reduce((sum, line) => sum + line.capacity, 0);

    gridDom.activeBalance.textContent = formatMW(activeResult.balance);
    gridDom.activeBalance.className = activeResult.balance >= 0 ? 'positive' : 'negative';
    gridDom.transferAmount.textContent = formatMW(activeResult.transferred);
    gridDom.financeResult.textContent = formatSignedMoney(activeResult.financialImpact);
    gridDom.financeResult.className = activeResult.financialImpact >= 0 ? 'positive' : 'negative';
    gridDom.lineCapacity.textContent = formatMW(totalLineCapacity);
}

function renderPeriodResult(title, result, isActive) {
    const actionText = {
        buy: `Закупити ${formatMW(result.transferred)}: <span class="money negative">${formatMoney(result.money)}</span>.`,
        sell: `Продати ${formatMW(result.transferred)}: <span class="money positive">${formatMoney(result.money)}</span>.`,
        balanced: 'Баланс зійшовся.',
    };

    const remainingText = result.remaining > 0
        ? `<p class="negative">Не передано: ${formatMW(result.remaining)}</p>`
        : '';

    return `
        <section class="period-result ${isActive ? 'active' : ''}">
            <h3>${title}</h3>
            <p>Генерація: ${formatMW(result.generation)}</p>
            <p>Споживання: ${formatMW(result.consumption)}</p>
            <p>Баланс: <span class="${result.balance >= 0 ? 'positive' : 'negative'}">${formatMW(result.balance)}</span></p>
            <p>${actionText[result.action]}</p>
            ${remainingText}
            ${renderOperations(result.operations)}
        </section>
    `;
}

function renderOperations(operations) {
    if (operations.length === 0) {
        return '<p>Передача не потрібна.</p>';
    }

    return operations.map(operation => {
        return `<p>${operation.line.name}: ${formatMW(operation.amount)} x ${formatMoney(operation.line.pricePerMW)}</p>`;
    }).join('');
}

function renderCalculator() {
    const elements = createNetworkElements(gridState.counts);
    const network = new ElectricNetwork(elements);
    const dayResult = network.calculateBalance('day');
    const nightResult = network.calculateBalance('night');
    const activeResult = gridState.activePeriod === 'day' ? dayResult : nightResult;

    renderShopControls();
    renderNetworkElements(elements);
    renderMeters(activeResult);
    renderSummary(activeResult, network);

    gridDom.gridResult.innerHTML = [
        renderPeriodResult('День', dayResult, gridState.activePeriod === 'day'),
        renderPeriodResult('Ніч', nightResult, gridState.activePeriod === 'night'),
    ].join('');

    gridDom.periodButtons.forEach(button => {
        button.classList.toggle('active', button.dataset.period === gridState.activePeriod);
    });
}

function updateElementCount(type, change) {
    const profile = elementProfiles[type];
    const nextValue = clamp(gridState.counts[type] + change, profile.min, profile.max);

    gridState.counts[type] = nextValue;
    renderCalculator();
}

function resetCalculator() {
    gridState.counts = { ...defaultGridCounts };
    gridState.activePeriod = 'day';
    renderCalculator();
}

function formatMW(value) {
    return `${formatNumber(value)} МВт`;
}

function formatMoney(value) {
    return `${formatNumber(value)} ум. од.`;
}

function formatSignedMoney(value) {
    const sign = value > 0 ? '+' : '';
    return `${sign}${formatMoney(value)}`;
}

function formatNumber(value) {
    return value.toLocaleString('uk-UA', {
        maximumFractionDigits: 2,
        minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    });
}

function roundMW(value) {
    return Math.round(value * 100) / 100;
}

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}

gridDom.periodButtons.forEach(button => {
    button.addEventListener('click', () => {
        gridState.activePeriod = button.dataset.period;
        renderCalculator();
    });
});

gridDom.resetGridBtn.addEventListener('click', resetCalculator);

renderCalculator();
