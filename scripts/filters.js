document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card-detailed');

    // Функция фильтрации проектов
    function filterProjects(category) {
        projectCards.forEach(function(card) {
            const cardCategory = card.getAttribute('data-category');

            if (category === 'all' || cardCategory === category) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Обработка кликов на кнопки фильтров
    filterButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Удаляем класс active у всех кнопок
            filterButtons.forEach(function(btn) {
                btn.classList.remove('active');
            });

            // Добавляем класс active к нажатой кнопке
            this.classList.add('active');

            // Получаем категорию фильтра
            const filterCategory = this.getAttribute('data-filter');

            // Применяем фильтрацию
            filterProjects(filterCategory);
        });
    });

    // Анимация появления карточек
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
});