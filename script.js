// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Hero Video Background Management
    const heroVideo = document.querySelector('.hero-video');
    const heroSection = document.querySelector('.hero');
    
    if (heroVideo && heroSection) {
        // Handle video loading
        heroVideo.addEventListener('loadeddata', function() {
            console.log('Hero video loaded successfully');
        });
        
        // Handle video errors
        heroVideo.addEventListener('error', function(e) {
            console.warn('Hero video failed to load, using fallback background');
            heroSection.style.backgroundImage = "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop')";
            heroSection.style.backgroundSize = "cover";
            heroSection.style.backgroundPosition = "center";
            heroVideo.style.display = 'none';
        });
        
        // Try to play the video
        const playVideo = async () => {
            try {
                await heroVideo.play();
                console.log('Hero video is playing');
            } catch (error) {
                console.warn('Autoplay prevented, video will remain paused');
            }
        };
        
        // Attempt to play video when ready
        if (heroVideo.readyState >= 3) {
            playVideo();
        } else {
            heroVideo.addEventListener('canplay', playVideo);
        }
    }
    
    // Rotating Text Animation - Typewriter Effect
    const rotatingTextElement = document.querySelector('.rotating-text');
    if (rotatingTextElement) {
        const words = [
            'SEU PODER',
            'SUA VOZ', 
            'ESSÊNCIA',
            'MELHOR DE VOCÊ',
            'POTENCIAL ILIMITADO'
        ];
        
        let currentWordIndex = 0;
        let currentText = '';
        let isDeleting = false;
        let typeSpeed = 100;
        let deleteSpeed = 50;
        let pauseTime = 2000;
        
        function typeWriter() {
            const currentWord = words[currentWordIndex];
            
            if (isDeleting) {
                // Remove uma letra
                currentText = currentWord.substring(0, currentText.length - 1);
                rotatingTextElement.textContent = currentText;
                
                if (currentText === '') {
                    isDeleting = false;
                    currentWordIndex = (currentWordIndex + 1) % words.length;
                    setTimeout(typeWriter, 100);
                } else {
                    setTimeout(typeWriter, deleteSpeed);
                }
            } else {
                // Adiciona uma letra
                currentText = currentWord.substring(0, currentText.length + 1);
                rotatingTextElement.textContent = currentText;
                
                if (currentText === currentWord) {
                    // Palavra completa, pause e depois comece a deletar
                    setTimeout(() => {
                        isDeleting = true;
                        typeWriter();
                    }, pauseTime);
                } else {
                    setTimeout(typeWriter, typeSpeed);
                }
            }
        }
        
        // Inicia a animação após 1 segundo
        setTimeout(() => {
            typeWriter();
        }, 1000);
    }

    // Scroll Animation Observer
    const scrollElements = document.querySelectorAll('.scroll-element');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    scrollElements.forEach(element => {
        scrollObserver.observe(element);
    });
            });

 

