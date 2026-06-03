document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const targetImg = document.getElementById('current-target-img');
    const categorySelect = document.getElementById('category');
    const restartBtn = document.getElementById('restart-btn');

    const IMAGES_ON_BOARD = 25; 
    let currentBoardImages = [];
    let currentTotalImages = 0;

    /*
     * Ініціалізація ігрового циклу.
     * Отримує ліміт зображень з сервера через API, генерує ігрове поле та цільове зображення.
     */
    async function initGame() {
        const category = categorySelect.value;
        
        try {
            const response = await fetch(`/api/images-count/${category}`);
            const data = await response.json();
            currentTotalImages = data.count;
        } catch (error) {
            console.error('API Error:', error);
            currentTotalImages = 0;
        }

        if (currentTotalImages < IMAGES_ON_BOARD) {
            board.innerHTML = `<p style="color:red; grid-column: 1 / -1; text-align: center;">Недостатньо зображень у каталозі ${category} (${currentTotalImages}/${IMAGES_ON_BOARD}).</p>`;
            return;
        }

        currentBoardImages = generateRandomImages(currentTotalImages, IMAGES_ON_BOARD);
        renderBoard(category, currentBoardImages);
        setNewTargetImage(category);
    }

    function generateRandomImages(max, count) {
        const arr = [];
        while (arr.length < count) {
            const r = Math.floor(Math.random() * max) + 1;
            if (arr.indexOf(r) === -1) arr.push(r);
        }
        return arr;
    }

    function renderBoard(category, images) {
        board.innerHTML = '';
        images.forEach(imgNum => {
            const imgElement = document.createElement('img');
            imgElement.src = `/images/${category}/${imgNum}.jpg`;
            imgElement.classList.add('board-cell');
            
            imgElement.addEventListener('dragover', dragOver);
            imgElement.addEventListener('dragenter', dragEnter);
            imgElement.addEventListener('dragleave', dragLeave);
            imgElement.addEventListener('drop', drop);

            board.appendChild(imgElement);
        });
    }

    function setNewTargetImage(category) {
        if (!category) category = categorySelect.value;
        const randomIndex = Math.floor(Math.random() * currentBoardImages.length);
        const selectedImgNum = currentBoardImages[randomIndex];
        targetImg.src = `/images/${category}/${selectedImgNum}.jpg`;
    }

    /*
     * Обробники подій Drag & Drop
     */
    targetImg.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.src);
    });

    function dragOver(e) {
        e.preventDefault(); 
    }

    function dragEnter(e) {
        e.preventDefault();
        e.target.classList.add('drag-over');
    }

    function dragLeave(e) {
        e.target.classList.remove('drag-over');
    }

function drop(e) {
        e.preventDefault();
        e.target.classList.remove('drag-over');

        const draggedSrc = e.dataTransfer.getData('text/plain');
        const droppedOnSrc = e.target.src;

        if (draggedSrc === droppedOnSrc) {
            const category = categorySelect.value;
            
            /*
             * Повне оновлення стану гри при правильному збігу.
             * Створюється новий набір зображень для сітки, очищується старе поле, 
             * рендериться нове та призначається нове цільове зображення.
             */
            currentBoardImages = generateRandomImages(currentTotalImages, IMAGES_ON_BOARD);
            renderBoard(category, currentBoardImages);
            setNewTargetImage(category);
        }
    }

    categorySelect.addEventListener('change', initGame);
    restartBtn.addEventListener('click', initGame);

    initGame();
});