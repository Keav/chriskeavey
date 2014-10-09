/*jslint browser: true*/
/*global $, jQuery*/
/*jslint plusplus: true */

"use strict";

// Uses Modernizr.js to detect touch enabled devices. This method is an indelicate solution but the best I've found so far. Agent sniffing or actual property testing resulted in inconsisstent results.
//It then disables the CSS 'background-attachment:fixed;' property. This because fixed backgrounds don't play nicely on iOS devices when scrolling. iOS freezes all animations/transitons until the scroll is finished rather than animating them as the page scrolls.
if ($("html").hasClass("no-touch")) {
    //alert('Desktop');
    $('.splash-background').addClass('fix-background');
    $('.divider-image-cover').addClass('fix-background');
    $('html,body').addClass('fix-background');
} else {
    //alert('Mobile')
    $('.splash-background').removeClass('fix-background');
    $('.divider-image-cover').removeClass('fix-background');
    $('html,body').removeClass('fix-background');
}

$('#js-anim').hover(function () {
    $(this).removeClass('bounce');
}, function () {
    $(this).addClass('bounce');
});

$(document).ready(function () {

    var owl = $("#owl-portfolio");

    owl.owlCarousel({
        autoplay: false,
        singleItem: true,
        slideSpeed: 500,
        rewindSpeed: 500,
        navigation: true,
        navigationText: [
            "<span class='fa fa-chevron-circle-left'></span>",
            "<span class='fa fa-chevron-circle-right'></span>"
        ],
        pagination: true,
        lazyLoad: true,
        responsiveRefreshRate: 200,
    });
});

var waitForFinalEvent = (function () {
    var timers = {};
    return function (callback, ms, uniqueId) {
        if (!uniqueId) {
            uniqueId = "Don't call this twice without a uniqueId";
        }
        if (timers[uniqueId]) {
            clearTimeout(timers[uniqueId]);
        }
        timers[uniqueId] = setTimeout(callback, ms);
    };
}());

$(document).ready(function () {
    var i = 0, imgHeight = $("#getHeight").height(), myElements = document.querySelectorAll(".owl-prev, .owl-next");

    for (i = 0; i < myElements.length; i++) {
        myElements[i].style.top = imgHeight / 2 - 32 + "px";
    }

    $(window).resize(function () {
        waitForFinalEvent(function () {
            imgHeight = $("#getHeight").height();
            for (i = 0; i < myElements.length; i++) {
                myElements[i].style.top = imgHeight / 2 - 32 + "px";
            }
        }, 200, "un");
    });
});
$(window).trigger('resize');


$(document).ready(function () {
    var i = 0, imgHeight = $("#getHeight").height(), myElements = document.querySelectorAll("#setHeight");

    for (i = 0; i < myElements.length; i++) {
        myElements[i].style.height = imgHeight + "px";
    }

    $(window).resize(function () {
        waitForFinalEvent(function () {
            imgHeight = $("#getHeight").height();
            for (i = 0; i < myElements.length; i++) {
                myElements[i].style.height = imgHeight + "px";
            }
        }, 200, "uni");
    });
});
$(window).trigger('resize');


// Collapse Bootstrap navbar when anywhere on page is clicked
/*jslint unparam:true */
$(document).ready(function () {
    $("body").click(function (event) {
        // only do this if navigation is visible, otherwise you see jump in navigation while collapse() is called 
        if ($(".navbar-collapse").is(":visible") && $(".navbar-toggle").is(":visible")) {
            $('.navbar-collapse').collapse('toggle');
            $('body').removeClass('pointer');
        }
    });

    $(".navbar-toggle").click(function (event) {
        $('body').addClass('pointer');
    });
});
/*jslint unparam:false */


// Disable and Enable scrolling functions.
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = [37, 38, 39, 40];

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault) {
        e.preventDefault();
        e.returnValue = false;
    }
}

function keydown(e) {
    var i = 0;
    for (i = keys.length; i--;) {
        if (e.keyCode === keys[i]) {
            preventDefault(e);
            return;
        }
    }
}

function wheel(e) {
    preventDefault(e);
}

function disable_scroll() {
    var keydown = 0;
    if (window.addEventListener) {
        window.addEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = wheel;
    document.onkeydown = keydown;
}

function enable_scroll() {
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;
}


// Navbar fading
//Uses waypoints.js to trigger an action. In this case enabling mouse scrolling using enable_scroll(); function and adding/removing CSS classes.
var z = 0;
$('#js-scroll-trigger').waypoint(function (direction) {
    if (direction === 'down') {
        z = 0;
        $('.navbar').removeClass('fade-out navbar-hide');
        $('.navbar').addClass('fade-in');
    } else {
        z = 1;
        $('.navbar').removeClass('fade-in');
        $('.navbar').addClass('fade-out');
        $('nav').one('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function () {
            if (z === 1) {
                $('.navbar').addClass('navbar-hide');
            }
        });
    }
}, {
    offset: '0%'
});

// Uses waypoints.js to trigger an action. In this case disabling mouse scrolling using disable_scroll(); function and scrollTop to #ID.
// Is triggered by hrefs whether mouse is scrolled or not!!! i.e. is triggered by SCREEN movement.
var x = 0;
$('#js-scroll-trigger').waypoint(function (direction) {
    if (!$('html, body').is(':animated') && x === 0) {
        if (direction === 'down') {
            disable_scroll();
            x = 1;

            $('html, body').stop().animate({
                scrollTop: $('#anchor-portfolio').offset().top
            }, 1000, 'easeOutQuad');
        }
    }
    $('html, body').one('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function () {
        if (x === 1) {
            enable_scroll();
        }
    });
}, {
    offset: '100%'
});

//Easing href link functions using jquery.easing.1.3.js
//Vertical easing ".js-ver"
$(function () {
    $('.js-ver a').bind('click', function (event) {
        var $anchor = $(this);

        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');

        event.preventDefault();
    });
});

//Horizontal easing ".js-hor"
$(function () {
    $('.js-hor a').bind('click', function (event) {
        var $anchor = $(this);

        $('html, body').stop().animate({
            scrollLeft: $($anchor.attr('href')).offset().left
        }, 1500, 'easeInOutExpo');

        event.preventDefault();
    });
});

// Ensure page refreshes always start back at the top of the page
$(window).on('beforeunload', function () {
    $(window).scrollTop(0);
});

$(window).unload(function () {
    $(window).scrollTop(0);
});
