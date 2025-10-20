document.addEventListener('DOMContentLoaded', function() {
    // Создаем модальное окно программно
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <div class="modal-body">
                <h2 id="modalTitle"></h2>
                <div id="modalImage" class="modal-image"></div>
                <div id="modalDescription"></div>
                <div id="modalTechnologies" class="modal-technologies"></div>
                <div class="modal-links">
                    <a href="#" id="modalLiveLink" class="btn-link" target="_blank">Живая версия</a>
                    <a href="#" id="modalCodeLink" class="btn-link" target="_blank">Исходный код</a>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Добавляем стили для модального окна
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            animation: fadeIn 0.3s;
        }

        .modal.active {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .modal-content {
            background-color: white;
            padding: 2rem;
            border-radius: 10px;
            max-width: 800px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            animation: slideIn 0.3s;
        }

        @keyframes slideIn {
            from {
                transform: translateY(-50px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }

        .modal-close {
            position: absolute;
            right: 1.5rem;
            top: 1rem;
            font-size: 2rem;
            font-weight: bold;
            color: #aaa;
            cursor: pointer;
            transition: color 0.3s;
        }

        .modal-close:hover {
            color: #000;
        }

        .modal-body h2 {
            margin-bottom: 1.5rem;
            color: #2c3e50;
        }

        .modal-image {
            width: 100%;
            height: 300px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 10px;
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.5rem;
        }

        .modal-technologies {
            display: flex;
            gap: 0.5rem;
            margin: 1rem 0;
            flex-wrap: wrap;
        }

        .modal-links {
            margin-top: 1.5rem;
            display: flex;
            gap: 1rem;
        }
    `;
    document.head.appendChild(modalStyles);

    // Закрытие модального окна
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('active');
    });

    // Закрытие при клике вне модального окна
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Закрытие по нажатию Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });

    // Функция открытия модального окна
    function openModal(projectData) {
        document.getElementById('modalTitle').textContent = projectData.title;
        document.getElementById('modalImage').textContent = projectData.imageText;
        document.getElementById('modalDescription').innerHTML = projectData.description;
        
        // Добавляем технологии
        const techContainer = document.getElementById('modalTechnologies');
        techContainer.innerHTML = '';
        projectData.technologies.forEach(function(tech) {
            const tag = document.createElement('span');
            tag.className = 'tag';
            tag.textContent = tech;
            techContainer.appendChild(tag);
        });
        
        document.getElementById('modalLiveLink').href = projectData.liveLink;
        document.getElementById('modalCodeLink').href = projectData.codeLink;
        
        modal.classList.add('active');
    }

    // Добавляем обработчики на карточки проектов
    const projectCards = document.querySelectorAll('.project-card-detailed');
    projectCards.forEach(function(card) {
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', function(e) {
            // Не открываем модальное окно, если кликнули по ссылке
            if (e.target.classList.contains('btn-link')) {
                return;
            }
            
            const title = this.querySelector('h3').textContent;
            const description = this.querySelector('.project-info p').textContent;
            const imageText = this.querySelector('.project-placeholder-large').textContent;
            const tags = Array.from(this.querySelectorAll('.tag')).map(tag => tag.textContent);
            const links = this.querySelectorAll('.btn-link');
            
            openModal({
                title: title,
                description: description,
                imageText: imageText,
                technologies: tags,
                liveLink: links[0] ? links[0].href : '#',
                codeLink: links[1] ? links[1].href : '#'
            });
        });
    });
});