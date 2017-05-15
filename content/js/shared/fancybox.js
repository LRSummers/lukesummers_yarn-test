// @require ~/content/js/_libs/jquery.fancybox/jquery.fancybox-2.1.5.js

//== fancybox video
function setupFancyboxVideo() {

	$('.fancybox-video').off('click tap');

	if (isMobile && window.matchMedia('(max-width: 600px)').matches) {
		$('.fancybox-video').on('click tap', function() {
			window.open($(this).attr('href'));
			return false;
		});
	} else {
		$('.fancybox-video').attr('href', function() { return 'http://www.youtube.com/embed/' + youtube_parser($(this).attr('href')) + '?wmode=transparent&rel=0&autoplay=1'; }).fancybox({
			padding: 0,
			type: 'iframe',
			aspectRatio: true
		});
	}

}

$(function() {

	//== embed fancybox videos
	setupFancyboxVideo();

});