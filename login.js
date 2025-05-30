// Ultra-simple login - zero animations, maximum performance

document.addEventListener('DOMContentLoaded', () => {
    // Show everything immediately - no animations
    document.body.style.opacity = '1';
    document.querySelector('.login-container').style.opacity = '1';
    document.querySelector('.login-container').style.transform = 'none';
    
    // Show all elements immediately
    const elements = document.querySelectorAll('.logo-container, h2, .subtitle, .form-toggle, .input-group, .btn-continue, .social-login-divider, .social-login-buttons, .footer-text, .social-btn');
    elements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
    });
    
    // Elements
    const signInBtn = document.getElementById('sign-in-btn');
    const signUpBtn = document.getElementById('sign-up-btn');
    const loginForm = document.getElementById('login-form');
    const formTitle = document.getElementById('form-title');
    const formSubtitle = document.getElementById('form-subtitle');
    const submitButton = document.getElementById('submit-button');

    // Input groups
    const nameGroup = document.getElementById('name-group');
    const passwordGroup = document.getElementById('password-group');
    const confirmPasswordGroup = document.getElementById('confirm-password-group');
    
    // Inputs
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const nameInput = document.getElementById('name');
    const confirmPasswordInput = document.getElementById('confirm-password');

    const successIcon = document.querySelector('.success-icon');

    let currentMode = 'signin';
    let loginStep = 'email';

    // Instant form UI changes - no animations
    function setFormUI() {
        if (currentMode === 'signup') {
            formTitle.textContent = 'Crie sua conta';
            formSubtitle.textContent = 'Insira seus dados para começar.';
            submitButton.textContent = 'Cadastrar';
            passwordInput.placeholder = "Crie uma senha";

            // Show signup fields instantly
            nameGroup.classList.add('visible');
            passwordGroup.classList.add('visible');
            confirmPasswordGroup.classList.add('visible');

            // Update button states
            signInBtn.classList.remove('active');
            signUpBtn.classList.add('active');

        } else { // signin mode
            formTitle.textContent = 'Bem-vindo de volta';
            passwordInput.placeholder = "Sua senha";
            
            if (loginStep === 'email') {
                formSubtitle.textContent = 'Bem-vindo de volta, por favor insira seus dados';
                submitButton.textContent = 'Continuar';
                passwordGroup.classList.remove('visible');
            } else {
                formSubtitle.textContent = 'Insira sua senha para continuar.';
                submitButton.textContent = 'Entrar';
                passwordGroup.classList.add('visible');
            }

            // Hide signup fields instantly
            nameGroup.classList.remove('visible');
            confirmPasswordGroup.classList.remove('visible');

            // Update button states
            signUpBtn.classList.remove('active');
            signInBtn.classList.add('active');
        }
    }

    // Simple validation - no animations
    function validateInput(input, isValid) {
        const wrapper = input.closest('.input-group') || input.closest('.input-icon-wrapper');
        
        wrapper.classList.remove('error', 'success');
        
        if (isValid === true) {
            wrapper.classList.add('success');
            if (input.type === 'email' && successIcon) {
                successIcon.style.opacity = '1';
                successIcon.classList.add('show');
            }
        } else if (isValid === false) {
            wrapper.classList.add('error');
            if (input.type === 'email' && successIcon) {
                successIcon.style.opacity = '0';
                successIcon.classList.remove('show');
            }
        }
    }

    // Simple button states - no animations
    function setButtonState(state) {
        submitButton.classList.remove('loading', 'success', 'error');
        
        switch (state) {
            case 'loading':
                submitButton.classList.add('loading');
                submitButton.textContent = 'Carregando...';
                submitButton.disabled = true;
                break;
                
            case 'success':
                submitButton.classList.add('success');
                submitButton.textContent = '✓ Sucesso!';
                submitButton.disabled = false;
                break;
                
            case 'error':
                submitButton.classList.add('error');
                submitButton.textContent = 'Erro! Tente novamente';
                submitButton.disabled = false;
                setTimeout(resetButtonState, 2000);
                break;
        }
    }

    function resetButtonState() {
        submitButton.classList.remove('loading', 'success', 'error');
        submitButton.disabled = false;
        
        if (currentMode === 'signup') {
            submitButton.textContent = 'Cadastrar';
        } else {
            submitButton.textContent = loginStep === 'email' ? 'Continuar' : 'Entrar';
        }
    }

    // Validation functions
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isValidPassword(password) {
        return password.length >= 6;
    }

    // Simple validation without debounce
    function handleInputValidation(input, validationFn) {
        if (input.value.length > 0) {
            validateInput(input, validationFn(input.value));
        } else {
            validateInput(input, null);
        }
    }

    // Event listeners
    if (signInBtn && signUpBtn) {
        signInBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentMode !== 'signin') {
                currentMode = 'signin';
                loginStep = 'email';
                setFormUI();
            }
        });

        signUpBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentMode !== 'signup') {
                currentMode = 'signup';
                setFormUI();
            }
        });
    }

    // Simple input validation
    if (emailInput) {
        emailInput.addEventListener('blur', () => {
            handleInputValidation(emailInput, isValidEmail);
        });
    }

    if (passwordInput) {
        passwordInput.addEventListener('blur', () => {
            if (currentMode === 'signup') {
                handleInputValidation(passwordInput, isValidPassword);
            }
        });
    }

    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('blur', () => {
            if (confirmPasswordInput.value.length > 0) {
                validateInput(confirmPasswordInput, confirmPasswordInput.value === passwordInput.value);
            }
        });
    }

    // Form submission
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const emailValue = emailInput.value.trim();

            if (currentMode === 'signup') {
                const nameValue = nameInput.value.trim();
                const passwordValue = passwordInput.value;
                const confirmPasswordValue = confirmPasswordInput.value;

                let isValid = true;

                if (!nameValue) {
                    validateInput(nameInput, false);
                    isValid = false;
                }

                if (!isValidEmail(emailValue)) {
                    validateInput(emailInput, false);
                    isValid = false;
                }

                if (!isValidPassword(passwordValue)) {
                    validateInput(passwordInput, false);
                    isValid = false;
                }

                if (passwordValue !== confirmPasswordValue) {
                    validateInput(confirmPasswordInput, false);
                    isValid = false;
                }

                if (!isValid) {
                    setButtonState('error');
                    return;
                }

                setButtonState('loading');
                
                setTimeout(() => {
                    setButtonState('success');
                    setTimeout(() => {
                        alert(`Cadastro realizado com sucesso! Bem-vindo, ${nameValue}!`);
                        resetButtonState();
                    }, 1000);
                }, 1000);

            } else { // signin mode
                if (loginStep === 'email') {
                    if (!isValidEmail(emailValue)) {
                        validateInput(emailInput, false);
                        setButtonState('error');
                        return;
                    }

                    setButtonState('loading');
                    
                    setTimeout(() => {
                        loginStep = 'password';
                        setFormUI();
                        resetButtonState();
                        passwordInput.focus();
                    }, 500);

                } else {
                    const passwordValue = passwordInput.value;
                    
                    if (!passwordValue) {
                        validateInput(passwordInput, false);
                        setButtonState('error');
                        return;
                    }

                    setButtonState('loading');
                    
                    setTimeout(() => {
                        setButtonState('success');
                        setTimeout(() => {
                            window.location.href = 'dashboard.html';
                        }, 500);
                    }, 1000);
                }
            }
        });
    }

    // Initialize immediately
    currentMode = 'signin';
    loginStep = 'email';
    setFormUI();
}); 