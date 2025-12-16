document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector('.about-slider');
    if (!slider) return; // если слайдера нет на странице — ничего не делаем

    const images = slider.querySelectorAll('.slider-img');
    if (images.length === 0) return;

    let current = 0;

    function showNextSlide() {
        images[current].classList.remove('active');
        current = (current + 1) % images.length;
        images[current].classList.add('active');
    }


    images[0].classList.add('active');

    setInterval(showNextSlide, 5000);
});