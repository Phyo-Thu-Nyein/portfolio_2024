const hobbies = () => {
    // === Category Filter ===
    const filterBtns = document.querySelectorAll('.hobbies__filter-btn');
    const cards = document.querySelectorAll('.hobbies__card, .hobbies__stream-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.dataset.filter;

            cards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // === Lightbox ===
    const lightbox = document.querySelector('.lightbox');
    if (!lightbox) return;

    const lightboxImg = lightbox.querySelector('.lightbox__img');
    const lightboxCaption = lightbox.querySelector('.lightbox__caption');
    const closeBtn = lightbox.querySelector('.lightbox__close');
    const prevBtn = lightbox.querySelector('.lightbox__nav--prev');
    const nextBtn = lightbox.querySelector('.lightbox__nav--next');

    // Collect all image cards (not stream cards)
    let imageCards = [];
    let currentIndex = 0;

    const getVisibleImageCards = () => {
        return Array.from(document.querySelectorAll('.hobbies__card:not(.hidden)'));
    };

    const openLightbox = (index) => {
        imageCards = getVisibleImageCards();
        currentIndex = index;
        const card = imageCards[currentIndex];
        const img = card.querySelector('img');
        const title = card.querySelector('.hobbies__card-title');

        lightboxImg.src = img.dataset.src || img.src;
        lightboxCaption.textContent = title ? title.textContent : '';
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    };

    const navigate = (direction) => {
        imageCards = getVisibleImageCards();
        currentIndex = (currentIndex + direction + imageCards.length) % imageCards.length;
        const card = imageCards[currentIndex];
        const img = card.querySelector('img');
        const title = card.querySelector('.hobbies__card-title');

        lightboxImg.src = img.dataset.src || img.src;
        lightboxCaption.textContent = title ? title.textContent : '';
    };

    // Attach click to all image cards
    document.querySelectorAll('.hobbies__card').forEach((card, i) => {
        card.addEventListener('click', () => {
            const visibleCards = getVisibleImageCards();
            const visibleIndex = visibleCards.indexOf(card);
            if (visibleIndex !== -1) {
                openLightbox(visibleIndex);
            }
        });
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', () => navigate(-1));
    nextBtn.addEventListener('click', () => navigate(1));

    // Close on backdrop click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigate(-1);
        if (e.key === 'ArrowRight') navigate(1);
    });
};

export default hobbies;
