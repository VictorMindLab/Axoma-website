// GSAP Animations for Hero Section
document.addEventListener('DOMContentLoaded', function() {
    
    // Set initial states for all animated elements
    gsap.set([".category-item", ".title-line", ".rotating-text"], {
        opacity: 0,
        y: 50
    });
    
    gsap.set("header", {
        opacity: 0,
        y: -50
    });
    
    gsap.set(".hero-overlay", {
        opacity: 0
    });
    
    gsap.set(".scroll-indicator", {
        opacity: 0,
        scale: 0
    });
    
    // Create main timeline for the hero animations
    const heroTimeline = gsap.timeline({
        delay: 0.5,
        onComplete: function() {
            console.log("Hero animations completed");
        }
    });
    
    // 1. Animate header entrance
    heroTimeline.to("header", {
        duration: 1,
        opacity: 1,
        y: 0,
        ease: "power2.out"
    })
    
    // 2. Fade in video overlay
    .to(".hero-overlay", {
        duration: 1.5,
        opacity: 1,
        ease: "power2.out"
    }, "-=0.5")
    
    // 3. Animate top categories with stagger
    .to(".categories-top .category-item", {
        duration: 0.8,
        opacity: 1,
        y: 0,
        stagger: 0.2,
        ease: "back.out(1.7)"
    }, "-=0.8")
    
    // 4. Animate title lines with dramatic effect
    .to(".title-line", {
        duration: 1.2,
        opacity: 1,
        y: 0,
        stagger: 0.3,
        ease: "power3.out",
        onComplete: function() {
            // Add a glowing effect to the title
            gsap.to(".hero-title", {
                duration: 2,
                textShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }
    }, "-=0.5")
    
    // 5. Animate bottom categories
    .to(".categories-bottom .category-item", {
        duration: 0.8,
        opacity: 1,
        y: 0,
        stagger: 0.2,
        ease: "back.out(1.7)"
    }, "-=0.6")
    
    // 6. Finally animate the rotating text
    .to(".rotating-text", {
        duration: 1,
        opacity: 1,
        y: 0,
        ease: "power2.out",
        onComplete: function() {
            // Add a pulsing effect to rotating text
            gsap.to(".rotating-text", {
                duration: 1.5,
                scale: 1.05,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }
    }, "-=0.3")
    
    // 7. Animate scroll indicator
    .to(".scroll-indicator", {
        duration: 0.8,
        opacity: 1,
        scale: 1,
        ease: "back.out(1.7)"
    }, "-=0.2");
    
    // Create floating animation for categories
    gsap.to(".category-item", {
        duration: 3,
        y: "+=10",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
            each: 0.5,
            repeat: -1
        },
        delay: 3 // Start after main animation
    });
    
    // Parallax effect for the video on scroll
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.to(".hero-video", {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
    
    // Hide scroll indicator when scrolling
    gsap.to(".scroll-indicator", {
        opacity: 0,
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });
    
    // Enhanced scroll-triggered animations for other sections
    gsap.utils.toArray(".scroll-element").forEach((element, index) => {
        gsap.fromTo(element, {
            opacity: 0,
            y: 60,
            scale: 0.8,
            rotationX: 45
        }, {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
            },
            delay: index * 0.05
        });
    });
    
    // Specific animations for minimalist sections
    
    // CTA Section - "Comece agora" - Elegant fade and scale
    gsap.fromTo(".cta", {
        opacity: 0,
        scale: 0.95,
        y: 40
    }, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".cta-section",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
    
    // CTA Button hover effect enhancement
    gsap.set(".cta .btn", {
        transformOrigin: "center"
    });
    
    // About Section - Minimalist text reveal
    gsap.fromTo(".about h2", {
        opacity: 0,
        y: -30,
        scale: 0.9
    }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".about",
            start: "top 75%",
            toggleActions: "play none none reverse"
        }
    });
    
    gsap.fromTo(".about-text", {
        opacity: 0,
        y: 30
    }, {
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".about-text",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        delay: 0.3
    });
    
    // Team members - Subtle staggered reveal
    gsap.fromTo(".team-member", {
        opacity: 0,
        y: 50,
        scale: 0.9
    }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
            trigger: ".team",
            start: "top 85%",
            toggleActions: "play none none reverse"
        }
    });
    
    // Team member images - Gentle rotation on scroll
    gsap.utils.toArray(".member-img").forEach((img, index) => {
        gsap.fromTo(img, {
            rotation: -5,
            scale: 0.95
        }, {
            rotation: 0,
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: img,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            delay: index * 0.1
        });
    });
    
    // Add subtle parallax to about section background
    gsap.to(".about", {
        backgroundPosition: "50% 50%",
        ease: "none",
        scrollTrigger: {
            trigger: ".about",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
    
    // CTA button pulse effect on hover
    document.querySelectorAll('.cta .btn').forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
    
    // Team member hover animations
    document.querySelectorAll('.team-member').forEach(member => {
        const img = member.querySelector('.member-img');
        const name = member.querySelector('h3');
        const role = member.querySelector('p');
        
        member.addEventListener('mouseenter', () => {
            gsap.to(img, {
                scale: 1.1,
                rotation: 2,
                duration: 0.4,
                ease: "power2.out"
            });
            gsap.to([name, role], {
                y: -5,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        member.addEventListener('mouseleave', () => {
            gsap.to(img, {
                scale: 1,
                rotation: 0,
                duration: 0.4,
                ease: "power2.out"
            });
            gsap.to([name, role], {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
    
    // Subtle text reveal animation for paragraphs
    gsap.utils.toArray(".cta p").forEach(paragraph => {
        gsap.fromTo(paragraph, {
            opacity: 0,
            y: 20
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: paragraph,
                start: "top 90%",
                toggleActions: "play none none reverse"
            },
            delay: 0.5
        });
    });
    
    // Pricing Section - Minimalist animations
    
    // Pricing cards entrance animation
    gsap.fromTo(".plan", {
        opacity: 0,
        y: 80,
        scale: 0.9
    }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
            trigger: ".pricing",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
    
    // Pricing cards hover animations
    document.querySelectorAll('.plan').forEach(plan => {
        const price = plan.querySelector('.price');
        const features = plan.querySelectorAll('.features-list li');
        const button = plan.querySelector('.btn');
        const title = plan.querySelector('h3');
        
        // Set initial state for animations
        gsap.set(plan, {
            transformOrigin: "center bottom"
        });
        
        plan.addEventListener('mouseenter', () => {
            // Card elevation and glow
            gsap.to(plan, {
                y: -10,
                scale: 1.02,
                duration: 0.4,
                ease: "power2.out"
            });
            
            // Price highlight effect
            gsap.to(price, {
                scale: 1.05,
                color: "#FFFACD",
                duration: 0.3,
                ease: "power2.out"
            });
            
            // Features subtle animation
            gsap.to(features, {
                x: 5,
                duration: 0.3,
                ease: "power2.out",
                stagger: 0.05
            });
            
            // Button pulse effect
            gsap.to(button, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
            
            // Title subtle movement
            gsap.to(title, {
                y: -2,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        plan.addEventListener('mouseleave', () => {
            // Return to original state
            gsap.to(plan, {
                y: 0,
                scale: 1,
                duration: 0.4,
                ease: "power2.out"
            });
            
            gsap.to(price, {
                scale: 1,
                color: "#FFFACD",
                duration: 0.3,
                ease: "power2.out"
            });
            
            gsap.to(features, {
                x: 0,
                duration: 0.3,
                ease: "power2.out",
                stagger: 0.03
            });
            
            gsap.to(button, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
            
            gsap.to(title, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        // Special attention for featured plan
        if (plan.classList.contains('featured')) {
            plan.addEventListener('mouseenter', () => {
                gsap.to(plan, {
                    boxShadow: "0 25px 50px rgba(255, 250, 205, 0.1)",
                    duration: 0.4,
                    ease: "power2.out"
                });
            });
            
            plan.addEventListener('mouseleave', () => {
                gsap.to(plan, {
                    boxShadow: "0 0 0 rgba(255, 250, 205, 0)",
                    duration: 0.4,
                    ease: "power2.out"
                });
            });
        }
    });
    
    // Pricing buttons click animation
    document.querySelectorAll('.plan .btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Create ripple effect
            const rect = button.getBoundingClientRect();
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.marginLeft = '-10px';
            ripple.style.marginTop = '-10px';
            ripple.style.pointerEvents = 'none';
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            gsap.to(ripple, {
                scale: 4,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
                onComplete: () => {
                    ripple.remove();
                }
            });
            
            // Button press animation
            gsap.to(button, {
                scale: 0.95,
                duration: 0.1,
                ease: "power2.out",
                onComplete: () => {
                    gsap.to(button, {
                        scale: 1,
                        duration: 0.1,
                        ease: "power2.out"
                    });
                }
            });
        });
    });
    
    // Subtle parallax for pricing section
    gsap.to(".pricing", {
        backgroundPosition: "50% 60%",
        ease: "none",
        scrollTrigger: {
            trigger: ".pricing",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
    
    // Add mouse movement parallax effect to hero content
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    });
    
    gsap.ticker.add(() => {
        gsap.to(".categories-top", {
            duration: 1,
            x: mouseX * 20,
            y: mouseY * 10,
            ease: "power2.out"
        });
        
        gsap.to(".categories-bottom", {
            duration: 1,
            x: mouseX * -15,
            y: mouseY * -8,
            ease: "power2.out"
        });
        
        gsap.to(".hero-title", {
            duration: 1.5,
            x: mouseX * 10,
            y: mouseY * 5,
            ease: "power2.out"
        });
        
        gsap.to(".scroll-indicator", {
            duration: 2,
            x: mouseX * 5,
            ease: "power2.out"
        });
    });
    
    // Add click event to scroll indicator
    document.querySelector('.scroll-indicator')?.addEventListener('click', () => {
        gsap.to(window, {
            duration: 1.5,
            scrollTo: ".cta-section",
            ease: "power2.inOut"
        });
    });
    
    console.log("GSAP Hero animations initialized");
}); 