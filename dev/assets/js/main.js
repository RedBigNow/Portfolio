//Подстроить высоту фоновых линий под высоту всего контента
$(window).on('load resize', function() {
    var heightWrapper = document.querySelector(".wrapper").offsetHeight;
    document.querySelector(".bg-line").style.height = heightWrapper + "px";
});


$(document).ready(function () {

    const heroSlider = new Swiper('.hero-slider__container', {
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
			delay: 10000
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

});



