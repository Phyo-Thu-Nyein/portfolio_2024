const scrollReveal = () => {
    const revealElements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        observer.observe(el);
    });

    // When a nav anchor link is clicked, immediately reveal all
    // .reveal sections between current scroll position and the
    // target so they don't cause layout shift during smooth scroll.
    const revealSectionsAbove = (targetEl) => {
        const targetTop = targetEl.getBoundingClientRect().top + window.scrollY;
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top + window.scrollY;
            if (elTop <= targetTop && !el.classList.contains('revealed')) {
                el.classList.add('revealed');
                observer.unobserve(el);
            }
        });
    };

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', () => {
            const id = link.getAttribute('href');
            if (id && id !== '#') {
                const target = document.querySelector(id);
                if (target) {
                    revealSectionsAbove(target);
                }
            }
        });
    });
};

export default scrollReveal;
