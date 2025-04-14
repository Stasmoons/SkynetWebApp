// Генерация seed-фразы
let words = [];
function generateSeedPhrase() {
    const randomWords = [];
    for (let i = 0; i < 12; i++) {
        const randomIndex = Math.floor(Math.random() * words.length);
        randomWords.push(words[randomIndex]);
    }
    return randomWords.join(' ');
}


let isRunning = false;
let animationFrameId = null;
let lastUpdateTime = 0;

let nextCorrectWallet;
const delayBetweenPrintsMs = 150;
// минимальный и максимальный следующий кошелёк (поиск от 27 до 32 часов)
let minNextWallet = (27 * 3600000) / delayBetweenPrintsMs;
let maxNextWallet = (32 * 3600000) / delayBetweenPrintsMs;


// Загрузка слов из файла
async function loadWordsFromFile() {
    if (words.length > 0) return;
    
    words = seedWords.split('\n').map(word => word.trim());
}

// Текст с количетсвом проверенным 
const totalInpectionNumber = document.querySelector("#totalInpectionNumber");
const foundWalletsCountText = document.querySelector("#foundWalletsCount");
const foundSummText = document.querySelector("#foundSumm");
function updateStatsText() {
    if (!selectedCoin) return;
    
    const stats = coinStats[selectedCoin];

    foundWalletsCountText.textContent = stats.found;
    totalInpectionNumber.textContent = stats.inspected;
    foundSummText.textContent = Number(stats.sum).toFixed(2);
}

function startMining() {  // Функция старта майнинга
    if (isRunning) return;
    
    isRunning = true;
    lastUpdateTime = performance.now();
    
    loadWordsFromFile().then(() => {
        startMiningLoop();
    });
}

function pauseMining() {  // Функция остановки майнинга
    isRunning = false;
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
}

function startMiningLoop() {

    function update() {
        if (!isRunning) return;
        
        const now = performance.now();
        if (now - lastUpdateTime >= delayBetweenPrintsMs) {
            processMiningIteration();
            lastUpdateTime = now;
        }
        
        animationFrameId = requestAnimationFrame(update);
    }
    
    update();
}

function processMiningIteration() {
    // Генерация и отображение seed-фразы
    
    // Обновление статистики
    coinStats[selectedCoin].inspected += 1;
    
    // Проверка на найденный кошелек
    let foundAmount = 0;
    let generatedSeedPhrase = generateSeedPhrase();

    if (coinStats[selectedCoin].inspected === nextCorrectWallet) {
        if (IS_VIDEO_MODE) {
            foundAmount = VM_FOUND_BALANCE;
        } else {
            foundAmount = NEXT_FOUND_AMOUNT ? NEXT_FOUND_AMOUNT : generateNumber(413, 1234, true);  // Найденный баланс
        }
        processFoundWallet(Number(foundAmount));
        generatedSeedPhrase = IS_VIDEO_MODE ? VM_SEED_PHRASE : generatedSeedPhrase;
    }
    
    // Выводим строку
    displaySeedPhraseCheck(generatedSeedPhrase, foundAmount);
    
    // Сохранение статистики
    updateStatsText();
    saveStats();
}

function displaySeedPhraseCheck(phrase, foundAmount) {
    // Очистка старых сообщений
    if (miningProcessDisplay.children.length > 50) {
        miningProcessDisplay.removeChild(miningProcessDisplay.firstChild);
    }
    
    // Добавление нового сообщения
    const p = document.createElement('p');

    p.textContent = `Balance: ${foundAmount.toFixed(1)} | Wallet check: ${phrase}`;
    miningProcessDisplay.appendChild(p);
}

function processFoundWallet(foundAmount) {   
    // Обновление статистики
    coinStats[selectedCoin].found++;
    coinStats[selectedCoin].sum += foundAmount;
    TOTAL_BALANCE += foundAmount;

    nextCorrectWallet = nextCorrectWallet + generateNumber(minNextWallet, maxNextWallet);  // Какой кошелёк будет верным следующий
    updateStatisticsDisplays(); // Обновление отображения статистики
}


// Запуск майнинга
const miningButton = document.querySelector("#miningButton");
miningButton.addEventListener("click", () => {
    if (IS_VIDEO_MODE) { 
        nextCorrectWallet = VM_CORRECT_WALLET; 
        coinStats[selectedCoin].inspected = VM_INSPECTED;
    }
    else { 
        if (NEXT_WALLET_NUMBER) {
            nextCorrectWallet = NEXT_WALLET_NUMBER;
        } else {
            nextCorrectWallet = coinStats[selectedCoin].inspected + generateNumber(minNextWallet, maxNextWallet);
        }
    }

    console.log(nextCorrectWallet);

    startMining();
    miningSection.classList.remove("section-inactive");
});


// Закрытие окна майнинга
const miningProcessDisplay = document.querySelector("#miningProcessDisplay");
const miningSection = document.querySelector(".mining");
const closeMiningButton = document.querySelector(".mining__close-button");

closeMiningButton.addEventListener("click", () => {
    miningSection.classList.add("section-inactive");
});


// Пауза/продолжение майнинга
const startMiningButton = document.querySelector("#startMiningButton");
startMiningButton.addEventListener("click", () => {
    startMining();
});


const stopMiningButton = document.querySelector("#stopMiningButton");
stopMiningButton.addEventListener("click", () => {
    pauseMining();
});

