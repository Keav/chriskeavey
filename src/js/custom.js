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
    //$('#owl-portfolio img:first').imagesLoaded(function () {
    $($('#owl-portfolio img')[0]).load(function () {

        var i = 0,
            c = 0,
            imgHeight = $('#owl-portfolio img')[0].height,
            myElements = $('.setHeight'),
            myElements2 = $(".owl-prev, .owl-next");

        for (i = 0; i < myElements.length; i++) {
            myElements[i].style.height = imgHeight + "px";
        }

        for (c = 0; c < myElements2.length; c++) {
            myElements2[c].style.top = imgHeight / 2 - 32 + "px";
        }
    });

    $(window).resize(function () {
        waitForFinalEvent(function () {

            var i = 0,
                c = 0,
                imgHeight = $('#owl-portfolio img')[0].height,
                myElements = $('.setHeight'),
                myElements2 = $(".owl-prev, .owl-next");

            for (i = 0; i < myElements.length; i++) {
                myElements[i].style.height = imgHeight + "px";
            }

            for (c = 0; c < myElements2.length; c++) {
                myElements2[c].style.top = imgHeight / 2 - 32 + "px";
            }
        }, 200, "a");
    });
    $(window).trigger('resize');

    // Collapse Bootstrap navbar when anywhere on page is clicked AND when nav links are clicked.
    /*jslint unparam:true */
    $("body, nav a").click(function (event) {
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
    $('#js-scroll-trigger').waypoint(function (direction) {
        var el = '.navbar';

        if (direction === 'down') {
            $(el).fadeIn(1000, 'swing');
        } else {
            $(el).fadeOut(1000, 'swing');
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
        return false;
    });

    // Ensure page refreshes/reloads always start back at the top of the page
    $(window).on('beforeunload', function () {
        $(window).scrollTop(0);
    });

    $(window).unload(function () {
        $(window).scrollTop(0);
    });
});
