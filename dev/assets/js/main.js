//Подстроить высоту фоновых линий под высоту всего контента
$(window).on('load resize', function() {
    var heightWrapper = document.querySelector(".wrapper").scrollHeight;
    document.querySelector(".bg-line").style.height = heightWrapper + "px";
});

$(document).ready(function () {

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

    //Настройки слайдера на главном экране
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
        autoplay: {
			delay: 5000
		}
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


});


//Инилиализируем библиотеку для анимаций exllax
$(window).enllax();

