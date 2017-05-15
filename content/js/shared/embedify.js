(function ($) {

	var tryEmbed = function (options) {
		$.getJSON(options.service)
			.always(function(data, textStatus, jqXHR) {
				if (jqXHR.status == 200) {
					options.complete();
				}
			});
	};
	
	tryEmbed.youtube = function (e) {
		var id = $(e).data('youtube-id');
		if (id === null) {
			return;
		}
		tryEmbed({
			service: 'http://gdata.youtube.com/feeds/videos?max-results=0&callback=?',
			complete: function() {
				$(e).html('<iframe src="http://www.youtube.com/embed/'+ id + '?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>');
			}
		});
	};

	// requires fancybox
	tryEmbed.fancyboxYoutube = function (e) {
		var id = $(e).data('youtube-id');
		if (id === null) {
			return;
		}
		var name = $(e).data('youtube-name');
		if (name === null) {
			name = 'video';
		}
		name.replace('"', '\"');

		tryEmbed({
			service: 'http://gdata.youtube.com/feeds/videos?max-results=0&callback=?',
			complete: function(options) {
				$(e).html('<a class="video-thumb fancybox-video" href="//www.youtube.com/watch?v='+ id +'" title="'+ name +'"><img src="//i1.ytimg.com/vi/'+ id +'/mqdefault.jpg" alt="'+ name +'" /></a>');
				$(window).trigger('embedifyReadyForFancybox');
			}
		});
	};
	
	$.fn.embedify = function(options) {
		return this.each(function() {
			// attempt to run tryEmbed against each item in the selector
			var e = $(this).data('embedify');
			if (e && typeof tryEmbed[e] === 'function')
				tryEmbed[e](this);
		});
	};

})(jQuery);

$(function() {

	//== embed videos with youtube.com "corporate blocking" detection
	
	// requires fancybox
	$(window).on('embedifyReadyForFancybox', function() {
		setupFancyboxVideo();
	});

	$('[data-embedify]').embedify();

});