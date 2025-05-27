// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Rotating Text Animation
    const rotatingTextElement = document.querySelector('.rotating-text');
    if (rotatingTextElement) {
        const words = [
            'seu poder',
            'sua voz', 
            'essência',
            'melhor de você',
            'potencial ilimitado'
        ];
        
        let currentWordIndex = 0;
        
        function rotateText() {
            // Add blur-out animation
            rotatingTextElement.classList.add('blur-out');
            
            setTimeout(() => {
                // Change the text
                currentWordIndex = (currentWordIndex + 1) % words.length;
                rotatingTextElement.textContent = words[currentWordIndex];
                
                // Remove blur-out and add focus-in
                rotatingTextElement.classList.remove('blur-out');
                rotatingTextElement.classList.add('focus-in');
                
                setTimeout(() => {
                    rotatingTextElement.classList.remove('focus-in');
                }, 800);
            }, 800);
        }
        
        // Start the rotation after 3 seconds, then repeat every 5 seconds
        setTimeout(() => {
            setInterval(rotateText, 5000);
        }, 3000);
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

 

