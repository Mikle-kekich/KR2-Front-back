document.addEventListener('DOMContentLoaded', function() {
    console.log('Портфолио загружено успешно!');

    // Плавная прокрутка для якорных ссылок
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Анимация появления элементов при прокрутке
    function animateOnScroll() {
        const elements = document.querySelectorAll('.skills, .best-projects, .project-card-detailed, .diary-entry');
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    
                    setTimeout(function() {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        elements.forEach(function(element) {
            observer.observe(element);
        });
    }

    animateOnScroll();

    // Анимация прогресс-баров
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill');
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const targetWidth = progressBar.style.width;
                    
                    progressBar.style.width = '0';
                    
                    setTimeout(function() {
                        progressBar.style.transition = 'width 1.5s ease-out';
                        progressBar.style.width = targetWidth;
                    }, 200);
                    
                    observer.unobserve(progressBar);
                }
            });
        }, {
            threshold: 0.5
        });

        progressBars.forEach(function(bar) {
            observer.observe(bar);
        });
    }

    animateProgressBars();

    // Подсветка активной страницы в навигации
    function highlightActivePage() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('nav a');
        
        navLinks.forEach(function(link) {
            const linkPath = link.getAttribute('href');
            
            // Проверяем, соответствует ли ссылка текущей странице
            if (currentPath.endsWith(linkPath) || 
                (linkPath === 'index.html' && currentPath.endsWith('/')) ||
                (linkPath === '../index.html' && currentPath.endsWith('/'))) {
                link.classList.add('active');
            }
        });
    }

    highlightActivePage();

    // Обработка кнопки "Добавить запись" в дневнике
    const addEntryBtn = document.querySelector('.btn-add');
    if (addEntryBtn) {
        addEntryBtn.addEventListener('click', function() {
            alert('Функция добавления записи будет реализована позже!\\n\\nЗдесь откроется форма для создания новой записи в дневнике.');
        });
    }

   

    // Эффект печатающегося текста для заголовка (опционально)
    function typeWriterEffect() {
        const heroTitle = document.querySelector('.intro h1');
        if (heroTitle && heroTitle.textContent === 'Привет! Я студент') {
            const text = heroTitle.textContent;
            heroTitle.textContent = '';
            let i = 0;
            
            function type() {
                if (i < text.length) {
                    heroTitle.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, 100);
                }
            }
            
            // Раскомментируйте следующую строку, чтобы активировать эффект
            // type();
        }
    }

    typeWriterEffect();

    // Показываем год в футере
    const footer = document.querySelector('footer p');
    if (footer) {
        const currentYear = new Date().getFullYear();
        footer.textContent = `© ${currentYear} Контакты`;
    }

    // Отслеживание времени на странице (для статистики)
    let startTime = Date.now();
    
    window.addEventListener('beforeunload', function() {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        console.log(`Время на странице: ${timeSpent} секунд`);
    });

    // Обработка ошибок загрузки изображений
    const images = document.querySelectorAll('img');
    images.forEach(function(img) {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Не удалось загрузить изображение:', this.src);
        });
    });

    // Добавление интерактивности к карточкам проектов на главной странице
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    console.log('Все скрипты инициализированы!');
});

// Функция для форматирования даты
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('ru-RU', options);
}

// Экспорт функций для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatDate: formatDate
    };
}