$(document).ready(function() {
    let isSpinning = false;
    let currentRotation = 0;
    const wheel = $('#wheel');
    const wheelImage = $('#wheelImage');
    const spinButton = $('#spinButton');
    const spinButtonImage = $('#spinButtonImage');
    const result = $('#result');
    const awardOverlay = $('#awardOverlay');
    const awardLink = $('#awardLink');
    const mobileSpinButton = $('#mobileSpinButton');
    // min 184 max 225
    
    // Установите ссылку для награды здесь
    // awardLink.attr('href', 'https://example.com');

    // Функция для вращения колеса
    function spinWheel() {
        if (isSpinning) return;
        
        isSpinning = true;
        wheel.addClass('spinning');
        spinButton.prop('disabled', true);
        result.text('');

        // Генерируем рандомное число от 6 до 7 (целое)
        const randomTurns = Math.floor(Math.random() * 2) + 6; // 6 или 7
        
        // Генерируем рандомное число от 184 до 225 (целое)
        const randomAngle = Math.floor(Math.random() * (695 - 650 + 1)) + 660; // от 184 до 225 включительно

        // Вычисляем целевой угол (в градусах)
        // randomTurns * 360 + randomAngle
        const targetRotation = currentRotation + (randomTurns * 360) + randomAngle;
        
        // Применяем вращение
        wheelImage.css('transform', `rotate(${targetRotation}deg)`);
        

        // После завершения анимации
        setTimeout(function() {
            isSpinning = false;
            wheel.removeClass('spinning');
            spinButton.prop('disabled', false);
            result.text('Результат: ' + randomAngle + '°');
            
            // Показываем награду с затемнением
            showAward();
        }, 4000);
    }

    // Обработчик клика на кнопку
    spinButton.on('click', function() {
        spinWheel();
    });

    // Обработчик клика на изображение кнопки
    spinButtonImage.on('click', function() {
        if (!isSpinning) {
            spinButton.click();
        }
    });

    // Обработчик клика на мобильную кнопку
    mobileSpinButton.on('click', function() {
        if (!isSpinning) {
            spinWheel();
        }
    });

    // Функция для показа награды
    function showAward() {
        awardOverlay.addClass('show');
    }
});



