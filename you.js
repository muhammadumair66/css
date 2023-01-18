 var player,$player,$playerWrap,$playerParent;

// 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
  function onYouTubeIframeAPIReady() {
	window.$player = $('#player'),
	window.$playerWrap = $('#player-wrap');
	window.$playerParent = $('#player-parent');
		
    window.player = new YT.Player('player', {
      height: '100%',
      width: '100%',
      videoId: jQuery('#player').attr('data-yt'),
      host: 'https://www.cartoonsvid.com',
      playerVars: {
		'enablejsapi' : 1,
      	'playsinline': 1,
      	'autoplay': 0,
      	'controls': 0,
	    'rel' : 0,
        'showinfo' : 0,
        'showsearch' : 0,
      	'mute' : 1,
      	'modestbranding' : 1,
      	'disablekb' : 1,
      	'loop' : 1,
      	'origin': window.location.href
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }

  function playClasses($el) {
        $el.addClass('playing').removeClass('paused showing');
  };

  function pauseClasses($el) {
        $el.removeClass('playing pausing').addClass('paused');
  };
  
  // 4. The API will call this function when the video player is ready.
  function onPlayerReady(event) {
	
	(function($) {
		window.$playerWrap = $('#player-wrap');
		window.$playerParent = $('#player-parent');
		window.$playerWrap.on('click', function(){

			var player = window.player,
				$me = $(this);
				
						
			if (player.getPlayerState() == 1) {
				window.$playerParent.removeClass('playing').addClass('pausing');
				
				setTimeout(function(){
			        player.pauseVideo();				
				}, 350);
		    } else {
				window.$playerParent.addClass('showing');
		        player.playVideo();		    	
		    }
		});
	})(jQuery);
  };



  // 5. The API calls this function when the player's state changes.
  //    The function indicates that when playing a video (state=1),
  //    the player should play for six seconds and then stop.
  var done = false;
  
  function onPlayerStateChange(event) {
	
	var thedata = event.data;
	//Ended
    if (thedata === 0) {
        window.player.playVideo(); 
	  	window.player.seekTo(1); 
    }
	
	// Playing
    if (thedata === 1) {
    	setTimeout(function(){
	    	playClasses(window.$playerParent);    	
    	}, 450);
    }
    
    // Paused
    if(thedata === 2) {
    	pauseClasses(window.$playerParent);
    }
  }
        
