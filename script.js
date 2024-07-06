
document.addEventListener("DOMContentLoaded", function () {
    const memberCount = document.getElementById("member-counter");
    let count = 0;
    const target = 131;
    let interval;

    function startCounter() {
        interval = setInterval(() => {
            if (count < target) {
                count++;
                memberCount.textContent = count;
            } else {
                clearInterval(interval);
                triggerConfetti();
            }
        }, 50);
    }

    function triggerConfetti() {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    }

    const aboutUsImage = document.getElementById("about-us-image");

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Adjust this value as needed
    };

    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter();
                observer.unobserve(aboutUsImage); // Stop observing once the counter starts
            }
        });
    }

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    observer.observe(aboutUsImage);
});

















