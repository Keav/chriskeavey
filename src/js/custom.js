//	    window.onload = function() {
//	     skrollr.init({
//	      forceHeight: false,
//	      smoothScrolling: false,
//	      });
//	    }

//			if ( $("html").hasClass("no-touch") ) {
//			  $(window).stellar({
//			    hideDistantElements: false,
//			    responsive: true,
//			    horizontalScrolling: false,
//			    verticalOffset: 0
//			  });
//			}

//			$(window).load(function(){
//				$(".splash").delay(500).animate({"opacity": "1"}, 2000);
//			});

		// Uses Modernizr.js to detect touch enabled devices. This method is an indelicate solution but the best I've found so far. Agent sniffing or actual property testing resulted in inconsisstent results.
		//It then disables the CSS 'background-attachment:fixed;' property. This because fixed backgrounds don't play nicely on iOS devices when scrolling. iOS freezes all animations/transitons until the scroll is finished rather than animating them as the page scrolls.
		if ($("html").hasClass("no-touch")) {
			//alert('Desktop');
			$('.splash-background').addClass('fix-background');
			$('.divider-image-cover').addClass('fix-background');
			} else {
			//alert('Mobile')
			$('.splash-background').removeClass('fix-background');
			$('.divider-image-cover').removeClass('fix-background');
		}

	
		$('#js-anim').hover(function() {
			$(this).removeClass('bounce');
		}, function() {
			$(this).addClass('bounce');
		});

		// Initialize and setup Owl Image Carousel 
		$(document).ready(function() {

  		var owl = $("#owl-demo");

  		owl.owlCarousel({
  			autoPlay: 7000,
    		navigation : false,
    		pagination:true,
    		singleItem : true,
    		transitionStyle : "fade",
	  		});
		});

		// Collapse Bootstrap navbar when anywhere on page is clicked
		$(document).ready(function() { 

			$("body").click(function(event) {
			        // only do this if navigation is visible, otherwise you see jump in navigation while collapse() is called 
			         if ($(".navbar-collapse").is(":visible") && $(".navbar-toggle").is(":visible") ) {
			            $('.navbar-collapse').collapse('toggle');
			            $('body').removeClass('pointer');
			        }
			  });

			$(".navbar-toggle").click(function(event) {
					$('body').addClass('pointer');
				});
		});


		// Disable and Enable scrolling functions.
		// left: 37, up: 38, right: 39, down: 40,
		// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
		var keys = [37, 38, 39, 40];

		function preventDefault(e) {
		  e = e || window.event;
		  if (e.preventDefault)
		      e.preventDefault();
		  e.returnValue = false;  
		}

		function keydown(e) {
		    for (var i = keys.length; i--;) {
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
		z = 0;
		//Uses waypoints.js to trigger an action. In this case enabling mouse scrolling using enable_scroll(); function and adding/removing CSS classes.
		$('#js-scroll-trigger').waypoint(function(direction) {
			//enable_scroll();
			if (direction === 'down') {
				z = 0;
				$('.navbar').removeClass('fade-out navbar-hide');
				$('.navbar').addClass('fade-in');
			} else {
				z = 1;
				$('.navbar').removeClass('fade-in');
				$('.navbar').addClass('fade-out');
				//setTimeout(function(){$('.navbar').addClass('navbar-hide')}, 1000);
				$('.fade-out').one('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function() {
					if (z === 1) {
    					$('.navbar').addClass('navbar-hide');
					}
				});	
			}
		}, { offset: '0%' });

		// Uses waypoints.js to trigger an action. In this case disabling mouse scrolling using disable_scroll(); function and scrollTop to #ID.
		// Is triggered by hrefs whether mouse is scrolled or not!!! i.e. is triggered by SCREEN movement.
		x=0;
		$('#js-scroll-trigger').waypoint(function(direction) {
			if (!$('html, body').is(':animated') && x === 0) {
			if (direction === 'down') {
				x=1;
				disable_scroll();

			  	$('html, body').stop().animate({
	                    scrollTop: $('#anchor_feature').offset().top
	                }, 1000,'easeOutQuad');
				}
			}
			//setTimeout(function(){enable_scroll()}, 2000);
			$('html, body').one('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function() {
					if (x === 1) {
    					enable_scroll();
					}
				});
		}, { offset: '100%' });

			// Blurred image swap on scroll.
//			$(window).scroll(function() {
//				var s = $(window).scrollTop(),
//				opacityVal = (s / 400.0);
//				$('.blurred-img').css('opacity', opacityVal);
//			});

	    
	    //Easing href link functions using jquery.easing.1.3.js
	    //Vertical easing ".js-ver"
	    $(function() {
	        $('.js-ver a').bind('click',function(event){
	            var $anchor = $(this);

	            $('html, body').stop().animate({
	                scrollTop: $($anchor.attr('href')).offset().top
	            }, 1500,'easeInOutExpo');

	            event.preventDefault();
	        });
	    });

	    //Horizontal easing ".js-hor"
	    $(function() {
	        $('.js-hor a').bind('click',function(event){
	            var $anchor = $(this);

	            $('html, body').stop().animate({
	                scrollLeft: $($anchor.attr('href')).offset().left
	            }, 1500,'easeInOutExpo');

	            event.preventDefault();
	        });
	    });

	    // Ensure page refreshes always start back at the top of the page
		$(window).on('beforeunload', function() {
			//return "Are you sure to leave this page?";
    		$(window).scrollTop(0);
		});

		$(window).unload(function() {
			//alert('unload');
			$(window).scrollTop(0);
		});