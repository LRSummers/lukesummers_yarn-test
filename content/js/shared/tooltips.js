$(function() {

	var targets = $('[data-tooltip]'),
		target = false,
		tooltip = false,
		title = false;

	targets.on('mouseenter', function() {
		target = $(this);
		tip = target.attr('title');
		tooltip = $('<div class="tooltip"></div>');

		if (!tip || tip === '')
			return false;

		target.removeAttr('title');
		tooltip.css('opacity', 0).html(tip).appendTo('body');

		var init_tooltip = function() {

			var pos_left = target.offset().left + (target.outerWidth() / 2) - (tooltip.outerWidth() / 2),
				pos_top = target.offset().top - tooltip.outerHeight() - 20;

			if (pos_left < 0) {
				pos_left = target.offset().left + target.outerWidth() / 2 - 20;
				tooltip.addClass('tooltip-left');
			} else
				tooltip.removeClass('tooltip-left');

			if (pos_left + tooltip.outerWidth() > $(window).width()) {
				pos_left = target.offset().left - tooltip.outerWidth() + target.outerWidth() / 2 + 20;
				tooltip.addClass('tooltip-right');
			}
			else
				tooltip.removeClass('tooltip-right');

			if (pos_top < 0) {
				pos_top = target.offset().top + target.outerHeight();
				tooltip.addClass('tooltip-top');
			} else
				tooltip.removeClass('tooltip-top');

			tooltip.css({
				left: pos_left,
				top: pos_top
			}).animate({
				top: '+=10',
				opacity: 1
			}, 150);
		};

		init_tooltip();
		$(window).resize(init_tooltip);

		var remove_tooltip = function() {
			tooltip.animate({
				top: '-=10',
				opacity: 0
			}, 150, function() {
				$(this).remove();
			});

			target.attr('title', tip);
		};

		target.on('mouseleave', remove_tooltip);
		tooltip.on('click', remove_tooltip);
	});

});