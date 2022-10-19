


let is_play = false;

let dummysay = [
  {name: 'Arya', say: 'Temanku ini sudah punya gandengan, aku masih betah dalam kejombloan. Selamat menikah, teman. Aku pasti segera menyusulmu! 🥰😘🥰😘', date: '2022-09-06T21:41:13+07:00'},
  {name: 'ayra', say: '❤️❤️ Doa terbaik untuk kamu dan pasangan, semoga samawa ’till jannah dan membangun keluarga sesuai syariat Al-Qur’an dan hadis. ❤️❤️', date: '2022-01-06T21:41:13+07:00'},
]

$(document).on('click', '.btn-open', function () {
  // console.log('cliked');
  play_music();

  // play video
  // var video = document.getElementsByClassName("videot")[0];
  // video.play();
  // startPlayback();

  document.getElementById('btnMusic').classList.remove('is-hidden');
  document.getElementById('toTop').classList.remove('is-hidden');

  const landing = document.querySelector('.main-content');
  landing.classList.remove('is-hidden');
  landing.classList.add('animate__animated', 'animate__zoomIn');

  // landing.addEventListener('animationend', () => {
    const init = document.querySelector('.initial-view');
    init.style.setProperty('--animate-duration', '.5s');
    init.classList.add('animate__animated', 'animate__zoomOut', 'is-hidden');
    
    function handleAnimationEnd(event) {
      $("html, body").animate({ scrollTop: 0 }, 1000);
      event.stopPropagation();
      landing.classList.remove('animate__animated', 'animate__zoomIn');
      // resolve('Animation ended');
      AOS.refresh();
    }
  
    landing.addEventListener('animationend', handleAnimationEnd, {once: true});

});

function getsays() {
  let parent = $('.parent-say');
  parent.empty();

  let div = `<div class="box"><div class="media">
    <div class="media-content"><div class="is-size-6 has-text-weight-semibold">{name}</div>
    <small>{date}</small><div class="is-size-6 has-text-weight-normal">
    {say}<br></div></div></div></div>`;
  
  $.each(dummysay, function(i, val){
    let append = div.replace('{name}', val.name)
    .replace('{ava}', val.name)
    .replace('{date}', moment(val.date).fromNow())
    .replace('{say}', val.say);

    parent.append(append);
  });
}

$(document).on('submit', '#form-say', function(e){
  
  e.preventDefault();
  // let data = new FormData(this);
  let data = $(this).serializeObject();
  data.date = moment().format();   

  dummysay.unshift(data);
  
  getsays();

  $(this)[0].reset();
  console.log(dummysay);
});
// });

// Get that hamburger menu cookin' //
document.addEventListener("DOMContentLoaded", function() {
  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );
  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(function($el) {
      $el.addEventListener("click", function() {
        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);
        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }

  getCountdown();getsays();
});

function getCountdown(){
  console.log('cdo');
  var now = new Date();
  var day = now.getDate();
  var month = now.getMonth() + 1;
  var year = now.getFullYear() + 1;

  var nextyear = month + '/' + day + '/' + year + ' 07:07:07';
  var harih = '3/18/2023 17:00:00';

  $('.hero-countdown').countdown({
    date: harih, // TODO Date format: 07/27/2017 17:00:00
    offset: +7, // TODO Your Timezone Offset
    day: 'Hari',
    days: 'Hari'
  }, function () {
    // alert('Done!');
  });
}

$(document).on('click', '#btnMusic', function(){
  console.log(is_play);
  if (is_play) {
    pause_music();
    $(this).find('.icon').removeClass('fa-music').addClass('fa-pause');
  } else {
    play_music();
    $(this).find('.icon').removeClass('fa-pause').addClass('fa-music');
  }
});

function play_music(){
  document.getElementById("my_audio").play();
  is_play = true;
}

function pause_music(){
  document.getElementById("my_audio").pause();
  is_play = false;
}

$(document).on('click','#toTop',function() {
  $("html, body").animate({ scrollTop: 0 }, 500);
});

$(document).on('click', '.copied', function(){
  copyToClipboard('.no-rek');
});

function copyToClipboard(selector_text){
  console.time('time1');
	var temp = $("<input>");
  $("body").append(temp);
  temp.val($(selector_text).text()).select();
  document.execCommand("copy");
  temp.remove();
  console.timeEnd('time1');
}


// When the user scrolls down 20px from the top of the document, show the scroll up button
window.onscroll = function() {
  scrollFunction();
};

// function onScrollHandle() {
//   //Navbar shrink when scroll down
//   $(".navbar-mobile").toggleClass("navbar-shrink", $(this).scrollTop() > 50);

//   //Get current scroll position
//   var currentScrollPos = $(document).scrollTop();

//   //Iterate through all node
//   $('.navbar-mobile > a').each(function () {
//       var curLink = $(this);
//       var refElem = $(curLink.attr('href'));
//       //Compare the value of current position and the every section position in each scroll
//       if (refElem.position().top <= currentScrollPos && refElem.position().top + refElem.height() > currentScrollPos) {
//           //Remove class active in all nav
//           $('.navbar-mobile > a').removeClass("active");
//           //Add class active
//           curLink.addClass("active");
//       }
//       else {
//           curLink.removeClass("active");
//       }
//   });
// }

function scrollFunction() {
  if (window.scrollY > (window.outerHeight + (window.outerHeight/2))) {
    document.getElementById("toTop").style.display = "flex";
  } else {
    document.getElementById("toTop").style.display = "none";
  }
  
  //Iterate through all node
  $('.navbar-mobile > a').each(function () {
    var top = $(window).scrollTop();
      var curLink = $(this);

    const topel = $(curLink.attr('href')).offset().top;

    // if (topel <= top && topel + $(curLink.attr('href')).height() > top) {
    if (topel <= top) {
      //Remove class active in all nav
      $('.navbar-mobile > a').removeClass("active");
      //Add class active
      curLink.addClass("active");
    }
    else {
      curLink.removeClass("active");
    }
    console.log(topel, top);


      // if (refElem ) {
      //     //Remove class active in all nav
      //     $('.navbar-mobile > a').removeClass("active");
      //     //Add class active
      //     curLink.addClass("active");
      // }
      // if (refElem.position().top <= currentScrollPos && refElem.position().top + refElem.height() > currentScrollPos) {
      //     //Remove class active in all nav
      //     $('.navbar-mobile > a').removeClass("active");
      //     //Add class active
      //     curLink.addClass("active");
      // }
      // else {
      //     curLink.removeClass("active");
      // }
  });
}

$(document).on('click', 'a[href^="#"]', function (event) {
  event.preventDefault();
  // add class active
  $('.navbar-mobile > a').removeClass("active");
  $(this).addClass("active");

  $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top
  }, 500);
});

$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

// Preloader
$(document).ready(function($) {
  $(".preloader-wrapper").fadeOut();
  $("body").removeClass("preloader-site");

  var video = document.querySelector('video');
  enableInlineVideo(video);

});

$(window).load(function() {
  var Body = $("body");
  Body.addClass("preloader-site");
});

// var player, iframe;
// var $ = document.querySelector.bind(document);

// // init player
// function onYouTubeIframeAPIReady() {
//   player = new YT.Player('player', {
//     height: '200',
//     width: '300',
//     videoId: 'dQw4w9WgXcQ',
//     events: {
//       'onReady': onPlayerReady
//     }
//   });
// }

// // when ready, wait for clicks
// function onPlayerReady(event) {
//   var player = event.target;
//   iframe = $('#player');
//   setupListener(); 
// }

// function setupListener (){
// $('button').addEventListener('click', playFullscreen);
// }

// function playFullscreen (){
//   player.playVideo();//won't work on mobile
  
//   var requestFullScreen = iframe.requestFullScreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullScreen;
//   if (requestFullScreen) {
//     requestFullScreen.bind(iframe)();
//   }
// }


var video;
var canvas;

function startPlayback()
{
  if (!video) {
    video = document.createElement('video');
    video.src = './image/dummyvideo.mp4';
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.playsinline = true;
    video.addEventListener('playing', paintVideo);
  }
  video.play();
}

function paintVideo()
{
  if (!canvas) {
    canvas = document.createElement('canvas');
    parent = document.getElementById('parent-video');
    canvas.classList.add("videot");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    parent.appendChild(canvas);
  }
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
  if (!video.paused)
    requestAnimationFrame(paintVideo);
}

// function onYouTubeIframeAPIReady() {
//   var player;
//   player = new YT.Player('muteYouTubeVideoPlayer', {
//     videoId: 'fXN-m49MHO0', // YouTube Video ID
//     width: 560,               // Player width (in px)
//     height: 316,              // Player height (in px)
//     playerVars: {
//       autoplay: 1,        // Auto-play the video on load
//       controls: 0,        // Show pause/play buttons in player
//       showinfo: 1,        // Hide the video title
//       modestbranding: 1,  // Hide the Youtube Logo
//       loop: 1,            // Run the video in a loop
//       fs: 0,              // Hide the full screen button
//       cc_load_policy: 1, // Hide closed captions
//       iv_load_policy: 3,  // Hide the Video Annotations
//       autohide: 0,         // Hide video controls when playing
//       rel: 0,
//     },
//     events: {
//       onReady: function(e) {
//         e.target.mute();
//       }
//     }
//   });
// }


