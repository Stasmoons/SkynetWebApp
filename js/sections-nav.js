function setupSectionsNavigation() { 
    const navButtons = document.querySelectorAll('.sections-nav__button');
    const sections = document.querySelectorAll('.section');
    let currentActiveButton = null;

    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionName = this.getAttribute('section-name');
            
            // Возвращаем предыдущей активной кнопке белую иконку
            if (currentActiveButton) {
                const prevIcon = currentActiveButton.querySelector('.sections-nav__button-icon');
                const prevIconName = prevIcon.src.split('/').pop().replace('_blue.png', '');
                prevIcon.src = `static/icons/${prevIconName}_white.png`;
                currentActiveButton.classList.remove('active');
            }
            
            // Убираем активные классы у всех секций
            sections.forEach(section => section.classList.add('section-inactive'));
            
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            currentActiveButton = this;
            
            // Меняем иконку на синюю
            const icon = this.querySelector('.sections-nav__button-icon');
            const iconName = icon.src.split('/').pop().replace('_white.png', '');
            icon.src = `static/icons/${iconName}_blue.png`;
            
            // Показываем соответствующую секцию
            const targetSection = document.querySelector(`[section-name="${sectionName}"]`);
            if (targetSection) {
                targetSection.classList.remove('section-inactive');
            }
        });
    });
    
    // Активируем первую секцию по умолчанию
    if (navButtons.length > 0) {
        navButtons[0].click();
    }
 }