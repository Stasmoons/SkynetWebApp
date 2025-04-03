let selectedCoin = null;
coins = document.querySelectorAll(".coin");


function displayStartButton() {
    let startMiningButton = document.getElementById("miningButton");
    startMiningButton.classList.remove("button-hidden");
}


coins.forEach(coinElement => {
    coinElement.addEventListener("change", function() {
        if (this.checked) {
            selectedCoin = this.value;
            displayStartButton();

            // Очистка дисплея процесса майнинга
            document.querySelector("#miningProcessDisplay").innerHTML = "";
        }
    });
});
