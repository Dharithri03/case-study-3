// Auth Logic for Signup and Login
document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');

    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

function handleSignup(e) {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Basic Validation
    if (password !== confirmPassword) {
        showToast('Passwords do not match!', 'error');
        return;
    }

    if (password.length < 6) {
        showToast('Password must be at least 6 characters long.', 'error');
        return;
    }

    // Existing user check
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(u => u.email === email)) {
        showToast('User already exists with this email!', 'error');
        return;
    }

    // New User Object
    const newUser = {
        id: Date.now(),
        fullName,
        email,
        phone,
        password // In practice, passwords should NEVER be stored as plain text. This is for static local storage demo.
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    showToast('Registration successful! Redirecting...', 'success');

    // Auto login
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        showToast('Login successful! Redirecting...', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } else {
        showToast('Invalid email or password!', 'error');
    }
}
