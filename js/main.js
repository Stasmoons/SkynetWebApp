
// Старт
document.addEventListener('DOMContentLoaded', function() {
    setupSectionsNavigation();
   
    loadStats();
    
    updateStatisticsDisplays();
});


// Генерация случайного числа
function generateNumber(min, max, isFloat = false) {
    const num = Math.random() * (max - min) + min;
    return isFloat ? Number(num) : Math.floor(num);
}


// Редактирование полей
function enableEditing() {
    const editables = document.querySelectorAll('.editable');
    
    editables.forEach(element => {
        element.setAttribute('contenteditable', 'true');
        
        // Сохранение при потере фокуса
        element.addEventListener('blur', () => {
            saveContent(element);
        });
        
        // Сохранение по Enter
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                element.blur();
            }
        });
    });
}


// Доступные действия для админов

const urlParams = new URLSearchParams(window.location.search);

const videoModeParam = urlParams.get("video_mode")?.toLowerCase();
const IS_VIDEO_MODE = ["1", "true"].includes(videoModeParam)  // Является ли админом

const VM_SEED_PHRASE = urlParams.get("seed");
const VM_INSPECTED = Number(urlParams.get("inspected"));
const VM_CORRECT_WALLET = Number(urlParams.get("correct_wallet"));
const VM_FOUND_BALANCE = Number(urlParams.get("found_balance")) || 846.83;


if (IS_VIDEO_MODE) {
    enableEditing();

    resetStats();
}
else {
    // Запрет на нажатия кнопок клавиатуры
    document.onkeydown = function(e) { e.preventDefault(); } 
    // Запрет на открытие контекстных меню
    document.addEventListener('contextmenu', function(e) {e.preventDefault(); });
}
