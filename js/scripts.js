function setImgCover(e) {
	e.each(function() {
		$(this).parent().css({
			'background-image': 'url("'+$(this).attr('src')+'")',
			'background-repeat': 'no-repeat',
			'background-position': 'center center',
			'background-size': 'cover'
		});
	});
}
function setImgContain(e) {
	e.each(function() {
		$(this).parent().css({
			'background-image': 'url("'+$(this).attr('src')+'")',
			'background-repeat': 'no-repeat',
			'background-position': 'center center',
			'background-size': 'contain'
		});
	});
}
function setRatio() {
	$('[data-ratio]').each(function() {
		if ( !$(this)[0].hasAttribute('data-self') ) {
			var t = $(this).find('.scale');
		} else {
			var t = $(this);
		}
		if ( !$(this)[0].hasAttribute('data-adaptive-ratio') ) {
			var r = $(this).attr('data-ratio');
		} else {
			if ( !Modernizr.mq('(max-width:759px)') ) {
				var r = $(this).attr('data-desktop-ratio');
			} else {
				var r = $(this).attr('data-mobile-ratio');
			}
		}
		t.outerHeight(t.outerWidth()*r);
	});
}
$(function() {
	setImgCover($('.img-cover'));
	setImgContain($('.img-contain'));
	$('.welcome__text p').each(function() {
		var t = $(this);
		setTimeout(function() {
			t.textillate();
		}, t.attr('data-delay'));
	});
	$('.welcome__text--icon').each(function() {
		var t = $(this);
		setTimeout(function() {
			t.addClass('is-visible');
		}, t.attr('data-delay'));
	});
	
	$('.clients__slider').slick({
		slidesToShow: 10,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		infinite: true,
		cssEase: 'ease-out',
		speed: 500,
		variableWidth: true
	});
	$('.clients__item').addClass('is-visible');
	
	$('input[type="checkbox"]').uniform();
	
	function setHeight() {
		var max = 0;
		$('.price__col.is-visible').outerHeight('auto');
		$('.price__col.is-visible').each(function() {
			var h = $(this).outerHeight(); 
			max = h > max ? h : max;
		});
		$('.price__col').outerHeight(max);
		$('.price__content').outerHeight(max);
	}
	function setStep(e,t) {
		if ( !t == 1 ) {
			$('.price__nav li span').removeClass('is-active');
		}
		$('.price__col[data-step]').removeClass('is-visible is-active');
		for ( var i=1; i<=e; i++ ) {
			$('.price__col[data-step="'+i+'"]').css({
				left: $('.price__nav li:nth-child('+i+')').position().left,
				zIndex: i
			});
			$('.price__col[data-step="'+i+'"]').addClass('is-visible');
			$('.price__nav li:nth-child('+i+') span').addClass('is-active');
		}
		for ( var i=1; i<e; i++ ) {
			$('.price__col[data-step="'+i+'"]').removeClass('is-active');
		}
		$('.price__col[data-step="'+e+'"]').addClass('is-active');
		$('.price__result').removeClass('is-active');
	}
	function showResult() {
		$('.price__col[data-step]').removeClass('is-visible is-active');
		$('.price__result').addClass('is-active');
	}
	function repeatCalc() {
		$('.price__result').removeClass('is-active');
		setStep(1,0);
		setHeight();
	}
	
	$('.price__col [data-next]').on('click', function() {
		if ( $(this).parents('.price__col').hasClass('is-active') ) {
			var current = parseInt($(this).parents('.price__col').attr('data-step'));
			var target = current+1;
			setStep(target,0);
			setHeight();
		}
	});	
	$('.price__nav span').on('click', function() {
		if ( $(this).hasClass('is-active') ) {
			setStep($(this).attr('data-go'),0);
			setHeight();
		}
	});
	$('.price__col [data-finish]').on('click', function() {
		setStep(0,0);
		showResult();
	});
	$('[data-recalc]').on('click', function() {
		repeatCalc();
	});
	$('.price__col--bg').on('click', function() {
		setStep($(this).parents('.price__col').attr('data-step'),0);
	});
	
	if ( $('.price').length ) {
		setStep(1,0);
		setHeight();
	}
	
	function startApp() {
		setRatio();
	}
	startApp();
	var lastWidth = $(window).width();
	$(window).on('resize', _.debounce(function() {
		if ( $(window).width() != lastWidth ) {
			startApp();
			lastWidth = $(window).width();
		}
	}, 100));

	$('[data-open]').on('click', function(e) {
		e.preventDefault();
		$(this).addClass('is-active');
		var t = $('[data-target="'+$(this).attr('data-open')+'"]');
		t.siblings('[data-target]').removeClass('is-opened is-active');
		$('.fade-bg').addClass('is-opened');
		t.addClass('is-opened');
		var h = $(window).scrollTop()+($(window).height()-t.outerHeight())/2;
		var diff = 30;
		if ( h < $(window).scrollTop()+(diff*2) ) {
			h = $(window).scrollTop()+diff;
		}
		t.css({
			'top': h+'px'
		}).addClass('is-active').siblings('[data-target]').removeClass('is-active');
	});
	$('[data-target] .modal--close, .fade-bg').on('click', function(e) {
		e.preventDefault();
		$('[data-target], .fade-bg').removeClass('is-opened');
		$('[data-open]').removeClass('is-active');
	});
	
	$('.zoom').fancybox({
		padding: 0
	});
});