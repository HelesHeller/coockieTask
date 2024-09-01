document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const signInForm = document.getElementById('signInForm');
    const languageProfessionForm = document.getElementById('languageProfessionForm');
    const languageProfession = document.getElementById('languageProfession');
    const profileDisplay = document.getElementById('profileDisplay');
    const registerErrorMessages = document.getElementById('registerErrorMessages');
    const loginErrorMessages = document.getElementById('loginErrorMessages');
    const languageProfessionMessages = document.getElementById('languageProfessionMessages');

    // Функция для установки cookie
    function setCookie(name, value, days) {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
    }

    // Функция для получения значения cookie
    function getCookie(name) {
        return document.cookie.split('; ').reduce((r, v) => {
            const parts = v.split('=');
            return parts[0] === name ? decodeURIComponent(parts[1]) : r;
        }, '');
    }

    // Заполнение формы регистрации из cookie
    function populateRegistrationForm() {
        const login = getCookie('login');
        const email = getCookie('email');
        if (login) document.getElementById('registerLogin').value = login;
        if (email) document.getElementById('registerEmail').value = email;
    }

    // Переход на форму входа
    document.getElementById('goToLogin').addEventListener('click', function() {
        document.getElementById('registrationForm').style.display = 'none';
        loginForm.style.display = 'block';
    });

    // Обработчик формы регистрации
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        registerErrorMessages.innerHTML = '';

        const login = document.getElementById('registerLogin').value.trim();
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;
        const email = document.getElementById('registerEmail').value.trim();

        // Проверка заполненности всех полей
        if (!login || !password || !confirmPassword || !email) {
            registerErrorMessages.innerHTML = 'Все поля должны быть заполнены';
            return;
        }

        // Проверка длины пароля
        if (password.length < 3 || password.length > 10) {
            registerErrorMessages.innerHTML = 'Длина пароля должна быть от 3 до 10 символов';
            return;
        }

        // Проверка совпадения пароля и подтверждения
        if (password !== confirmPassword) {
            registerErrorMessages.innerHTML = 'Пароль и подтверждение пароля должны совпадать';
            return;
        }

        // Сохранение данных в cookie
        setCookie('login', login, 7);
        setCookie('email', email, 7);

        alert('Регистрация завершена! Теперь вы можете войти.');

        // Переключение на форму входа
        document.getElementById('registrationForm').style.display = 'none';
        loginForm.style.display = 'block';
    });

    // Обработчик формы входа
    signInForm.addEventListener('submit', function(event) {
        event.preventDefault();
        loginErrorMessages.innerHTML = '';

        const loginInput = document.getElementById('loginInput').value.trim();
        const passwordInput = document.getElementById('loginPassword').value.trim();
        const savedLogin = getCookie('login');

        // Проверка логина
        if (loginInput === savedLogin) {
            loginErrorMessages.innerHTML = 'Успешный вход!';

            // Переключение на форму выбора языка и профессии
            loginForm.style.display = 'none';
            languageProfessionForm.style.display = 'block';
        } else {
            loginErrorMessages.innerHTML = 'Неверный логин или пароль. Попробуйте снова.';
        }
    });

    // Обработчик формы выбора языка и профессии
    languageProfession.addEventListener('submit', function(event) {
        event.preventDefault();
        languageProfessionMessages.innerHTML = '';

        const language = document.getElementById('language').value;
        const profession = document.getElementById('profession').value.trim();

        // Сохранение данных в cookie
        setCookie('language', language, 7);
        setCookie('profession', profession, 7);

        // Переход к отображению профиля
        displayUserProfile();
    });

    // Отображение профиля
    function displayUserProfile() {
        const login = getCookie('login');
        const language = getCookie('language');
        const profession = getCookie('profession');

        document.getElementById('profileName').innerText = login;
        document.getElementById('profileLanguage').innerText = language;
        document.getElementById('profileProfession').innerText = profession;

        languageProfessionForm.style.display = 'none';
        profileDisplay.style.display = 'block';
    }

    populateRegistrationForm();
});
