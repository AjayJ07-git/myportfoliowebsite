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

const roles = ["ML Developer", "AI Developer", "Web Developer", "UI/UX Designer"];
let roleIndex = 0;
let charIndex = roles[roleIndex].length;
let currentText = roles[roleIndex];
let deleting = true;  // Start by deleting

const changingRoleElement = document.getElementById('changing-role');

function updateRoleText() {
    if (deleting) {
        if (charIndex > 0) {
            currentText = roles[roleIndex].substring(0, charIndex - 1);
            charIndex--;
        } else {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;  // Move to next role
        }
    } else {
        if (charIndex < roles[roleIndex].length) {
            currentText = roles[roleIndex].substring(0, charIndex + 1);
            charIndex++;
        } else {
            deleting = true;
        }
    }
    
    changingRoleElement.innerText = currentText;  // Update the displayed role
}

// Call updateRoleText every 200ms for smooth letter-by-letter change
setInterval(updateRoleText, 200);

// Function to check if element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add event listener for scroll to trigger fade-in animation
document.addEventListener('scroll', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        if (isInViewport(item)) {
            item.classList.add('visible');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.querySelector('.dropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    dropdown.addEventListener('click', function(e) {
        e.preventDefault();
        dropdownMenu.classList.toggle('show');
    });

    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) {
            dropdownMenu.classList.remove('show');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.portfolio-item');
    const totalItems = items.length;
    let currentItem = 0;

    const leftBtn = document.querySelector('.left-btn');
    const rightBtn = document.querySelector('.right-btn');

    function updateCarousel() {
        items.forEach((item, index) => {
            item.style.transform = `translateX(-${currentItem * 100}%)`;
        });
    }

    leftBtn.addEventListener('click', () => {
        currentItem = (currentItem === 0) ? totalItems - 1 : currentItem - 1;
        updateCarousel();
    });

    rightBtn.addEventListener('click', () => {
        currentItem = (currentItem === totalItems - 1) ? 0 : currentItem + 1;
        updateCarousel();
    });
});
