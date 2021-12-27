// Swiper Banners 
var swiperBanners = new Swiper(".swiper-banner", {
    
    autoplay: {
        delay: 4000,
    },
    navigation: {
        nextEl: ".swiper-banner .swiper-button-next",
        prevEl: ".swiper-banner .swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + /* (index + 1) + */ "</span>";
        },
    },
    on: {
        slideChange: function () {
            /* const bannersSlides = document.querySelectorAll('.swiper-banners .swiper-slide')
            setTimeout(() => {
                bannersSlides.forEach(item => {
                    const banner = item.querySelector('.banners__banner')
                    banner.classList.remove('_animate')
                    if (item.classList.contains('swiper-slide-active')) banner.classList.add('_animate')
                })
            }, 50) */
        },
        init: function() {
            /* document.querySelector('.swiper-banner .swiper-slide ').classList.add('_animate') */
        }
    },
});