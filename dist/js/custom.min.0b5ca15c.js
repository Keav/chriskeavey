/*jslint browser: true*/
/*global $, jQuery*/
/*jslint plusplus: true */
$(document).ready(function(){"use strict";
// Pause bounce animation when href is hovered over
$("#js-anim").hover(function(){$(this).toggleClass("bounce")});
// Init Owl Carousel
var a=$("#owl-portfolio");a.owlCarousel({autoplay:!1,singleItem:!0,slideSpeed:500,rewindSpeed:500,navigation:!0,navigationText:["<span class='fa fa-chevron-circle-left'></span>","<span class='fa fa-chevron-circle-right'></span>"],pagination:!0,lazyLoad:!0,responsiveRefreshRate:200});
// Reposition owl carousel elements on windows resize
// Wait for windows resize to finish before running the subsequent functions
var b=function(){var a={};return function(b,c,d){d||(d="Don't call this twice without a uniqueId"),a[d]&&clearTimeout(a[d]),a[d]=setTimeout(b,c)}}();
// Wait for image to load then get image height and reposition elements
//$('#owl-portfolio img:first').imagesLoaded(function () {
$($("#owl-portfolio img")[0]).load(function(){var a=0,b=0,c=$("#owl-portfolio img")[0].height,d=$(".setHeight"),e=$(".owl-prev, .owl-next");for(a=0;a<d.length;a++)d[a].style.height=c+"px";for(b=0;b<e.length;b++)e[b].style.top=c/2-32+"px"}),$(window).resize(function(){b(function(){var a=0,b=0,c=$("#owl-portfolio img")[0].height,d=$(".setHeight"),e=$(".owl-prev, .owl-next");for(a=0;a<d.length;a++)d[a].style.height=c+"px";for(b=0;b<e.length;b++)e[b].style.top=c/2-32+"px"},200,"a")}),$(window).trigger("resize"),
// Collapse Bootstrap navbar when anywhere on page is clicked AND when nav links are clicked.
/*jslint unparam:true */
$("body, nav a").click(function(a){
// only do this if navigation is visible, otherwise you see jump in navigation while collapse() is called
$(".navbar-collapse").is(":visible")&&$(".navbar-toggle").is(":visible")&&($(".navbar-collapse").collapse("toggle"),$("body").removeClass("pointer"))}),$(".navbar-toggle").click(function(a){$("body").addClass("pointer")}),/*jslint unparam:false */
// Navbar fading
// Uses waypoints.js to trigger an action.
$("#js-scroll-trigger").waypoint(function(a){var b=".navbar";"down"===a?$(b).fadeIn(1e3,"swing"):$(b).fadeOut(1e3,"swing")},{offset:"0%"}),
// Utilise jQuery Easing 1.3 for internal href links
$("a[href*=#]:not([href=#])").click(function(){if(location.pathname.replace(/^\//,"")===this.pathname.replace(/^\//,"")||location.hostname===this.hostname){var a=$(this.hash);if(a=a.length?a:$("[name="+this.hash.slice(1)+"]"),a.length)return $("html,body").animate({scrollTop:a.offset().top},1e3,"easeInOutExpo"),!1}return!1}),
// Ensure page refreshes/reloads always start back at the top of the page
$(window).on("beforeunload",function(){$(window).scrollTop(0)}),$(window).unload(function(){$(window).scrollTop(0)})});