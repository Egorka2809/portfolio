(function () {

    // Бургер

    document.addEventListener('click', burgerInit)

    function burgerInit(e) {
        const burgerIcon = e.target.closest('.burger-icon')
        const burgerNavLink = e.target.closest('.nav__link-burger')

        if (!burgerIcon && !burgerNavLink) return

        if (!document.body.classList.contains('body--opened-menu')) {
            document.body.classList.add('body--opened-menu')
            document.body.classList.add('body--opened-swiper')
        } else {
            document.body.classList.remove('body--opened-menu')
            document.body.classList.remove('body--opened-swiper')
        }
    }

    // актив на показать еще
    const buttons = document.querySelectorAll('.hints__list-item');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Если элемент уже активен — снимаем active
            if (btn.classList.contains('active')) {
                btn.classList.remove('active');
            } else {
                // Иначе — снимаем active со всех и добавляем текущему
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            }
        });
    });
    // Показать еще categories
    document.addEventListener("DOMContentLoaded", function () {
        const button = document.querySelector(".top__hints-button");
        const items = Array.from(document.querySelectorAll(".hints__list-item"));
        let itemsPerClick = getItemsPerClick();

        function getItemsPerClick() {
            return window.innerWidth <= 500 ? 3 : 4;
        }

        function hideExtraItems() {
            items.forEach((item, index) => {
                if (index < itemsPerClick) {
                    item.classList.remove("hidden");
                } else {
                    item.classList.add("hidden");
                }
            });
            button.textContent = "Показать ещё";
        }

        function showNextItems() {
            const hiddenItems = items.filter(item => item.classList.contains("hidden"));
            for (let i = 0; i < itemsPerClick && i < hiddenItems.length; i++) {
                hiddenItems[i].classList.remove("hidden");
            }

            if (items.filter(item => item.classList.contains("hidden")).length === 0) {
                button.textContent = "Сбросить";
            }
        }

        button.addEventListener("click", function () {
            if (button.textContent === "Сбросить") {
                hideExtraItems();
            } else {
                showNextItems();
            }
        });

        window.addEventListener("resize", () => {
            const newCount = getItemsPerClick();
            if (newCount !== itemsPerClick) {
                itemsPerClick = newCount;
                hideExtraItems();
            }
        });

        hideExtraItems();
    });// изначально скрываем лишнее

    // Показать еще  news

    document.addEventListener("DOMContentLoaded", function () {

        function initShowMore(buttonSelector, itemsContainerSelector, itemsPerClick) {
            const button = document.querySelector(buttonSelector);

            if (!button) return;

            const originalHTML = button.innerHTML;
            const items = Array.from(document.querySelector(itemsContainerSelector).querySelectorAll(".news__grid-item"));
            let visibleCount = 0;

            function showItems() {
                const nextItems = items.slice(visibleCount, visibleCount + itemsPerClick);
                nextItems.forEach(item => item.classList.remove("hidden"));
                visibleCount += nextItems.length;

                if (visibleCount >= items.length) {
                    button.textContent = "Сбросить";
                    button.classList.add("center-text");
                }
            }

            function hideItems() {
                items.forEach((item, index) => {
                    if (index >= itemsPerClick) {
                        item.classList.add("hidden");
                    }
                });
                visibleCount = itemsPerClick;
                button.innerHTML = originalHTML;
                button.classList.remove("center-text");
            }

            button.addEventListener("click", function () {
                if (visibleCount >= items.length) {
                    hideItems();
                } else {
                    showItems();
                }
            });

            hideItems();
        }

        // Десктоп — показывать по 3
        initShowMore(".news__button-desktop", ".news__grid", 3);

        // Мобайл — показывать по 2
        initShowMore(".news__button-mobile", ".news__grid--mobile", 2);

    });

    // dropdown
    document.addEventListener("DOMContentLoaded", function () {
        const dropdown = document.querySelector(".body__dropdown");
        const button = dropdown.querySelector(".body__dropdown-button");
        const content = dropdown.querySelector(".body__dropdown-content");

        let isManualOpen = false;

        function updateDropdownBehavior() {
            const isMobile = window.innerWidth < 1024;

            if (isMobile) {
                // В мобильной версии: управление по клику
                button.addEventListener("click", toggleDropdown);
                document.addEventListener("click", closeOnOutsideClick);
            } else {
                // В десктопной версии: убираем JS-логику, оставляем hover через CSS
                button.removeEventListener("click", toggleDropdown);
                document.removeEventListener("click", closeOnOutsideClick);
                content.style.display = ""; // Доверяем CSS
                isManualOpen = false;
            }
        }

        function toggleDropdown(e) {
            e.stopPropagation();
            isManualOpen = !isManualOpen;
            content.style.display = isManualOpen ? "block" : "none";
        }

        function closeOnOutsideClick(e) {
            if (!dropdown.contains(e.target)) {
                isManualOpen = false;
                content.style.display = "none";
            }
        }

        // При загрузке
        updateDropdownBehavior();

        // При изменении размера окна (чтобы адаптировался динамически)
        window.addEventListener("resize", updateDropdownBehavior);
    });

    // =======

    document.addEventListener("DOMContentLoaded", function () {
        const btn = document.querySelector(".body__dropdown-button");
        const dropdown = document.querySelector(".body__dropdown-content");

        function toggleDropdown() {
            if (window.innerWidth < 1024) {
                const isOpen = dropdown.style.display === "block";
                dropdown.style.display = isOpen ? "none" : "block";

                // Добавим/удалим класс active для кнопки, чтобы стили менялись
                btn.classList.toggle("active", !isOpen);
            }
        }

        btn.addEventListener("click", toggleDropdown);

        // Для сброса при ресайзе экрана
        window.addEventListener("resize", () => {
            if (window.innerWidth >= 1024) {
                dropdown.style.display = "";
                btn.classList.remove("active");
            } else {
                dropdown.style.display = "none";
                btn.classList.remove("active");
            }
        });

        // При загрузке страницы — прячем меню на мобильных
        if (window.innerWidth < 1024) {
            dropdown.style.display = "none";
            btn.classList.remove("active");
        }
    });

    // 

    document.querySelectorAll('.counter').forEach(card => {
        const minusBtn = card.querySelector('.minus');
        const plusBtn = card.querySelector('.plus');
        const numberEl = card.querySelector('.number');

        const minusIcon = minusBtn.querySelector('.counter__button-icon');
        const plusIcon = plusBtn.querySelector('.counter__button-icon');

        let count = 1;
        const min = 1;
        const max = 10;

        function updateCounter() {
            numberEl.textContent = count;

            if (count <= min) {
                minusIcon.classList.add('inactive');
                minusBtn.style.pointerEvents = 'none';
            } else {
                minusIcon.classList.remove('inactive');
                minusBtn.style.pointerEvents = 'auto';
            }

            if (count >= max) {
                plusIcon.classList.add('inactive');
                plusBtn.style.pointerEvents = 'none';
            } else {
                plusIcon.classList.remove('inactive');
                plusBtn.style.pointerEvents = 'auto';
            }
        }

        plusBtn.addEventListener('click', () => {
            if (count < max) {
                count++;
                updateCounter();
            }
        });

        minusBtn.addEventListener('click', () => {
            if (count > min) {
                count--;
                updateCounter();
            }
        });

        updateCounter(); // запуск для конкретной карточки
    });




    // Инициализируем swiper и сохраняем в переменную swiper
    const categoriesSwiper = new Swiper('.categories__slider', {
        speed: 500,
        spaceBetween: 30,
        slidesPerView: 1,
        width: 1600,
        pagination: {
            el: '.categories__pagination',
            type: 'fraction',
            renderFraction: function (currentClass, totalClass) {
                return '<span class="' + currentClass + '"></span> из <span class="' + totalClass + '"></span>';
            },
        },
        navigation: {
            nextEl: '.categories__next',
            prevEl: '.categories__prev',
        },
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    });

    const reviewsSwiper = new Swiper('.reviews__slider', {
        speed: 500,
        spaceBetween: 30,
        slidesPerView: 1,
        pagination: {
            el: '.reviews__pagination',
            type: 'fraction',

        },
        navigation: {
            nextEl: '.reviews__next',
            prevEl: '.reviews__prev',
        },
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    });
    document.addEventListener('DOMContentLoaded', function () {
        const slider = document.querySelector('.reviews__slider');
        const openButtons = document.querySelectorAll('.item__text-button, .item__text-img img');
        const closeButtons = slider.querySelectorAll('.reviews__top-cansel');

        // Открытие
        openButtons.forEach(el => {
            el.addEventListener('click', () => {
                slider.classList.add('active');
                document.body.classList.add('body--opened-swiper');
            });
        });

        // Закрытие
        closeButtons.forEach(el => {
            el.addEventListener('click', () => {
                slider.classList.remove('active');
                document.body.classList.remove('body--opened-swiper');
            });
        });
    });





    document.addEventListener("DOMContentLoaded", function () {
        const items = Array.from(document.querySelectorAll(".reviews__item"));
        const button = document.querySelector(".reviews__button");
        const originalHTML = button.innerHTML; // сохраняем HTML, а не только текст
        const itemsPerClick = 3;
        let visibleCount = 3;

        // Скрываем всё кроме первых 3
        items.forEach((item, index) => {
            if (index >= visibleCount) {
                item.classList.add("hidden");
            }
        });

        button.addEventListener("click", () => {
            if (visibleCount >= items.length) {
                // Сброс
                items.forEach((item, index) => {
                    if (index >= 3) {
                        item.classList.add("hidden");
                    }
                });
                visibleCount = 3;
                button.innerHTML = originalHTML; // возвращаем исходный HTML (с иконкой)
            } else {
                // Показать ещё
                const nextItems = items.slice(visibleCount, visibleCount + itemsPerClick);
                nextItems.forEach(item => item.classList.remove("hidden"));
                visibleCount += nextItems.length;

                if (visibleCount >= items.length) {
                    button.textContent = "Сбросить"; // тут можно оставить только текст
                }
            }
        });
    });

    // ===========
    const modal = document.querySelector('.modal')
    const modalButton = document.querySelector('.write__button')

    modalButton.addEventListener('click', openModal)
    modal.addEventListener('click', closeModal)

    function openModal(e) {
        e.preventDefault()
        document.body.classList.toggle('body--opened-modal')
    }

    function closeModal(e) {
        e.preventDefault()

        const target = e.target

        if (target.closest('.modal__cancel') || target.classList.contains('modal')) {
            document.body.classList.remove('body--opened-modal')
        }

    }




    // Аккордеон

    const accordionLists = document.querySelectorAll('.accordion-list');

    accordionLists.forEach(el => {

        el.addEventListener('click', (e) => {

            const accordionList = e.currentTarget
            const accordionOpenedItem = accordionList.querySelector('.accordion-list__item--opened')
            const accordionOpenedContent = accordionList.querySelector('.accordion-list__item--opened .accordion-list__content')

            const accordionControl = e.target.closest('.accordion-list__control');
            if (!accordionControl) return
            const accordionItem = accordionControl.parentElement;
            const accordionContent = accordionControl.nextElementSibling;

            if (accordionOpenedItem && accordionItem != accordionOpenedItem) {
                accordionOpenedItem.classList.remove('accordion-list__item--opened');
                accordionOpenedContent.style.maxHeight = null;
            }
            accordionItem.classList.toggle('accordion-list__item--opened');

            if (accordionItem.classList.contains('accordion-list__item--opened')) {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
            } else {
                accordionContent.style.maxHeight = null;
            }

        });

    });
    // =============

    const telInputs = document.querySelectorAll('input[type="tel"]')
    const im = new Inputmask('+7 (999) 999-99-99')
    im.mask(telInputs)

    document.addEventListener("DOMContentLoaded", function () {
        const button = document.querySelector(".contact__button--subscribe");

        button.addEventListener("click", function () {
            if (!button.classList.contains("subscribed")) {
                button.classList.add("subscribed");
            }
        });
    });



})()
