// Get the sun and moon icons
const lightIcon = document.getElementById('light-icon');
const darkIcon = document.getElementById('dark-icon');

// Apply the user's theme preference if available
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
}

// Set initial state based on the theme
document.addEventListener('DOMContentLoaded', () => {
    if (!currentTheme) {
        document.documentElement.setAttribute('data-theme', 'light'); // Default to light
    }
});

// Add click event listeners to toggle the theme
lightIcon.addEventListener('click', () => {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
});

darkIcon.addEventListener('click', () => {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
});

// Add click listener for smooth scroll and active class assignment
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        // Remove active class from all links
        document.querySelectorAll('.nav__link').forEach(nav => {
            nav.classList.remove('active');
        });

        // Add active class to clicked link
        this.classList.add('active');

        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        // Calculate the offset (header height) for smooth scrolling
        const headerHeight = document.querySelector('.header').offsetHeight;
        const offsetPosition = targetSection.offsetTop - headerHeight;  // Subtract the header height

        window.scrollTo({
            top: offsetPosition,  // Scroll with the adjusted offset
            behavior: 'smooth'
        });
    });
});
