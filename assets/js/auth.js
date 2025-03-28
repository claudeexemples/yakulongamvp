document.addEventListener('DOMContentLoaded', () => {
    // Login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Simulação de login
            localStorage.setItem('yakulonga-user', JSON.stringify({ email }));
            window.location.href = '../dashboard.html';
        });
    }

    // Registro
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Simulação de registro
            localStorage.setItem('yakulonga-user', JSON.stringify({ name, email }));
            window.location.href = '../dashboard.html';
        });
    }

    // Verifica se está logado
    const protectedPages = ['dashboard.html'];
    if (protectedPages.some(page => window.location.pathname.includes(page))) {
        if (!localStorage.getItem('yakulonga-user')) {
            window.location.href = 'auth/login.html';
        }
    }
});
