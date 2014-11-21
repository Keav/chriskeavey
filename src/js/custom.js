/*jslint browser: true*/
/*global $, jQuery*/
/*jslint plusplus: true */

$(document).ready(function () {
    "use strict";

    // Pause bounce animation when href is hovered over
    $('#js-anim').hover(function () {
        $(this).toggleClass('bounce');
    });

    // Init Owl Carousel
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
        responsiveRefreshRate: 200
    });

    // Reposition owl carousel elements on windows resize
    // Wait for windows resize to finish before running the subsequent functions
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

    // Wait for image to load then get image height and reposition elements
    $('.item img').imagesLoaded(function () {
        var i = 0, imgHeight = $("#getHeight").height(), myElements = document.querySelectorAll(".setHeight");

        for (i = 0; i < myElements.length; i++) {
            myElements[i].style.height = imgHeight + "px";
        }

        $(window).resize(function () {
            waitForFinalEvent(function () {
                imgHeight = $("#getHeight").height();
                for (i = 0; i < myElements.length; i++) {
                    myElements[i].style.height = imgHeight + "px";
                }
            }, 200, "a");
        });
    });
    $(window).trigger('resize');

    // Wait for image to load then get image height and reposition elements
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
            }, 200, "b");
        });
    });
    $(window).trigger('resize');

    // Collapse Bootstrap navbar when anywhere on page is clicked
    /*jslint unparam:true */
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
    /*jslint unparam:false */


    // Navbar fading
    // Uses waypoints.js to trigger an action.
    // $('#js-scroll-trigger').waypoint(function (direction) {
    //     var el = '.navbar', tEnd = 'fadeOut.transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd';

    //     $(el).removeClass('fadeIn navbar-hide');
    //     $(el).toggleClass('fade-in', direction === 'down');
    //     $(el).toggleClass('fade-out', direction === 'up');

    //     $(el).on(tEnd, function () {
    //         $(el).toggleClass('navbar-hide', direction === 'up');
    //     });
    // }, {
    //     offset: '0%'
    // });

    // Navbar fading
    // Uses waypoints.js to trigger an action.
    $('#js-scroll-trigger').waypoint(function (direction) {
        var el = '.navbar';

        if (direction === 'down') {
            $(el).fadeIn(1000);
        } else {
            $(el).fadeOut(1000);
        }
    }, {
        offset: '0%'
    });

    // Utilise jQuery Easing 1.3 for internal href links
    $('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') || location.hostname === this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000, 'easeInOutExpo');
                return false;
            }
        }
    });

    // Ensure page refreshes always start back at the top of the page
    $(window).on('beforeunload', function () {
        $(window).scrollTop(0);
    });

    $(window).unload(function () {
        $(window).scrollTop(0);
    });
});
