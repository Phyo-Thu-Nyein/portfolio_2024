const musicPlayer = () => {
    const player = document.querySelector('.music-player');
    if (!player) return;

    const audio = player.querySelector('.music-player__audio');
    const playBtn = player.querySelector('.music-player__play-btn');
    const volumeBtn = player.querySelector('.music-player__volume-btn');
    const volumeSlider = player.querySelector('.music-player__volume-slider');
    const progressFill = player.querySelector('.music-player__progress-fill');

    let isPlaying = false;

    // Toggle play / pause
    const togglePlay = () => {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
    };

    audio.addEventListener('play', () => {
        isPlaying = true;
        playBtn.classList.add('playing');
    });

    audio.addEventListener('pause', () => {
        isPlaying = false;
        playBtn.classList.remove('playing');
    });

    playBtn.addEventListener('click', togglePlay);

    // Progress bar
    audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
            const pct = (audio.currentTime / audio.duration) * 100;
            progressFill.style.width = `${pct}%`;
        }
    });

    // Loop the track
    audio.addEventListener('ended', () => {
        audio.currentTime = 0;
        audio.play();
    });

    // Volume control
    volumeSlider.addEventListener('input', (e) => {
        const vol = parseFloat(e.target.value);
        audio.volume = vol;
        updateVolumeIcon(vol);
    });

    // Mute toggle
    volumeBtn.addEventListener('click', () => {
        if (audio.volume > 0) {
            volumeBtn.dataset.prevVolume = audio.volume;
            audio.volume = 0;
            volumeSlider.value = 0;
        } else {
            const prev = parseFloat(volumeBtn.dataset.prevVolume || 0.5);
            audio.volume = prev;
            volumeSlider.value = prev;
        }
        updateVolumeIcon(audio.volume);
    });

    const updateVolumeIcon = (vol) => {
        const icon = volumeBtn.querySelector('i');
        icon.className = vol === 0
            ? 'bx bx-volume-mute'
            : vol < 0.5
                ? 'bx bx-volume-low'
                : 'bx bx-volume-full';
    };

    // Set initial volume
    audio.volume = 0.4;
    volumeSlider.value = 0.4;

    // Auto-play on page load
    // Browsers block autoplay without user interaction, so we attempt
    // to play and if it's blocked, we start on the first user click.
    const attemptAutoplay = () => {
        audio.play().catch(() => {
            // Autoplay was blocked — start on first user interaction
            const startOnInteraction = () => {
                audio.play();
                document.removeEventListener('click', startOnInteraction);
                document.removeEventListener('keydown', startOnInteraction);
                document.removeEventListener('scroll', startOnInteraction);
            };
            document.addEventListener('click', startOnInteraction, { once: false });
            document.addEventListener('keydown', startOnInteraction, { once: false });
            document.addEventListener('scroll', startOnInteraction, { once: false });
        });
    };

    attemptAutoplay();
};

export default musicPlayer;
