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

    // Get all optional fields by their common class
    const optionalFields = document.querySelectorAll('.optional-signup-field'); 

    function updateFormState(isSignUp) {
        if (isSignUp) {
            formTitle.textContent = 'Crie sua conta';
            formSubtitle.textContent = 'Insira seus dados para começar.';
            submitButton.textContent = 'Cadastrar';
            optionalFields.forEach(field => field.classList.add('visible'));
            signInBtn.classList.remove('active');
            signUpBtn.classList.add('active');
        } else {
            formTitle.textContent = 'Bem-vindo de volta';
            formSubtitle.textContent = 'Bem-vindo de volta, por favor insira seus dados';
            submitButton.textContent = 'Continuar';
            optionalFields.forEach(field => field.classList.remove('visible'));
            signInBtn.classList.add('active');
            signUpBtn.classList.remove('active');
        }
    }

    if (signInBtn && signUpBtn) {
        signInBtn.addEventListener('click', () => {
            updateFormState(false);
            console.log('Sign In selected');
        });

        signUpBtn.addEventListener('click', () => {
            updateFormState(true);
            console.log('Sign Up selected');
        });
    }

    // Initialize with sign-in state
    updateFormState(false);

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            // Add additional logic for name, password if in signup mode
            if (signUpBtn.classList.contains('active')) {
                const name = document.getElementById('name').value;
                const password = document.getElementById('password').value;
                alert(`Cadastro enviado com nome: ${name}, email: ${email}. Lógica de cadastro real não implementada.`);
            } else {
            alert(`Formulário enviado com o email: ${email}. Lógica de login real não implementada.`);
            }
            // Add actual login/signup logic here
        });
    }
}); 