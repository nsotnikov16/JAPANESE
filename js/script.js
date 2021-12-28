// Swiper Banners 
var swiperBanners = new Swiper(".swiper-banner", {

    autoplay: {
        delay: 4000,
    },
    effect: 'fade',
    fadeEffect: {
        crossFade: true
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
        init: function () {
            /* document.querySelector('.swiper-banner .swiper-slide ').classList.add('_animate') */
        }
    },
});


class Form {
    constructor(element) {
        this._form = element;
        this._rows = Array.from(this._form.querySelectorAll('.form-row'));
        this._inputs = Array.from(this._form.querySelectorAll('.form-input'));
        this._labels = Array.from(this._form.querySelectorAll('.form-label'));
        this.setEventListeners()
    }

    activateInput(row) {
        row.classList.add('none')
    }

    deactivateInput(row) {
        row.classList.remove('none')
    }

    setEventListeners() {
        this._labels.forEach(label => label.addEventListener('click', () => this.activateInput(label.closest('.form-row'))))
        document.addEventListener('click', (e) => {
            const row = this._rows.find(row => row.classList.contains('none'))
            if (row && (e.target.parentNode !== row)) this.deactivateInput(row)
        })
    }
}

const forms = document.querySelectorAll('.form')
if (forms.length > 0) forms.forEach(form => new Form(form))