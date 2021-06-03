"use strict";

$(document).ready(function () {
  svg4everybody({});
}); // Полифилы
// forEach IE 11

if ('NodeList' in window && !NodeList.prototype.forEach) {
  console.info('polyfill for IE11');

  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;

    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
} // closest IE 11


(function () {
  if (!Element.prototype.closest) {
    Element.prototype.closest = function (css) {
      var node = this;

      while (node) {
        if (node.matches(css)) return node;else node = node.parentElement;
      }

      return null;
    };
  }
})(); // matches IE 11


(function () {
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector;
  }
})(); //Array.form IE 11


if (!Array.from) {
  Array.from = function (object) {
    'use strict';

    return [].slice.call(object);
  };
}

$(document).ready(function () {
  /*
  //Мобильное меню
  if (window.matchMedia("(max-width: 770px)").matches) {
      $(function() {
        $(document).on("click", ".menu-container .nav-menu__item--parent a", function(e) {
            e.preventDefault();
            $(".menu-container .activity").removeClass("activity");
            $(this).siblings("ul").addClass("loaded").addClass("activity");
        });
        $(document).on("click", ".menu-container .nav-submenu__item-back a", function(e) {
            e.preventDefault();
            $(".menu-container .activity").removeClass("activity");
            $(this).parent().parent().removeClass("loaded");
            $(this).parent().parent().parent().parent().addClass("activity");
        });
        $(document).on("click", ".toolbar__burger", function(e) {
            e.preventDefault();
            $(".menu-container").addClass("loaded");
            $(".mobile-menu__overlay").fadeIn();
        });
        $(document).on("click", ".mobile-menu__overlay", function(e) {
            $(".menu-container").removeClass("loaded");
            $(this).fadeOut(function() {
                $(".menu-container .loaded").removeClass("loaded");
                $(".menu-container .activity").removeClass("activity");
            });
        });
    });
  }
  */
  var body = document.body; //Мобильное меню

  var burger = $('.header-burger');
  var header = $('.header-container');
  $(burger).click(function () {
    $(header).toggleClass('header-container--open');
    $(this).toggleClass('header-burger__close');
    $(body).toggleClass('no-scroll');
  });
  $('.header-mobile__bottom .callback').click(function () {
    $(header).toggleClass('header-container--open');
    $(burger).toggleClass('header-burger__close');
    $(body).toggleClass('no-scroll');
  });
  $('.header-mobile__bottom .header-toolbar__search').click(function () {
    $(header).toggleClass('header-container--open');
    $(burger).toggleClass('header-burger__close');
    $(body).toggleClass('no-scroll');
  });
  var menuItemParent = $('.nav-menu__item--parent');
  menuItemParent.on('click', function (e) {
    var mobileMenu = $(e.target).parent().find('> ul.nav-submenu');

    if (mobileMenu.css('display') == 'none') {
      e.preventDefault();
      mobileMenu.slideDown();
      e.stopPropagation();
    } else if (mobileMenu.css('display') == 'block') {
      e.preventDefault();
      mobileMenu.slideUp();
      e.stopPropagation();
    }
  }); //Фильтр в каталоге (Мобила)

  var filterIcon = $('.mobile-filter__btn');
  var filter = $('.catalog-filter');
  var closeFilter = $('.catalog-filter__close');

  if ($(window).width() < 1000) {
    $(filterIcon).click(function () {
      $(filter).toggleClass('catalog-filter--open');
      $(body).toggleClass('no-scroll');
    });
    $(closeFilter).click(function () {
      $(filter).toggleClass('catalog-filter--open');
      $(body).toggleClass('no-scroll');
    });
    $(".filter-bottom #applyFiltering").click(function () {
      $(filter).toggleClass('catalog-filter--open');
      $(body).toggleClass('no-scroll');
    });
  } //Слайдер на первом экране главной страницы


  $('.hero-slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rows: 1,
    fade: true,
    cssEase: 'linear',
    //dots: true,
    //dotsClass: "hero-dots",
    autoplay: false,
    speed: 500,
    nextArrow: document.querySelector('#hero-next'),
    prevArrow: document.querySelector('#hero-prev')
  });
  /*
  //Слайдер с услугами на главной странице
  $('.service-slider__list').slick({
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    //rows: 1,
    fade: true,
    cssEase: 'linear',
    //dots: true,
    //dotsClass: "hero-dots",
    //autoplay: false,
    //speed: 500,
    nextArrow: document.querySelector('#hero-next'),
    prevArrow: document.querySelector('#hero-prev')
  });
  
  */
  //Progress bar для слайдера на главном экране

  var percentTime;
  var tick;
  var time = .1;
  var progressBarIndex = 0;
  $('.hero-progress__bar .progressBar').each(function (index) {
    var progress = "<div class='inProgress inProgress" + index + "'></div>";
    $(this).html(progress);
  });

  function startProgressbar() {
    resetProgressbar();
    percentTime = 0;
    tick = setInterval(interval, 10);
  }

  function interval() {
    if ($('.hero-slider .slick-track div[data-slick-index="' + progressBarIndex + '"]').attr("aria-hidden") === "true") {
      progressBarIndex = $('.hero-slider .slick-track div[aria-hidden="false"]').data("slickIndex");
      startProgressbar();
    } else {
      percentTime += 1 / (time + 9);
      $('.inProgress' + progressBarIndex).css({
        width: percentTime + "%"
      });

      if (percentTime >= 100) {
        $('.hero-slider').slick('slickNext');
        progressBarIndex++;

        if (progressBarIndex > 2) {
          progressBarIndex = 0;
        }

        startProgressbar();
      }
    }
  }

  function resetProgressbar() {
    $('.inProgress').css({
      width: 0 + '%'
    });
    clearInterval(tick);
  }

  startProgressbar();
  $('.hero-progress__bar-item').click(function () {
    clearInterval(tick);
    var goToThisIndex = $(this).find("span").data("slickIndex");
    $('.hero-slider').slick('slickGoTo', goToThisIndex, false);
    startProgressbar();
  }); //Слайдер с отзывами на главной странице

  $('.review-slider___list').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rows: 1,
    fade: true,
    cssEase: 'linear',
    dots: true,
    appendDots: $('.reviews-slider__dots'),
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: document.querySelector('#reviews-next'),
    prevArrow: document.querySelector('#reviews-prev')
  }); //Слайдер с категориями товаров

  var catLength = $('.index-category__item').length;
  var catSlider = $('[data-slider="category"]');
  $('.index-category__list').slick({
    infinite: true,
    slidesToShow: catLength,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    autoplay: true,
    autoplaySpeed: 2000,
    focusOnSelect: true,
    asNavFor: catSlider
  });
  catSlider.slick({
    draggable: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    cssEase: 'linear',
    asNavFor: '.index-category__list'
  }); //Выводим номер текущего слайда в категориях товаров

  $(".index-category__list").on('afterChange', function (event, slick, currentSlide) {
    $("#current").text(currentSlide + 1);
  }); //Выводим общее кол-во слайдов с категориями товаров

  $("#total").text(catLength); //Кастомный autoplay для слайдера с категориями товаров

  function autoplayCategorySlider() {
    $(".index-category .slick-next").trigger("click");
  }

  setInterval(autoplayCategorySlider, 10000); //Слайдер с постами из блога

  var blogLength = $('.blog-preview__item').length;
  var blogSlider = $('[data-slider="blog"]');
  $('.blog-preview__list').slick({
    arrows: true,
    infinite: true,
    slidesToShow: blogLength,
    slidesToScroll: 1,
    focusOnSelect: true,
    asNavFor: blogSlider
  });
  blogSlider.slick({
    arrows: true,
    draggable: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    cssEase: 'linear',
    asNavFor: '.blog-preview__list'
  });
  $('#blog-next').click(function () {
    $(".blog .slick-next").trigger("click");
  });
  $('#blog-prev').click(function () {
    $(".blog .slick-prev").trigger("click");
  });

  function autoplayBlobSlider() {
    $(".blog .slick-next").trigger("click");
  }

  setInterval(autoplayBlobSlider, 10000); //Слайдер с товарами + прогресс бар

  function setProgressProduct(index) {
    var calc = (index + 1) / $sliderProduct.slick('getSlick').slideCount * 100;
    $progressBarProduct.css('background-size', "".concat(calc, "% 100%")).attr('aria-valuenow', calc);
  }

  var $sliderProduct = $('.product-slider__list');
  var $progressBarProduct = $('#progressBarProduct');
  $sliderProduct.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    setProgressProduct(nextSlide);
  });
  $sliderProduct.slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    rows: 0,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: document.querySelector('#catalog-next'),
    prevArrow: document.querySelector('#catalog-prev'),
    responsive: [{
      breakpoint: 1355,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 1000,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]
  });
  setProgressProduct(0); //Слайдер с брендами

  $('.brand-slider__list').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    rows: 1,
    //dots: true,
    //dotsClass: "hero-dots",
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    nextArrow: document.querySelector('#brend-next'),
    prevArrow: document.querySelector('#brend-prev'),
    responsive: [{
      breakpoint: 1000,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 580,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 380,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]
  }); //Слайдер с постами из инсты + прогресс бар

  function setProgressInstagram(index) {
    var calc = (index + 1) / $sliderInstagram.slick('getSlick').slideCount * 100;
    $progressBarInstagram.css('background-size', "".concat(calc, "% 100%")).attr('aria-valuenow', calc);
  }

  var $sliderInstagram = $('.instagram-slider__list');
  var $progressBarInstagram = $('#progressBarInstagram');
  $sliderInstagram.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    setProgressInstagram(nextSlide);
  });
  $sliderInstagram.slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    rows: 0,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: document.querySelector('#inst-next'),
    prevArrow: document.querySelector('#inst-prev'),
    responsive: [{
      breakpoint: 1000,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 770,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 460,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]
  });
  setProgressInstagram(0); //Слайдер с фотографиями на детальной странице товара (Внутренняя и внешняя отделка)

  var backLength = $(' .product-image__item-back').length;
  var backPrevSlider = $('.preview-back__list');
  $('.product-image__list-back').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    //autoplay: true,
    //autoplaySpeed: 2000,
    fade: true,
    cssEase: 'linear',
    asNavFor: backPrevSlider
  });
  backPrevSlider.slick({
    draggable: false,
    infinite: true,
    slidesToShow: backLength,
    slidesToScroll: 1,
    focusOnSelect: true,
    vertical: true,
    verticalSwiping: true,
    asNavFor: '.product-image__list-back',
    responsive: [{
      breakpoint: 770,
      settings: {
        vertical: false
      }
    }]
  }); //Кастомный autoplay для слайдера с фотографиями дверей(Внутренняя отделка)

  function autoplayBackSlider() {
    $(".product-image__wrapper .slick-next").trigger("click");
  }

  setInterval(autoplayBackSlider, 10000); //Слайдер с фотографиями на детальной странице товара

  $('.product-image__list').slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    rows: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: document.querySelector('#productImage-next'),
    prevArrow: document.querySelector('#productImage-prev'),
    responsive: [{
      breakpoint: 770,
      settings: {
        slidesToShow: 1
      }
    }]
  }); //Маска для input phone

  (function () {
    $('.mask__input_phone').inputmask({
      mask: '+7(999)999-99-99',
      showMaskOnFocus: true,
      showMaskOnHover: false
    });
  })(); //Открытие модального окна для товаров из каталогов


  $(".buy1click").click(function () {
    var product_name = $(this).closest('.product-item').find('.product-item__title h4').text();
    $('#orderProductName').val(product_name);
    var product_img = $(this).closest('.product-item').find('.product-item__img img').attr('src');
    $('.order-img').find('#orderProductImage').attr('src', product_img);
  }); //Открытие модального окна для товаров из слайдеров

  $(".buy1click-slider").click(function () {
    var product_name_slider = $(this).closest('.product-slider__item').find('.product-slider__item-title h4').text();
    $('#orderProductName').val(product_name_slider);
    var product_img_slider = $(this).closest('.product-slider__item').find('.product-slider__item-img img').attr('src');
    $('.order-img').find('#orderProductImage').attr('src', product_img_slider);
  }); //Прикрутить к ajax обработчику формы "Консультация"

  $("#ConsultSubmit").click(function () {
    $.fancybox.close($('#consult'));
    $.fancybox.open($('#success'));
    setTimeout(function () {
      $.fancybox.close($('#success'));
    }, 5000);
  }); //Прикрутить к ajax обработчику формы "Обратная связь"

  $(".btn-form__action button").click(function () {
    $('.action-form__success').addClass('action-form__success--show');
    setTimeout(function () {
      $('.action-form__success').removeClass('action-form__success--show');
    }, 10000);
  }); //Прикрутить к ajax обработчику формы отзывов

  $("#reviewSubmit").click(function () {
    $.fancybox.close($('#reviewPopup'));
    $.fancybox.open($('#reviewSuccess'));
    setTimeout(function () {
      $.fancybox.close($('#reviewSuccess'));
    }, 5000);
  }); //Прикрутить к ajax обработчику формы заказа

  $("#orderSubmit").click(function () {
    $.fancybox.close($('#order'));
    $.fancybox.open($('#orderSuccess'));
    setTimeout(function () {
      $.fancybox.close($('#orderSuccess'));
    }, 5000);
  }); //Прикрутить к ajax обработчику формы в контактах

  $("#contactsSubmit").click(function () {
    $('.contacts-form__success').addClass('contacts-form__success-show');
    setTimeout(function () {
      $('.contacts-form__success').removeClass('contacts-form__success-show');
    }, 5000);
  }); //Скрытие и раскрытие блока с текстом для SEO

  $('.seo-open').click(function () {
    $('.seo-wrapper__hidden').slideToggle('slow');
    $('.seo-open').toggleClass('seo-close');
  }); //Обрезать отзыв и показать кнопку "Показать полностью" если отзыв имеет больше 300 символов

  $('.review-item').each(function () {
    var reviewBtn = $(this).find('.review-item__btn');
    var reviewInfo = $(this).find('.review-item__info');

    if (reviewInfo.text().length > 300) {
      reviewInfo.addClass('review-item__info--clipped');
      reviewBtn.addClass('review-item__btn-show');
    }

    reviewBtn.click(function () {
      reviewInfo.removeClass('review-item__info--clipped');
      reviewBtn.removeClass('review-item__btn-show');
    });
  }); //Аккордион 

  $('.accordion-item__title').click(function () {
    var faqItemIcon = $(this).find('.accordion-item__icon');

    if (faqItemIcon.hasClass('accordion-item__icon--active')) {
      faqItemIcon.removeClass('accordion-item__icon--active');
    } else {
      faqItemIcon.addClass('accordion-item__icon--active');
    }

    $(this).parent().toggleClass('accordion-item--active');
  }); //Хлебные крошки на мобиле

  if ($(window).width() < 580) {
    $("ul.breadcrumbs").ready(function () {
      var maxNum = 3;
      var i = 0;
      $("ul.breadcrumbs li.breadcrumbs-item").each(function () {
        i += 1;

        if (i > maxNum) {
          $(this).addClass("hide");
        }

        if (i >= maxNum) {
          $('.breadcrumbs__item--active').addClass("hide");
        }
      });
    });
  } //Кнопка "Наверх"


  (function () {
    $(document).on('scroll', function () {
      if ($(document).scrollTop() > 400) {
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
  })(); //Инициализация библиотеки с анимациями (AOS)


  AOS.init({
    disable: 'mobile'
  }); //Инициализация библиотеки с анимациями (Enllax)

  if (window.screen.width >= 992) {
    $(window).enllax();
  }
});