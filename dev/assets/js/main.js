$(document).ready(function () {

//Подстроить высоту фоновых линий под высоту всего контента
$(window).on('load resize', function() {
    var heightWrapper = document.querySelector(".wrapper").scrollHeight;
    document.querySelector(".bg-line").style.height = heightWrapper + "px";
});

//Анимация перехода на другую страницу
$('a').click(function(e){
    window.goto=$(this).attr("href");
    new Promise(function(resolve, reject) {
        $('.transition-pages__before').fadeIn(100);
        setTimeout(() => resolve(), 100);
    }).then(function() {
        $('.transition-pages__before-top').css('height','50%')
        $('.transition-pages__before-bottom').css('height','50%')
        return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), 700);
        });
    }).then(function() {
        $(".transition-pages__before").css('transform','rotate(90deg) scale(5)')
        return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), 800);
        });
    }).then(function() {
        document.location.href=window.goto;
    });
    e.preventDefault();
}); 

//Анимация после открытия страницы
$(window).on('load', function() {
    new Promise(function(resolve, reject) {
        setTimeout(() => resolve(), 500);
    }).then(function() {
        $('.transition-pages__after-top').css('height','0')
        $('.transition-pages__after-bottom').css('height','0')
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(), 100);
        });
    }).then(function() {
        $('.transition-pages__after').fadeOut();
    });
});

//Скрытие-появление шапки при скролле
var lastScrollTop = 0;

$(window).scroll(function() {
    var posit = $(this).scrollTop();
    if(posit > lastScrollTop) {
        $('.header-wrapper').fadeOut();
    } else {
        $('.header-wrapper').fadeIn();
        $('.header').addClass('header--sticky');
    }
    //Убираем фоновую заливку шапки если скроллить вверх некуда
    if ($(this).scrollTop() == 0) {
        $('.header').removeClass('header--sticky');
    }
    lastScrollTop = posit; 
});

//Открытие меню в модальном окне
$('.menu-burger').on('click', function() {
    $(this).toggleClass('menu-burger--active');
    if( $(this).hasClass('menu-burger--active') ) {
        $('.menu-container').fadeIn();
        $('body').addClass('scroll-disable');
    } else {
        $('.menu-container').fadeOut();
        $('body').removeClass('scroll-disable');
    }
});

//Инилиализация поэкранного скролла на главной странице
$(window).on('load resize', function() {
    if ($(window).width() < 1000) {
        var hero = new Swiper('.hero-content', {
            slidesPerView: 1,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            navigation: {
                nextEl: '.hero-wrapper__nav-next',
                prevEl: '.hero-wrapper__nav-prev',
            }/*,
            autoplay: {
                delay: 5000
            }*/
        });
    }
});

//Настройки слайдера с кейсами на главной странице
var heroSlider = new Swiper('.hero-slider__container', {
    slidesPerView: 1,
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
    nested: true/*,
    autoplay: {
        delay: 5000
    }*/
    });
    
//Вывод общего кол-ва слайдов
var SlidesTotal = $('.portfolio-slider__item').length;
$(".total").text(SlidesTotal);

//Вывод номера текущего слайда
heroSlider.on('slideChange', function () {
    $(".current").text(heroSlider.realIndex +1);
    console.log(heroSlider.realIndex);
});

//Автоматический скролл на странице "Портфолио"
var portfolio = $('.portfolio');
var portfolioHeight = document.querySelector(".portfolio").scrollHeight;
$(portfolio).animate({scrollTop: portfolioHeight}, 60000, "linear"); 

//Убираем автоматический скролл если пользователь скроллит страницу сам
$(portfolio).on('scroll mousedown DOMMouseScroll mousewheel keyup', function(e) {
    if ( e.which > 0 || e.type === "mousedown" || e.type === "mousewheel"){
        portfolio.stop();
    }
});

});


//Parallax эффект при движении мыши у назначенных элементов
$(window).on('mousemove', function (e) {
    var mouseX = e.pageX / 2; //Получаем число для движения элемента по оси "Z"
    var mouseY = e.pageY / 2; //Получаем число для движения элемента по оси "Y"
    $('.parallax').each(function () {
    var z = parseInt($(this).data("z"));
    var y = parseInt($(this).data("y"));
        $(this).css('transform', 'translate(' + (mouseX * (z * 0.010)) + 'px, '  + (mouseY * (y * 0.01)) + 'px)');
    });
});

//Инициализация библиотеки с анимациями (AOS)
AOS.init({
    disable: 'mobile'
});

//Инилиализируем библиотеку с анимациями exllax
$(window).enllax();

//Кнопка "Наверх"
(function () {
    
    $(document).on('scroll', function () {
    if ($(document).scrollTop() > 800) {
        $('.back-top').show();
    } else {
        $('.back-top').hide();
    }
    });

    $('.back-top').on('click', function () {
    $('html, body').animate({
        scrollTop: 0
    }, 'slow');
    return false;
    });

})();