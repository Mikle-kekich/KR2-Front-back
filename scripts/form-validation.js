document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const successMessage = document.getElementById('formSuccess');

    // Функция для отображения ошибки
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        errorElement.textContent = message;
        input.classList.add('error');
    }

    // Функция для удаления ошибки
    function clearError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        errorElement.textContent = '';
        input.classList.remove('error');
    }

    // Валидация имени
    function validateName() {
        const nameValue = nameInput.value.trim();
        
        if (nameValue === '') {
            showError(nameInput, 'Пожалуйста, введите ваше имя');
            return false;
        } else if (nameValue.length < 2) {
            showError(nameInput, 'Имя должно содержать минимум 2 символа');
            return false;
        } else {
            clearError(nameInput);
            return true;
        }
    }

    // Валидация email
    function validateEmail() {
        const emailValue = emailInput.value.trim();
        const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        
        if (emailValue === '') {
            showError(emailInput, 'Пожалуйста, введите ваш email');
            return false;
        } else if (!emailRegex.test(emailValue)) {
            showError(emailInput, 'Пожалуйста, введите корректный email адрес');
            return false;
        } else {
            clearError(emailInput);
            return true;
        }
    }

    // Валидация сообщения
    function validateMessage() {
        const messageValue = messageInput.value.trim();
        
        if (messageValue === '') {
            showError(messageInput, 'Пожалуйста, введите сообщение');
            return false;
        } else if (messageValue.length < 10) {
            showError(messageInput, 'Сообщение должно содержать минимум 10 символов');
            return false;
        } else {
            clearError(messageInput);
            return true;
        }
    }

    // Обработка отправки формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();
        
        if (isNameValid && isEmailValid && isMessageValid) {
            // Показываем сообщение об успехе
            successMessage.style.display = 'block';
            
            // Очищаем форму
            form.reset();
            
            // Скрываем сообщение об успехе через 5 секунд
            setTimeout(function() {
                successMessage.style.display = 'none';
            }, 5000);
            
            console.log('Форма успешно отправлена!');
            console.log('Имя:', nameInput.value);
            console.log('Email:', emailInput.value);
            console.log('Сообщение:', messageInput.value);
        }
    });

    // Валидация при потере фокуса
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    messageInput.addEventListener('blur', validateMessage);

    // Очистка ошибок при вводе
    nameInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            clearError(this);
        }
    });

    emailInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            clearError(this);
        }
    });

    messageInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            clearError(this);
        }
    });
});