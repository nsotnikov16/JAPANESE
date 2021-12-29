// Mobile Header 
const header = document.querySelector('.header')
const burger = header.querySelector('.menu__burger')
burger.addEventListener('click', () => header.classList.toggle('open-menu'))
/* const headerTop = header.querySelector('.header__top')
const headerContacts = header.querySelector('.header__contacts')
const headerSocial = header.querySelector('.header__contacts-social')
const headerBtn = header.querySelector('.header__btn')
const headerMenuList = header.querySelector('.header__menu .menu__list')
const headerMenuBlock = header.querySelector('.header__menu .menu__block')

const transferElements = [headerBtn, headerSocial]



function headerMobile() {
    transferElements.forEach(el => headerMenuBlock.append(el))
}

function headerNoMobile() {
    headerTop.append(headerBtn)
    headerContacts.append(headerSocial)
}

if (window.innerWidth < 768) headerMobile()

window.addEventListener('resize', () => {
    window.innerWidth < 768 ? headerMobile() : headerNoMobile()
}) */


// Swiper Banner 
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
        },
        init: function () {
        }
    },
});

// Forms
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
            const rows = this._rows.filter(row => row.classList.contains('none'))
            rows.forEach(row => {
                if (!rows.includes(e.target.parentNode) && row.querySelector('.form-input').value === '') this.deactivateInput(row)
            })
        })
        this._inputs.forEach(input => input.addEventListener('focus', () => {
            if (!input.closest('.banner__form')) input.closest('.form-row').style.border = "2px solid rgba(229, 41, 41, 0.4)"
        }))
        this._inputs.forEach(input => input.addEventListener('focusout', () => {
            if (input.value === '') this.deactivateInput(input.parentNode)
            if (!input.closest('.banner__form')) input.closest('.form-row').style.border = "2px solid #e4ebf1"
        }))
        this._form.addEventListener('submit', (e) => e.preventDefault())
    }
}

const forms = document.querySelectorAll('.form')
if (forms.length > 0) forms.forEach(form => new Form(form))


// YMaps
ymaps.ready(init);

const addresses = [
    {
        id: "1",
        coordinates: [61.264919, 73.416461],
        title: "Магазин",
        adress: "г. Сургут, Профсоюзов, 39/2",
        /* idMap: "79382519486" */
    },
    {
        id: "2",
        coordinates: [61.267164, 73.408331],
        title: "Автосервис",
        adress: "г. Сургут, Профсоюзов, 31/2",
        /* idMap: "34832144675" */
    },

];

function init() {
    var myMap = new ymaps.Map(
        "map",
        {
            center: [61.265108, 73.412632],
            zoom: 15,
            controls: ['zoomControl', 'geolocationControl'],
        },
        {
            searchControlProvider: "yandex#search",
            zoomControlPosition: { right: 10, top: 250 },
            zoomControlSize: 'small',
            geolocationControlPosition: { right: 10, top: 330 }
        }
    ),
        BalloonContentLayout = ymaps.templateLayoutFactory.createClass(
            `<div class="map__info">
                <p class="map__info-title">{{properties.title}}</p>   
                <div class="map__info-row">
                    <svg>
                        <use href="./img/icons/icons.svg#map"></use>
                    </svg>
                    <p>{{properties.adress}}</p>
                </div>
                <a href="tel:+73452355560" class="map__phone">
                    <svg>
                        <use href="./img/icons/icons.svg#phone-footer"></use>
                    </svg>
                    <p>+7 (3462) 769-382</p>
                </a>
            </div>`
        );

    addresses.forEach(
        ({ adress, title, coordinates, id }, ind) => {
            myPlacemarkWithContent = new ymaps.Placemark(
                coordinates,
                {
                    adress,
                    title
                },
                {
                    iconImageHref: "./img/geo.svg",
                    iconImageSize: [55, 60],
                    iconLayout: "default#imageWithContent",
                    iconContentOffset: [12.5, 10],
                    iconImageOffset: [-25, 0],
                    balloonContentLayout: BalloonContentLayout,
                    balloonPanelMaxMapArea: 0,
                    hideIconOnBalloonOpen: false,
                }
            );

            myMap.geoObjects.add(myPlacemarkWithContent);
        })
}


// Анимация
const sectionTitle = document.querySelectorAll('.section__title')
const sectionSubtitle = document.querySelectorAll('.section__subtitle')
const sectionDescription = document.querySelectorAll('.section__description')

sectionTitle.forEach(item => item.classList.add('_anim-items', '_anim-no-hide'))
sectionSubtitle.forEach(item => item.classList.add('_anim-items', '_anim-no-hide'))
sectionDescription.forEach(item => item.classList.add('_anim-items', '_anim-no-hide'))

const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);

    function animOnScroll() {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_animate');
            } else {
                if (!animItem.classList.contains('_anim-no-hide')) {
                    animItem.classList.remove('_animate');
                }
            }
        }
    }
    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }

    setTimeout(() => {
        animOnScroll();
    }, 10);
}


// Scroll To
$('.scroll-to').on('click', function () {

    let href = $(this).attr('href');

    $('html, body').animate({
        scrollTop: $(href).offset().top
    }, {
        duration: 400,   // по умолчанию «400» 
        easing: "linear" // по умолчанию «swing» 
    });

    return false;
});


// Popups
class Popup {
    constructor(popupElement) {
        this._popupElement = popupElement;
        this._closeButton = this._popupElement.querySelector('.popup__close');
        this._img = this._popupElement.id === "photo" ? this._popupElement.querySelector('.popup__img') : null;
        this._source = this._img ? this._img.previousElementSibling : null;
        this._handleEscClose = this._handleEscClose.bind(this)
        this._openingLinks = document.querySelectorAll(`[data-pointer="${this._popupElement.id}"]`)
        this.setEventListeners()
    }

    open(el) {
        if (this._img) this._img.src = el.src
        if (this._source) this._source.srcset = el.src
        document.body.style.overflow = "hidden";
        this._popupElement.classList.add('popup_opened')
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        if (this._img) this._img.src = ""
        this._popupElement.classList.remove('popup_opened');
        document.body.style.overflow = "visible";
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.keyCode === 27) {
            this.close();
        }
    }

    _handleOverlayClick(evt) {
        if (evt.target === evt.currentTarget) {
            this.close();
        }
    }

    setEventListeners() {
        this._openingLinks.forEach(link => link.addEventListener('click', (e) => { e.preventDefault(); this.open(e.target) }))
        this._closeButton.addEventListener('click', () => this.close());
        this._popupElement.addEventListener('click', this._handleOverlayClick.bind(this));
    }
}

const popups = document.querySelectorAll('.popup')

if (popups.length > 0) popups.forEach(item => new Popup(item))