let readyState;

window.document.addEventListener("readystatechange", function(){		
	if(document.readyState == "complete") readyState = "complete"	
}, false);


(function() {

	var support = { animations : Modernizr.cssanimations },
		container = document.getElementById( 'ip-container' ),
		header = container.querySelector( 'header.ip-header' ),
		loader = new PathLoader( document.getElementById( 'ip-loader-circle' ) ),
		bottleFill = document.querySelectorAll('#bottle-gradient stop'),
		logo = document.querySelector('.ip-logo'),
		animEndEventNames = { 'WebkitAnimation' : 'webkitAnimationEnd', 'OAnimation' : 'oAnimationEnd', 'msAnimation' : 'MSAnimationEnd', 'animation' : 'animationend' },
		// animation end event name
		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];

	function init() {
		var onEndInitialAnimation = function() {
			if( support.animations ) {
				this.removeEventListener( animEndEventName, onEndInitialAnimation );
			}

			startLoading();
		};

		// disable scrolling
		window.addEventListener( 'scroll', noscroll );

		// initial animation
		classie.add( container, 'loading' );

		if( support.animations ) {
			container.addEventListener( animEndEventName, onEndInitialAnimation );
		}
		else {
			onEndInitialAnimation();
		}
	}

	function startLoading() {
		// simulate loading something..
		var simulationFn = function(instance) {
			var progress = 0;
				// interval = setInterval( function() {
				// 	progress = Math.min( progress + Math.random() * 0.1, 0.9 );

				// 	console.log(progress);

				// 	console.log(readyState);

				// 	instance.setProgress( progress );

				// 	bottleFill[0].setAttribute('offset', progress)
				// 	bottleFill[1].setAttribute('offset', progress + 0.1)

						
				// 	// reached the end						
				// 	if( progress === 0.9 ) {

				// 		var onEndHeaderAnimation = function(ev) {
				// 			if( support.animations ) {
				// 				if( ev.target !== header ) return;
				// 				this.removeEventListener( animEndEventName, onEndHeaderAnimation );
				// 			}

				// 			classie.add( document.body, 'layout-switch' );
							
				// 		};

				// 		if( support.animations ) {
				// 			header.addEventListener( animEndEventName, onEndHeaderAnimation );
				// 		}
				// 		else {
				// 			onEndHeaderAnimation();
				// 		}					
				// 	}	

				// 	if(readyState == 'complete'){
				// 		window.removeEventListener( 'scroll', noscroll );
				// 		console.log('loading ' + document.readyState);
				// 		clearInterval( interval );
				// 		instance.setProgress( 1 );
				// 		bottleFill[0].setAttribute('offset', '0.9')
				// 		bottleFill[1].setAttribute('offset', '1')
				// 		setTimeout(() => {
				// 			classie.remove( container, 'loading' );
				// 			classie.add( container, 'loaded' );
				// 			setTimeout(() => {
				// 				logo.style.display = 'none'
				// 			}, 550);
				// 			setTimeout(() => {
				// 				header.style.display = 'none'
				// 			}, 1100);
				// 		}, 500);
				// 	}
				// }, 80 );	
				
				(function updateProgress(){
					let animationInterval = 33

					if(readyState == 'complete'){
						window.removeEventListener( 'scroll', noscroll );
						console.log('loading ' + document.readyState);
						bottleFill[0].setAttribute('offset', '0.9')
						bottleFill[1].setAttribute('offset', '1')
						setTimeout(() => {
							classie.remove( container, 'loading' );
							classie.add( container, 'loaded' );
							setTimeout(() => {
								logo.style.display = 'none'
							}, 550);
							setTimeout(() => {
								header.style.display = 'none'
							}, 1100);
						}, 500);
					}
					else {				   
						progress += 0.01;
						if(progress >= 0 && progress <= 0.3){
							animationInterval *= 3;
							bottleFill[0].setAttribute('offset', progress)
							bottleFill[1].setAttribute('offset', progress + 0.1)
						}
						else if(progress > 0.3 && progress <= 0.6){
							animationInterval *= 4;
							bottleFill[0].setAttribute('offset', progress)
							bottleFill[1].setAttribute('offset', progress + 0.1)
						}
						else if(progress > 0.6 && progress <= 0.8){
							animationInterval *= 8;
							bottleFill[0].setAttribute('offset', progress)
							bottleFill[1].setAttribute('offset', progress + 0.1)
						}
						else if(progress > 0.8 && progress < 0.9){
							animationInterval *= 12;
							bottleFill[0].setAttribute('offset', progress)
							bottleFill[1].setAttribute('offset', progress + 0.1)
						}
						else if(progress >= 0.9){
							bottleFill[0].setAttribute('offset', '0.89')
							bottleFill[1].setAttribute('offset', '0.99')
						}
						setTimeout(updateProgress, animationInterval);    
					}
				})()

		};

		loader.setProgressFn( simulationFn );

		
	}
	
	function noscroll() {
		window.scrollTo( 0, 0 );
	}

	init();

	

})();

