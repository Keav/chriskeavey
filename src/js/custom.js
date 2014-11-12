/*jslint browser: true*/
/*global $, jQuery*/
/*jslint plusplus: true */

"use strict";

$(document).ready(function () {
    $('#js-anim').hover(function () {
        $(this).removeClass('bounce');
    }, function () {
        $(this).addClass('bounce');
    });
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


$('.item img').imagesLoaded(function () {
//$('.item img').load(function () {
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
        }, 200, "");
    });
});
$(window).trigger('resize');

$('.item img').imagesLoaded(function () {
//$('.item img').load(function () {
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
        }, 200, "");
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
// var keys = [37, 38, 39, 40];

// function preventDefault(e) {
//     e = e || window.event;
//     if (e.preventDefault) {
//         e.preventDefault();
//         e.returnValue = false;
//     }
// }

// function keydown(e) {
//     var i = 0;
//     for (i = keys.length; i--;) {
//         if (e.keyCode === keys[i]) {
//             preventDefault(e);
//             return;
//         }
//     }
// }

// function wheel(e) {
//     preventDefault(e);
// }

// function disable_scroll() {
//     var keydown = 0;
//     if (window.addEventListener) {
//         window.addEventListener('DOMMouseScroll', wheel, false);
//     }
//     window.onmousewheel = document.onmousewheel = wheel;
//     document.onkeydown = keydown;
// }

// function enable_scroll() {
//     if (window.removeEventListener) {
//         window.removeEventListener('DOMMouseScroll', wheel, false);
//     }
//     window.onmousewheel = document.onmousewheel = document.onkeydown = null;
// }


$(document).ready(function () {
// Navbar fading
//Uses waypoints.js to trigger an action. In this case enabling mouse scrolling using enable_scroll(); function and adding/removing CSS classes.
    var z = 0;
    $('#js-scroll-trigger').waypoint(function (direction) {
        var el = '.navbar', tEnd = 'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd';
        if (direction === 'down') {

            $(el).removeClass('fade-out navbar-hide');
            $(el).addClass('fade-in');
            z = 0;

        } else {

            $(el).removeClass('fade-in');
            $(el).addClass('fade-out');
            z = 1;

            $(el).on(tEnd, function () {
                if (z === 1) {
                    $(el).addClass('navbar-hide');
                    z = 0;
                    $(el).off(tEnd);
                }
            });
        }
    }, {
        offset: '0%'
    });
});

// $(document).ready(function () {
// //Uses waypoints.js to trigger an action. In this case disabling mouse scrolling using disable_scroll(); function and scrollTop to #ID.
// //Is triggered by hrefs whether mouse is scrolled or not!!! i.e. is triggered by SCREEN movement.
//     var x = 0, tEnd = 'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd';
//     $('#js-scroll-trigger').waypoint(function (direction) {
//         if (!$('html, body').is(':animated') && (direction === 'down') && x === 0) {
//             disable_scroll();
//             x = 1;

//             $('html, body').stop().animate({
//                 scrollTop: $('#anchor-portfolio').offset().top
//             }, 1000, 'easeOutQuad');
//         }

//         if (x === 1) {
//             // Using 'body' instead of '.navbar' fires for all occuring transitions i.e. fires multiple times.
//             // Perhaps detect position of page rather than transitions?
//             $('.navbar').on(tEnd, function () {
//                 enable_scroll();
//                 x = 2;
//                 $('.navbar').off(tEnd);
//             });
//         }
//     }, {offset: '100%'});
// });


$(document).ready(function () {
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
});

$(document).ready(function () {
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
});

// Ensure page refreshes always start back at the top of the page
$(window).on('beforeunload', function () {
    $(window).scrollTop(0);
});

$(window).unload(function () {
    $(window).scrollTop(0);
});
