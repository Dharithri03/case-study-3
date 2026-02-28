// Common functionalities for all pages
document.addEventListener('DOMContentLoaded', () => {
    renderNavbar();
    renderFooter();
    setupMobileMenu();
    setupActiveLink();
});

// Render Dynamic Navbar
function renderNavbar() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const header = document.createElement('header');
    
    header.innerHTML = `
        <div class="container">
            <nav>
                <a href="index.html" class="logo">
                   <i data-lucide="activity"></i> HealthCare
                </a>
                <ul class="nav-links">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="doctors.html">Doctors</a></li>
                    <li><a href="appointments.html">Appointments</a></li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="contact.html">Contact</a></li>
                    ${currentUser ? 
                        `<li><button onclick="handleLogout()" class="btn logout-btn" style="color:white; padding: 0.5rem 1rem;">Logout</button></li>` : 
                        `<li><a href="login.html" class="btn auth-btn">Login / Signup</a></li>`
                    }
                </ul>
                <div class="menu-toggle">
                    <i data-lucide="menu"></i>
                </div>
            </nav>
        </div>
    `;
    
    document.body.prepend(header);
    if (window.lucide) lucide.createIcons();
}

// Render Footer
function renderFooter() {
    const footer = document.createElement('footer');
    footer.innerHTML = `
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <h2>HealthCare</h2>
                    <p>Providing world-class medical services since 2010. Your health, our priority.</p>
                </div>
                <div class="footer-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="doctors.html">Doctors</a></li>
                        <li><a href="appointments.html">Appointments</a></li>
                    </ul>
                </div>
                <div class="footer-links">
                    <h3>Contact Us</h3>
                    <ul>
                        <li><i data-lucide="map-pin" size="16"></i> 123 Health Ave, New York</li>
                        <li><i data-lucide="phone" size="16"></i> +1 (555) 000-1111</li>
                        <li><i data-lucide="mail" size="16"></i> help@healthcare.com</li>
                    </ul>
                </div>
                <div class="footer-links">
                    <h3>Follow Us</h3>
                    <div style="display: flex; gap: 1rem;">
                        <a href="#"><i data-lucide="facebook"></i></a>
                        <a href="#"><i data-lucide="twitter"></i></a>
                        <a href="#"><i data-lucide="instagram"></i></a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>Copyright © 2026 HealthCare. All Rights Reserved.</p>
            </div>
        </div>
    `;
    document.body.appendChild(footer);
    if (window.lucide) lucide.createIcons();
}

// Mobile Menu Toggle logic
function setupMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (toggle) {
        toggle.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = 'white';
                navLinks.style.padding = '2rem';
                navLinks.style.boxShadow = '0 10px 15px rgba(0,0,0,0.1)';
            }
        });
    }
}

// Active Page Link Highlight
function setupActiveLink() {
    const currentPage = window.location.pathname.split("/").pop() || 'index.html';
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Logout Implementation
function handleLogout() {
    localStorage.removeItem('currentUser');
    showToast('Logged out successfully', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

// Toast Notification
function showToast(message, type = 'success') {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        document.body.appendChild(toast);
    }
    
    toast.className = `toast-${type} toast-show`;
    toast.innerText = message;
    
    setTimeout(() => {
        toast.classList.remove('toast-show');
    }, 3000);
}

// Helper to check if logged in
function checkAuth() {
    const user = localStorage.getItem('currentUser');
    if (!user) {
        window.location.href = 'login.html';
    }
    return JSON.parse(user);
}
