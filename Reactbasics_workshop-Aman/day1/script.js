// Projects data
const projects = [
    {
        title: "Task Management System",
        description: "A comprehensive task management application with drag-and-drop functionality, priority settings, and team collaboration features.",
        technologies: ["React", "Node.js", "MongoDB", "Redux"]
    },
    {
        title: "Ray Tracing Project",
        description: "A physically-based ray tracer implementation with support for global illumination, soft shadows, and realistic material rendering.",
        technologies: ["C++", "OpenGL", "GLSL", "Multithreading"]
    },
    {
        title: "Amazon End-to-End Automation",
        description: "Full automation suite for Amazon workflows including product scraping, price monitoring, and automated purchasing system.",
        technologies: ["Python", "Selenium", "BeautifulSoup", "AWS Lambda"]
    },
    {
        title: "GO1% Automation via Nightwatch",
        description: "End-to-end test automation framework for GO1% platform using Nightwatch.js with 95% test coverage and CI/CD integration.",
        technologies: ["Nightwatch.js", "JavaScript", "Jenkins", "Docker"]
    },
    {
        title: "E-commerce Website",
        description: "A fully responsive online store with product filtering and cart functionality.",
        technologies: ["HTML", "CSS", "JavaScript", "React"]
    },
    {
        title: "Weather App",
        description: "Real-time weather information with 5-day forecast using a weather API.",
        technologies: ["JavaScript", "API Integration", "CSS"]
    }
];

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const themeToggle = document.getElementById('theme-toggle');
    const contactForm = document.getElementById('contact-form');
    const projectsContainer = document.getElementById('projects-container');
    const experienceBtn = document.getElementById('experience-btn');
    const experienceOutput = document.getElementById('experience-output');

    // Check if elements exist
    if (!themeToggle || !projectsContainer) {
        console.error("Essential elements not found!");
        return;
    }

    // Dark/Light Mode Toggle
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        themeToggle.textContent = isDarkMode ? 'Toggle Light Mode' : 'Toggle Dark Mode';
        localStorage.setItem('darkMode', isDarkMode);
    });

    // Check for saved theme preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = 'Toggle Light Mode';
    }

    // Render Projects
    function renderProjects() {
        projectsContainer.innerHTML = projects.map(project => `
            <div class="project-card">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <p class="technologies"><strong>Technologies:</strong> ${project.technologies.join(', ')}</p>
            </div>
        `).join('');

        // Animate project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.style.animation = `fadeIn 0.5s ease ${index * 0.1}s forwards`;
        });
    }

    // Calculate Experience
    if (experienceBtn) {
        experienceBtn.addEventListener('click', function() {
            const startYear = 2023;
            const currentYear = new Date().getFullYear();
            const yearsExperience = currentYear - startYear;
            
            experienceOutput.textContent = `I have ${yearsExperience} year${yearsExperience !== 1 ? 's' : ''} of professional experience since ${startYear}.`;
            
            experienceOutput.style.opacity = '0';
            setTimeout(() => {
                experienceOutput.style.transition = 'opacity 0.5s ease';
                experienceOutput.style.opacity = '1';
            }, 10);
        });
    }

    // Form Validation
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const nameError = document.getElementById('name-error');
            const emailError = document.getElementById('email-error');
            const formSuccess = document.getElementById('form-success');
            
            // Reset errors and success
            nameError.textContent = '';
            emailError.textContent = '';
            formSuccess.textContent = '';
            
            let isValid = true;
            
            if (!name) {
                nameError.textContent = 'Name is required';
                isValid = false;
            }
            
            if (!email) {
                emailError.textContent = 'Email is required';
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                emailError.textContent = 'Please enter a valid email address';
                isValid = false;
            }
            
            if (isValid) {
                formSuccess.textContent = 'Thank you for your message! I will get back to you soon.';
                contactForm.reset();
                
                setTimeout(() => {
                    formSuccess.textContent = '';
                }, 5000);
            }
        });
    }

    // Initial render
    renderProjects();
});