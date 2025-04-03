
const coinStats = {
    btc: { inspected: 0, found: 0, sum: 0 },
    eth: { inspected: 0, found: 0, sum: 0 },
    bnb: { inspected: 0, found: 0, sum: 0 }
};

let TOTAL_BALANCE = 0;


function loadStats() {
    const savedStats = getCookie('coinStats');
    if (savedStats) {
        Object.assign(coinStats, savedStats);
    }

    const totalBalance = getCookie('totalBalance');
    if (totalBalance) {
        TOTAL_BALANCE = Number(totalBalance) || 0;
    }
}


function saveStats() {
    setCookie('coinStats', coinStats);
    setCookie('totalBalance', TOTAL_BALANCE);
}


function resetStats() {
    // Очищаем статистику по всем монетам
    Object.keys(coinStats).forEach(coin => {
        coinStats[coin] = { inspected: 0, found: 0, sum: 0 };
    });
    
    // Сбрасываем общий баланс
    TOTAL_BALANCE = 0;
    
    // Сохраняем изменения в куки
    saveStats();
}