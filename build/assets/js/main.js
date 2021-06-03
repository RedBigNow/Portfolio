"use strict";

//Подстроить высоту фоновых линий под высоту всего контента
$(window).on('load resize', function () {
  var heightWrapper = document.querySelector(".wrapper").offsetHeight;
  document.querySelector(".bg-line").style.height = heightWrapper + "px";
});
$(document).ready(function () {});