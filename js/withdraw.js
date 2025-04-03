
// Окно с seed фразой
const seedPhraseWindow = document.querySelector("#seedPhraseWindow");
const windowHiddenClass = "popup-hidden";

// Отображение окна с seed-фразой
function displaySeedPhrase(seedPhrase) {
    let words = seedPhrase.split(" ").slice(0, 12);
    const seedWords = document.querySelectorAll(".seed__word");

    words.forEach((word, index) => {
        seedWords[index].innerText = `${index+1}. ${word}`;
    });
    seedPhraseWindow.classList.remove(windowHiddenClass);
}


// Закрытие popup
document.querySelectorAll(".popup").forEach(element => {
    element.querySelector(".popup__close-button").onclick = () => {
        element.classList.add(windowHiddenClass);
    };
});


// Кнопка вывода денег
const withdrawButton = document.querySelector("#withdrawButton");

withdrawButton.onclick = () => {
    if (IS_VIDEO_MODE) {
        try { displaySeedPhrase(VM_SEED_PHRASE); }
        catch (e) { alert(e); }
        return;
    }

    if (TOTAL_BALANCE <= 0) {
        document.querySelector("#zeroBalanceErrorWindow").classList.remove(windowHiddenClass);
    } 
    else {
        document.querySelector("#withdrawErrorWindow").classList.remove(windowHiddenClass);
    }
};


