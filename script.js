// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const menu = document.querySelector('.menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            
            if (menu) {
                menu.classList.toggle('active');
                if (menu.classList.contains('active')) {
                    menu.style.display = 'flex';
                } else {
                    setTimeout(() => {
                        menu.style.display = 'none';
                    }, 300);
                }
            }
        });
    }
    
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for fixed header
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenuBtn && mobileMenuBtn.classList.contains('active')) {
                    mobileMenuBtn.click();
                }
            }
        });
    });

    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Here you would normally send the data to a server
            // For now, we'll just show an alert
            alert(`Obrigado, ${name}! Sua mensagem foi enviada. Entraremos em contato pelo email: ${email}`);
            
            // Reset the form
            contactForm.reset();
        });
    }

    // Add fixed header class on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Add animated entrance for elements when they come into view
    const animateElements = document.querySelectorAll('.feature, .team-member, .plan, .feature-img, .cta, .about-text, #contact-form, .hero h2, .categories-top, .categories-bottom');
    
    // Create the Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe each element
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add parallax effect to hero background
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            if (scrollPosition < window.innerHeight) {
                hero.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
            }
        });
    }
    
    // Text typing effect for headers
    const textElements = document.querySelectorAll('.feature-content h3');
    
    if (textElements.length > 0) {
        const typingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('typing');
                    typingObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        textElements.forEach(element => {
            typingObserver.observe(element);
        });
    }
});

// Add some additional CSS for animation classes
document.head.insertAdjacentHTML('beforeend', `
    <style>
        /* Animation styles */
        .feature, .team-member, .plan, .about-text, #contact-form, .feature-content {
            opacity: 1;
            transform: translateY(30px);
            transition: opacity 0.7s ease, transform 0.7s ease;
        }
        
        .feature-img {
            opacity: 0;
            transform: scale(0.95);
            transition: opacity 0.8s ease, transform 0.8s ease, box-shadow 0.5s ease;
        }
        
        .cta {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.7s ease, transform 0.7s ease, box-shadow 0.3s ease;
        }
        
        .hero h2 {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 1.2s ease, transform 1.2s ease;
        }
        
        .categories-top, .categories-bottom {
            opacity: 0;
            transition: opacity 1s ease, transform 1s ease;
        }
        
        .categories-top {
            transform: translateY(20px);
        }
        
        .categories-bottom {
            transform: translateY(-20px);
        }
        
        .feature.visible, .team-member.visible, .plan.visible, .feature-img.visible, 
        .cta.visible, .about-text.visible, #contact-form.visible, .hero h2.visible,
        .categories-top.visible, .categories-bottom.visible, .feature-content.visible {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        
        header.scrolled {
            padding: 0.7rem 0;
            background-color: rgba(0, 0, 0, 0.98);
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        }
        
        /* Mobile menu button animation */
        .mobile-menu-btn.active span:nth-child(1) {
            transform: translateY(9px) rotate(45deg);
        }
        
        .mobile-menu-btn.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-btn.active span:nth-child(3) {
            transform: translateY(-9px) rotate(-45deg);
        }
        
        /* Typing effect */
        @keyframes typing-cursor {
            0% { border-right-color: rgba(255, 255, 255, 0.7); }
            50% { border-right-color: transparent; }
            100% { border-right-color: rgba(255, 255, 255, 0.7); }
        }
        
        .typing {
            position: relative;
        }
        
        .typing::after {
            content: '';
            position: absolute;
            right: -12px;
            top: 10%;
            height: 80%;
            width: 3px;
            background-color: var(--secondary-color);
            animation: typing-cursor 1s infinite;
        }
        
        /* Mobile menu styles */
        @media (max-width: 768px) {
            .menu {
                display: none;
                opacity: 0;
                transform: translateY(-20px);
                transition: opacity 0.3s ease, transform 0.3s ease;
            }
            
            .menu.active {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background-color: rgba(0, 0, 0, 0.95);
                padding: 1rem 0;
                box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
                z-index: 999;
                opacity: 1;
                transform: translateY(0);
            }
            
            .menu.active li {
                margin: 0.8rem 2rem;
            }
        }
    </style>
`); 

// Dropdown Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        const dropdownMenu = toggle.nextElementSibling; // Get the .dropdown-menu next to the toggle

        if (dropdownMenu) {
            toggle.addEventListener('click', function(event) {
                event.preventDefault();
                event.stopPropagation();

                // Close other open dropdowns before opening the current one
                document.querySelectorAll('.dropdown-menu.show').forEach(openMenu => {
                    if (openMenu !== dropdownMenu) {
                        openMenu.classList.remove('show');
                    }
                });

                dropdownMenu.classList.toggle('show');
            });
        }
    });

    // Close all dropdowns if clicked outside
    document.addEventListener('click', function(event) {
        let clickedInsideADropdown = false;
        dropdownToggles.forEach(toggle => {
            const dropdownMenu = toggle.nextElementSibling;
            if (dropdownMenu && (dropdownMenu.contains(event.target) || toggle.contains(event.target))) {
                clickedInsideADropdown = true;
            }
        });

        if (!clickedInsideADropdown) {
            document.querySelectorAll('.dropdown-menu.show').forEach(openMenu => {
                openMenu.classList.remove('show');
            });
        }
    });

    // Mobile Menu Toggle (if it exists in your script.js)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const menu = document.querySelector('header .menu'); // Assuming this is your main menu UL

    if (mobileMenuBtn && menu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            menu.classList.toggle('active'); // You'll need CSS for .menu.active
        });
    }
}); 