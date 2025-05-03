document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    const strengthIndicator = document.getElementById('strengthIndicator');
    const strengthText = document.getElementById('strengthText');

    
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);

    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isNameValid && isEmailValid && isPasswordValid) {
            
            alert('Formulário enviado com sucesso!');
            form.reset();
            resetStrengthIndicator();
        }
    });

    function validateName() {
        const name = nameInput.value.trim();
        
        if (name === '') {
            showError(nameInput, nameError, 'O nome é obrigatório');
            return false;
        } else if (name.length < 3) {
            showError(nameInput, nameError, 'O nome deve ter pelo menos 3 caracteres');
            return false;
        } else if (!/^[a-zA-ZÀ-ÿ\s']+$/.test(name)) {
            showError(nameInput, nameError, 'O nome só pode conter letras e espaços');
            return false;
        } else {
            showSuccess(nameInput, nameError);
            return true;
        }
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email === '') {
            showError(emailInput, emailError, 'O e-mail é obrigatório');
            return false;
        } else if (!emailRegex.test(email)) {
            showError(emailInput, emailError, 'Por favor, insira um e-mail válido');
            return false;
        } else {
            showSuccess(emailInput, emailError);
            return true;
        }
    }

    function validatePassword() {
        const password = passwordInput.value;
        let isValid = true;
        let errorMessage = '';
        
        if (password === '') {
            errorMessage = 'A senha é obrigatória';
            isValid = false;
        } else if (password.length < 8) {
            errorMessage = 'A senha deve ter pelo menos 8 caracteres';
            isValid = false;
        }
        
        if (!isValid) {
            showError(passwordInput, passwordError, errorMessage);
            updateStrengthIndicator(0);
            return false;
        } else {
            showSuccess(passwordInput, passwordError);
            
            const strength = calculatePasswordStrength(password);
            updateStrengthIndicator(strength);
            
            return true;
        }
    }

    function calculatePasswordStrength(password) {
        let strength = 0;
        
        if (password.length >= 8) strength += 1;
        if (password.length >= 12) strength += 1;
        
        if (/[A-Z]/.test(password)) strength += 1; // Letras maiúsculas
        if (/[0-9]/.test(password)) strength += 1; // Números
        if (/[^A-Za-z0-9]/.test(password)) strength += 1; // Caracteres especiais
       
        return Math.min(Math.floor((strength / 5) * 100), 100);
    }

    function updateStrengthIndicator(strength) {
        strengthIndicator.style.width = `${strength}%`;
        
        if (strength < 30) {
            strengthIndicator.style.backgroundColor = '#e74c3c';
            strengthText.textContent = 'Fraca';
        } else if (strength < 70) {
            strengthIndicator.style.backgroundColor = '#f39c12';
            strengthText.textContent = 'Média';
        } else {
            strengthIndicator.style.backgroundColor = '#2ecc71';
            strengthText.textContent = 'Forte';
        }
    }

    function resetStrengthIndicator() {
        strengthIndicator.style.width = '0';
        strengthText.textContent = '';
    }

    function showError(input, errorElement, message) {
        input.classList.add('error');
        input.classList.remove('success');
        errorElement.textContent = message;
    }

    function showSuccess(input, errorElement) {
        input.classList.remove('error');
        input.classList.add('success');
        errorElement.textContent = '';
    }
});