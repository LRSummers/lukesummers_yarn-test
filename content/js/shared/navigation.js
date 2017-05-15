// @require ~/content/js/_libs/jquery.hoverIntent/jquery.hoverIntent-r7.js";

$(function() {

	//== toggle mobile navigation
	if ($('#nav-toggle').data('toggle') == 'collapse') {
		$('#nav-toggle').on('click tap', function() {
			$($('#site-nav')).slideToggle('fast', function() {
				$(this).toggleClass('collapsed');
			});
		});
	} else if ($('#nav-toggle').data('toggle') == 'off-canvas') {
		$('#nav-toggle').on('click tap', function() {
			$('html').addClass('mobile-nav-visible');
		});
		$('body').append('<div id="mobile-nav-close"></div>');
		$('#mobile-nav-close').on('click tap touchmove', function() {
			$('html').removeClass('mobile-nav-visible');
		});
	} else if ($('#nav-toggle').data('toggle') == 'footer') {
		$('#nav-toggle').on('click tap', function() {
			$('html, body').animate({
				scrollTop: $("#mobile-nav").offset().top
			}, 500);
		});
	}

	//== toggle mobile search
	$('#search-toggle').on('click tap', function() {
		$('#site-header .search-bar').toggleClass('active');
	});

	//== navigation dropdown menu functionality
	$('.mobile .dropdown-toggle').each(function() {
		$(this).attr('data-toggle', 'click');
	});

	if ($.fn.hoverIntent) {
		$('.dropdown-toggle[data-toggle="hover"]').parent().hoverIntent(
			function() {
				$(this).addClass('active');
			},
			function() {
				$(this).removeClass('active');
			}
		);
	} else {
		$('.dropdown-toggle[data-toggle="hover"]').parent().hover(
			function() {
				$(this).addClass('active');
			},
			function() {
				$(this).removeClass('active');
			}
		);
	}

	$('.dropdown-toggle[data-toggle="click"]').on('click tap', function(e) {
		if (!$(this).parent().hasClass('active')) {
			e.preventDefault();
			$(this).parent().toggleClass('active');
		}
	});

	//== hide the menu if the user clicks outside of the dropdown area
	$('#container').on('click tap', function(e) {
		if($(e.target).parents().index($('.nav')) == -1) {
			$('.nav-item').removeClass('active');
		}
	});

});