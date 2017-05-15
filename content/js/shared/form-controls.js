// @require ~/content/js/_libs/jquery.validate/jquery.validate-1.12.0.js";
// @require ~/content/js/_libs/jquery.validate/jquery.validate.unobtrusive.js";
// @require ~/content/js/_libs/jquery.maskedinput/jquery.maskedinput-1.3.1.js";

//== textarea limiter/counter
$.fn.extend({
	limiter: function(limit, elem) {
		$(this).on('keyup focus', function() {
			setCount(this, elem);
		});
		function setCount(src, elem) {
			if (src === undefined) {
				return;
			}
			var chars = src.value.length;
			if (chars > limit) {
				src.value = src.value.substr(0, limit);
				chars = limit;
			}
			elem.html( limit - chars );
			if (chars === limit) {
				elem.parent().addClass('error');
			} else {
				elem.parent().removeClass('error');
			}
		}
		setCount($(this)[0], elem);
	}
});

//== add required field markers to labels
function addRequiredFieldMarker() {
	$('input').each(function () {
		var req = $(this).attr('required');
		var dataReq = $(this).attr('data-val-required');
		if (dataReq !== undefined || req == "required") {
			var label = $('label[for="' + $(this).attr('id') + '"]');
			var text = label.text();
			if (text.length > 0 && !label.find('.required-field-marker').length) {
				label.prepend('<span class="required-field-marker">&#42;</span>&#32;');
			}
		}
	});
}

$(function() {
	
	//== character limiter/counter
	$('.char-limiter').each(function() {
		$target = $(this).find('textarea');
		$elem = $(this).find('.char-count');
		$target.limiter($target.attr('maxlength'), $elem);
	});

	//== date picker (requires jQuery UI 1.10.4)
	if ((Modernizr.touch && Modernizr.inputtypes.date) || !$.fn.datepicker) {
		$('.datepicker').prop('type', 'date');
		$('.datepicker-trigger').hide();
	} else {
		if ($.fn.datepicker) {
			$('.datepicker').datepicker({
				inline: true,
				nextText: '&rarr;',
				prevText: '&larr;',
				showOtherMonths: true,
				dateFormat: 'mm/dd/yy'
			});
			$('.datepicker-trigger').on('click tap', function () {
				$(this).parent().find('input').datepicker('show');
			});
		}
	}

	//== mask inputs
	if ($.fn.mask) {
		if (!isMobile) { $('input[type="tel"]').mask('(999) 999-9999'); }
		$('.form-group-zip input').mask('99999', { placeholder:'' });
	}

	//== add required field markers to labels
	addRequiredFieldMarker();
 
	//== add error message to bottom of form if errors exist
	if ($.fn.validate) {
		var settings = $.data($('form')[0], 'validator').settings;
		$('form').bind('invalid-form.validate', function (form,validator) {
			var errors = validator.numberOfInvalids();
			var message = '';

			if (errors === 1)
				message = 'Errors in 1 field have occurred. Please resolve the issue above.';
			else
				message = 'Errors in ' + errors + ' fields have occurred. Please resolve the issues above.';

			$(".form-validation-error p").html(message);
			$(".form-validation-error").show();
		});
	}

	//== make field-validation-error messages act like labels
	$('[class^="field-validation-"]').on('click tap', function () {
		$('[name=' + $(this).data('valmsg-for') + ']').focus();
	});

});