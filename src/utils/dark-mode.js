const darkMode = () => {
    const themeToggleBtns = document.querySelectorAll('#theme-toggle');
    const dayIcons = document.querySelectorAll('.day');
    const nightIcons = document.querySelectorAll('.night');

    // State
    const theme = localStorage.getItem('theme');
    const icon = localStorage.getItem('icon');
    let isLightMode = false;

    // On mount
    theme && document.body.classList.add(theme);
    const svgs = document.querySelectorAll('#night');
    icon && svgs.forEach(one => {
        one.classList.remove(icon);
        dayIcons.forEach(day => {
            day.style.display = 'none';
            isLightMode = true;
        })
    });

    // Handlers
    const handleThemeToggle = () => {
        document.body.classList.toggle('light-mode');
        if (document.body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light-mode');
            // document.querySelector('.night').style.display = 'block';
            localStorage.setItem('icon', 'night');
        } else {
            localStorage.removeItem('theme');
            document.body.removeAttribute('class');
            localStorage.removeItem('icon');
            document.querySelector('#night').removeAttribute('.night');
        }
        isLightMode = !isLightMode;
        if (isLightMode) {
            dayIcons.forEach(one => one.style.display = 'none');
            nightIcons.forEach(night => night.style.display = 'block');
        } else {
            dayIcons.forEach(one => one.style.display = 'block');
            nightIcons.forEach(night => night.style.display = 'none');
        }
    }

    // Events
    themeToggleBtns.forEach(btn =>
        btn.addEventListener('click', handleThemeToggle)
    );

};

export default darkMode;