"use strict";

//Подстроить высоту фоновых линий под высоту всего контента
$(window).on('load', function () {
  var heightContent = document.querySelector(".content").scrollHeight;
  document.querySelector(".bg-line").style.height = heightContent + "px";
}); //Анимация после открытия страницы

$(window).on('load', function () {
  new Promise(function (resolve, reject) {
    setTimeout(function () {
      return resolve();
    }, 500);
  }).then(function () {
    $('.transition-pages__after-top').css('height', '0');
    $('.transition-pages__after-bottom').css('height', '0');
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        return resolve();
      }, 100);
    });
  }).then(function () {
    $('.transition-pages__after').fadeOut();
  });
});
$(document).ready(function () {
  //Анимация перехода на другую страницу
  $('a').click(function (e) {
    if (!$(this).hasClass('transition-disable')) {
      window.goto = $(this).attr("href");
      new Promise(function (resolve, reject) {
        $('.transition-pages__before').fadeIn(100);
        setTimeout(function () {
          return resolve();
        }, 100);
      }).then(function () {
        $('.transition-pages__before-top').css('height', '50%');
        $('.transition-pages__before-bottom').css('height', '50%');
        return new Promise(function (resolve, reject) {
          setTimeout(function () {
            return resolve();
          }, 700);
        });
      }).then(function () {
        $(".transition-pages__before").css('transform', 'rotate(90deg) scale(5)');
        return new Promise(function (resolve, reject) {
          setTimeout(function () {
            return resolve();
          }, 800);
        });
      }).then(function () {
        document.location.href = window.goto;
      });
      e.preventDefault();
    }
  }); //Скрытие-появление шапки при скролле

  var lastScrollTop = 0;
  $(window).scroll(function () {
    var posit = $(this).scrollTop();

    if (posit > lastScrollTop) {
      $('.header-wrapper').fadeOut();
    } else {
      $('.header-wrapper').fadeIn();
      $('.header').addClass('header--sticky');
    } //Убираем фоновую заливку шапки если скроллить вверх некуда


    if ($(this).scrollTop() == 0) {
      $('.header').removeClass('header--sticky');
    }

    lastScrollTop = posit;
  }); //Открытие меню в модальном окне

  $('.menu-burger').on('click', function () {
    $(this).toggleClass('menu-burger--active');

    if ($(this).hasClass('menu-burger--active')) {
      $('.menu-container').fadeIn();
      $('body').addClass('scroll-disable');
    } else {
      $('.menu-container').fadeOut();
      $('body').removeClass('scroll-disable');
    }
  }); //Настройки слайдера с кейсами на главной странице

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
    nested: true
    /*,
    autoplay: {
    delay: 5000
    }*/

  }); //Вывод общего кол-ва слайдов

  var SlidesTotal = $('.portfolio-slider__item').length;
  $(".total").text(SlidesTotal); //Вывод номера текущего слайда

  heroSlider.on('slideChange', function () {
    $(".current").text(heroSlider.realIndex + 1);
    console.log(heroSlider.realIndex);
  }); //Автоматический скролл на странице "Портфолио"
  // var portfolio = $('.portfolio');
  // var portfolioHeight = $(".portfolio").prop('scrollHeight');
  // $(portfolio).animate({scrollTop: portfolioHeight}, 60000, "linear"); 
  //Убираем автоматический скролл если пользователь скроллит страницу сам
  // $(portfolio).on('scroll mousedown DOMMouseScroll mousewheel keyup', function(e) {
  //     if ( e.which > 0 || e.type === "mousedown" || e.type === "mousewheel"){
  //         portfolio.stop();
  //     }
  // });
  //Убираем автоматический скролл если пользователь зашел не с компьютера
  // $(window).on('load resize', function() {
  //     var width = $(window).width();
  //     if (width <= 992) {
  //         portfolio.stop();
  //     }
  // });
  // Фильтр проектов на странице "Портфолио"
  // $('.project-btn').on('click', function () {
  //     $(this).addClass('project-btn--active').siblings().removeClass('project-btn--active');
  //     let category = $(this).data("category");
  //     $('.project-item').each(function() {
  //         if(category == 'all') {
  //             $(this).fadeIn();
  //         } else if( $(this).hasClass(category) ) { 
  //             $(this).fadeIn();
  //         } else {
  //             $(this).fadeOut();
  //         }
  //     });
  // });

  $('.project-btn').on('click', function () {
    $(this).addClass('project-btn--active').siblings().removeClass('project-btn--active');
    var category = $(this).data("category");
    $('.project-item').each(function () {
      if (category == 'all') {
        $(this).fadeIn();
      } else if ($(this).hasClass(category)) {
        $(this).fadeIn();
      } else {
        $(this).fadeOut();
      }
    }); //После фильтрации меняется высота контента, поэтому нужно менять и высоту фоновых линий, чтобы избежать пустых пространств внизу

    var i = 0;

    var removeContentHeight = function removeContentHeight() {
      if (i <= 4) {
        i++;
        var heightContent = $(".content").height();
        document.querySelector(".bg-line").style.height = heightContent + "px";
      } else {
        clearInterval(intervalId);
      }
    };

    var intervalId = setInterval(removeContentHeight, 100);
  });
}); //Parallax эффект при движении мыши у назначенных элементов

$(window).on('mousemove', function (e) {
  var mouseX = e.pageX / 2; //Получаем число для движения элемента по оси "Z"

  var mouseY = e.pageY / 2; //Получаем число для движения элемента по оси "Y"

  $('.parallax').each(function () {
    var z = parseInt($(this).data("z"));
    var y = parseInt($(this).data("y"));
    $(this).css('transform', 'translate(' + mouseX * (z * 0.010) + 'px, ' + mouseY * (y * 0.01) + 'px)');
  });
}); //Инициализация библиотеки с анимациями (AOS)

AOS.init({
  disable: 'mobile'
}); //Инилиализируем библиотеку с анимациями exllax

$(window).enllax(); //Кнопка "Наверх"

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