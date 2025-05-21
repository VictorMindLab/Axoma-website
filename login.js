// Placeholder for login page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    const signInBtn = document.getElementById('sign-in-btn');
    const signUpBtn = document.getElementById('sign-up-btn');
    const loginForm = document.getElementById('login-form');

    if (signInBtn && signUpBtn) {
        signInBtn.addEventListener('click', () => {
            signInBtn.classList.add('active');
            signUpBtn.classList.remove('active');
            // Here you would typically show the sign-in form fields
            // and hide sign-up specific fields if they were different.
            // For this example, the form is simple and doesn't change.
            console.log('Sign In selected');
        });

        signUpBtn.addEventListener('click', () => {
            signUpBtn.classList.add('active');
            signInBtn.classList.remove('active');
            // Here you would typically show the sign-up form fields.
            console.log('Sign Up selected');
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            alert(`Formulário enviado com o email: ${email}. Lógica de login real não implementada.`);
            // Add actual login/signup logic here
        });
    }
}); 