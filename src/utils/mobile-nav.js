const mobileNav = () => {

    const burgerMenu = document.querySelector('.header__bars');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-nav__link');

    // state
    let isMobileNavOpen = false;

    burgerMenu.addEventListener('click', () => {

        isMobileNavOpen = !isMobileNavOpen;
        if (isMobileNavOpen) {
            mobileNav.style.display = 'flex';
            document.body.style.overflowY = 'hidden';
        } else {
            mobileNav.style.display = 'none';
            document.body.style.overflowY = 'auto';
        }
    });

    //In call-bk functions, parathensis are only required when more than one parameter is accepted
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => { 
            isMobileNavOpen = false;
            mobileNav.style.display = 'none';
            document.body.style.overflowY = 'auto';
        });
    })

};

export default mobileNav;