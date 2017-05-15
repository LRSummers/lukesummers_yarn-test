
// mobile detection
var isMobile = navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad|android|blackberry|opera mini|iemobile|kindle|silk|mobile)/);


function supportsMatchMedia() {
	return (typeof window.matchMedia != "undefined" || typeof window.msMatchMedia != "undefined");
}

$(window).load(function () {
	var topOffset = $('#header-and-nav').height();
	var stickyHeader = $('#page-nav').height();

	// sticky page nav
	if ($('#page-nav').length) {
		$('<div id="page-nav-offset"></div>').insertBefore('#page-nav');
		var stickyNavTop = $('#page-nav-offset').offset().top - topOffset;

		var stickyNav = function () {
			var scrollTop = $(window).scrollTop();
			if (scrollTop > stickyNavTop) {
				$('#page-nav').addClass('sticky-nav');
				$('.sticky-nav').css('top', topOffset);
				$('body').css('padding-top', stickyHeader);

			} else {
				$('#page-nav').removeClass('sticky-nav');
				$('#page-nav').css('top', '');
				$('body').css('padding-top', '');
			}
		};

		// Nav Items
		var checkScrollArea = function () {
			var scrollTop = $(window).scrollTop();
			$("#page-nav .nav-item").removeClass("current");
			var selectedItem;
			var pageNavHeight = $('#page-nav').outerHeight();
			$(window).resize(function () {
				pageNavHeight = $('#page-nav').outerHeight();
			});

			$('#page-nav .nav-item').each(function () {
				var anchor = $(this).find('a').attr('href');
				if (scrollTop + pageNavHeight > $(anchor).position().top) {
					selectedItem = 'a[href="' + anchor + '"]';
				} else if ($(window).scrollTop() + window.innerHeight == $(document).height()) {
					selectedItem = 'a[href="' + $('#page-nav .nav-item:last a').attr('href'); + '"]';
				}
			});

			$(selectedItem).parent().addClass('current');
		};

		var isScrolling = false;
		$(window).scroll(function () {
			stickyNav();
			isScrolling = true;
		});

		setInterval(function () {
			if (!isScrolling)
				return true;
			isScrolling = false;
			checkScrollArea();
		}, 100);

		$(window).resize(function () {
			stickyNavTop = $('#page-nav-offset').offset().top - topOffset;
			stickyNav();
		});
	}

	// smooth scrolling
	$('a[href*=#]:not([href=#])').on('click tap', function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);

			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			var offset = target.offset().top + 5 - stickyHeader;

			if (supportsMatchMedia() && window.matchMedia('(max-width: 767px)').matches)
				offset = offset().top + 5 - stickyHeader;

			if (target.length) {
				$('html,body').animate({
					scrollTop: offset
				}, 800);
				return false;
			}
		}
	});

});
