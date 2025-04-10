document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero section animation
    gsap.from("#hero h2", {
        duration: 2,
        y: -50,
        opacity: 0,
        ease: "power2.out"
    });
    gsap.from("#hero p", {
        duration: 1,
        y: 50,
        opacity: 0,
        delay: 0.3,
        ease: "power2.out"
    });
    gsap.from("#hero .btn", {
        duration: 1,
        opacity: 0,
        delay: 0.6,
        ease: "power2.out"
    });

    // Section scroll animations
    gsap.utils.toArray("section").forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power2.out"
        });
    });

    // Service card hover effects
    document.querySelectorAll(".service").forEach(card => {
        card.addEventListener("mouseenter", () => {
            gsap.to(card, {
                duration: 0.3,
                y: -10,
                boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
                ease: "power1.out"
            });
        });
        card.addEventListener("mouseleave", () => {
            gsap.to(card, {
                duration: 0.3,
                y: 0,
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                ease: "power1.out"
            });
        });
    });

    // Smooth scrolling for nav links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            gsap.to(window, {
                duration: 1,
                scrollTo: this.getAttribute('href'),
                ease: "power2.inOut"
            });
        });
    });

    // Email link redirect
    document.getElementById('email-link')?.addEventListener('click', function(e) {
        e.preventDefault();
        window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=remcontltd@gmail.com&su=Consultation%20Inquiry&body=Hello%20REMCONT%20CONSULTANTS,%0A%0AI%20would%20like%20to%20inquire%20about%20your%20services.%0A%0ABest%20regards,`, '_blank');
    });

    // Form validation
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = contactForm.querySelector('input[type="email"]');
            const message = contactForm.querySelector('textarea');
            
            if (!email.value || !message.value) {
                animateError("Please fill in all required fields");
                return;
            }
            
            if (!email.value.includes('@')) {
                animateError("Please enter a valid email address");
                return;
            }
            
            // Success animation
            gsap.fromTo(contactForm, 
                { backgroundColor: "rgba(76, 175, 80, 0.2)" },
                { 
                    backgroundColor: "transparent", 
                    duration: 2,
                    onComplete: () => {
                        alert('Thank you for your message! We will get back to you soon.');
                        contactForm.reset();
                    }
                }
            );
        });
    }

    function animateError(message) {
        const errorAnim = gsap.to(contactForm, {
            backgroundColor: "rgba(244, 67, 54, 0.2)",
            duration: 0.5,
            yoyo: true,
            repeat: 1,
            onComplete: () => alert(message)
        });
    }
});
