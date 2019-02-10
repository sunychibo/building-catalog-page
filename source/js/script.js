(function () {
    var mainNavigation = document.querySelector('.main-nav');
    var hamburgerToggle = document.querySelector('#nav-toggle');

    hamburgerToggle.addEventListener('click', function () {
        this.classList.toggle('active');
        mainNavigation.classList.toggle('is-open');
    });
})();

