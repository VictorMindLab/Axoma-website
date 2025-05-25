// Placeholder for login page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Full page fade-in animation
    setTimeout(() => {
        document.body.classList.add('body-loaded');
    }, 30); // Short delay to ensure initial styles apply

    // Page load animation for .login-container
    const loginContainer = document.querySelector('.login-container');
    if (loginContainer) {
        // Timeout to ensure styles are applied before transition starts
        setTimeout(() => {
            loginContainer.classList.add('loaded');
        }, 50); // A small delay like 50ms is often enough
    }

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
    
    // Inputs for direct manipulation (e.g., placeholder, value)
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const nameInput = document.getElementById('name');


    let currentMode = 'signin'; // 'signin' or 'signup'
    let loginStep = 'email';    // For 'signin' mode: 'email' or 'password'

    function setFormUI() {
        if (currentMode === 'signup') {
            formTitle.textContent = 'Crie sua conta';
            formSubtitle.textContent = 'Insira seus dados para começar.';
            submitButton.textContent = 'Cadastrar';

            nameGroup.classList.add('visible');
            passwordGroup.classList.add('visible');
            confirmPasswordGroup.classList.add('visible');
            passwordInput.placeholder = "Crie uma senha";

            signInBtn.classList.remove('active');
            signUpBtn.classList.add('active');
        } else { // signin mode
            formTitle.textContent = 'Bem-vindo de volta';
            
            nameGroup.classList.remove('visible');
            confirmPasswordGroup.classList.remove('visible'); // Name and Confirm are always hidden in signin

            if (loginStep === 'email') {
                formSubtitle.textContent = 'Bem-vindo de volta, por favor insira seus dados';
                submitButton.textContent = 'Continuar';
                passwordGroup.classList.remove('visible'); // Password hidden at email step
                passwordInput.placeholder = "Sua senha"; // Set for context even if hidden
            } else { // loginStep === 'password'
                formSubtitle.textContent = 'Insira sua senha para continuar.';
                submitButton.textContent = 'Entrar';
                passwordGroup.classList.add('visible'); // Password shown at password step
                passwordInput.placeholder = "Sua senha";
            }

            signInBtn.classList.add('active');
            signUpBtn.classList.remove('active');
        }
    }

    if (signInBtn && signUpBtn) {
        signInBtn.addEventListener('click', () => {
            currentMode = 'signin';
            loginStep = 'email'; // Reset to email step
            setFormUI();
            console.log('Sign In selected');
        });

        signUpBtn.addEventListener('click', () => {
            currentMode = 'signup';
            // No loginStep for signup, but ensure form UI is correct
            setFormUI();
            console.log('Sign Up selected');
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailValue = emailInput.value;

            if (currentMode === 'signup') {
                const nameValue = nameInput.value;
                const passwordValue = passwordInput.value;
                const confirmPasswordValue = document.getElementById('confirm-password').value;

                if (!nameValue || !emailValue || !passwordValue) {
                    alert("Por favor, preencha todos os campos para cadastro.");
                    return;
                }
                if (passwordValue !== confirmPasswordValue) {
                    alert("As senhas não coincidem.");
                    return;
                }
                alert(`Cadastro: Nome: ${nameValue}, Email: ${emailValue}. Lógica de cadastro real não implementada.`);
                // loginForm.reset(); // Consider resetting form
            } else { // signin mode
                if (loginStep === 'email') {
                    if (!emailValue) {
                        alert("Por favor, insira seu email.");
                        return;
                    }
                    loginStep = 'password';
                    setFormUI(); // Update UI to show password field and change button
                    passwordInput.focus();
                } else { // loginStep === 'password'
                    const passwordValue = passwordInput.value;
                    if (!passwordValue) {
                        alert("Por favor, insira sua senha.");
                        return;
                    }
                    // Simulate successful login and redirect to dashboard
                    alert(`Login realizado com sucesso! Redirecionando para o dashboard...`);
                    
                    // Redirect to dashboard after a short delay
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 1000); 
                }
            }
        });
    }

    // Initial setup: Set initial form state to sign-in, email step
    currentMode = 'signin';
    loginStep = 'email';
    setFormUI();
}); 