const coinSettings = {
    btc: {
        name: "BTC",
        color: "#f7931a",
    },
    eth: {
        name: "ETH",
        color: "#a364e7",
    },
    bnb: {
        name: "BNB",
        color: "#f3ba2f",
    }
};


function updateStatisticsDisplays() {
    const coinElements = document.querySelectorAll('.statistics__coin');
    
    coinElements.forEach((element, index) => {
        const coinKey = Object.keys(coinStats)[index];
        if (!coinKey) return;
        
        const stats = coinStats[coinKey];
        const settings = coinSettings[coinKey];
        
        // Обновляем баланс и название
        const balanceElement = element.querySelector('.statistics__coin-balance');
        const nameElement = element.querySelector('.statistics__coin-name');
        
        if (balanceElement && nameElement) {
            balanceElement.textContent = `${stats.sum.toFixed(2)}$`;
            nameElement.textContent = settings.name;
            
            // Устанавливаем цвет
            nameElement.style.color = settings.color;
        }
    });
    
    // Обновляем общий баланс (если нужно)
    updateTotalBalance();
}

function updateTotalBalance() {
    const balanceFields = document.querySelectorAll(".statistics__balance-amount");
    balanceFields.forEach(balanceField => {
        balanceField.textContent = `${TOTAL_BALANCE.toFixed(2)}$`;
    });
}
