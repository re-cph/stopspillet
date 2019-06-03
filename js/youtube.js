var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player, popupPlayer, smartPhone = false;
var wdt = window.innerWidth;

window.onresize = function(event) {
  setSize();
};

var fade = function(element) {
  var op = 0;  // initial opacity
  var timer = setInterval(function () {
    op = op + 0.05;
    element.style.opacity = op;
    element.style.filter = 'alpha(opacity=' + op * 100 + ")";
    if (op >= 1) { clearInterval(timer); }
  }, 50);
}

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  smartPhone = true;
  var videoContainer = document.getElementById('videoContainer');
  videoContainer.className += ' smartphone';
  document.getElementById('top-video').style.display = 'none';
  fade(videoContainer);
}

function setSize() {
  if (smartPhone === false) {
    var videoWidth = 1280;
    var videoHeight = 572;
    var wdt = window.innerWidth;
    var topVideo = document.getElementById('top-video');
  
    if (wdt < videoWidth*100000) {wdt = videoWidth;}
    var hgt = Math.round(wdt / videoWidth * videoHeight);
    topVideo.setAttribute('height',hgt);
  
    var cenHgt = Math.round((hgt - videoHeight) / 2);
    topVideo.style.top = -cenHgt+'px';
  }
}

function onYouTubeIframeAPIReady() {
  popupPlayer = new YT.Player('full-video', {
    events: {
      'onReady': onPlayerReadyFullVideo,
      'onStateChange': onPlayerStateChangeFullVideo
    }
  });
  if (smartPhone === false) {
    player = new YT.Player('top-video', {
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }
}
function onPlayerReady(event) {
  var topVideo = document.getElementById('top-video');
  fade(topVideo);
  event.target.mute();
  event.target.playVideo();
}

function onPlayerReadyFullVideo(event) {
  event.target.pauseVideo;
}

function onPlayerStateChange(event) {
  if (event.data === 0) { // If the video has stopped
    player.seekTo(0); // Restart (Loop) the video
  }
  setSize();
}

function onPlayerStateChangeFullVideo(event) {
  if (event.data === 0) { // If the video has stopped
    stopFullVideo(); // Stop video
  }
}

var stopFullVideo = function() {
  popupPlayer.seekTo(0); // Restart (Loop) the video
  popupPlayer.pauseVideo(); // Pause the video
  document.getElementById('video-popup').style.display = 'none'; // Hide the container
}

var openVideoPopup = function(element) {
  if (smartPhone === false) {
    document.getElementById('video-popup').style.display = 'block'; // show video container
  }
  popupPlayer.playVideo(); // start video
}

var closeVideo = function() {
  stopFullVideo(); // stop video
}