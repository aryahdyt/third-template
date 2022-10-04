


let is_play = false;

let dummysay = [
  {name: 'Arya', say: 'Temanku ini sudah punya gandengan, aku masih betah dalam kejombloan. Selamat menikah, teman. Aku pasti segera menyusulmu! 🥰😘🥰😘', date: '2022-09-06T21:41:13+07:00'},
  {name: 'ayra', say: '❤️❤️ Doa terbaik untuk kamu dan pasangan, semoga samawa ’till jannah dan membangun keluarga sesuai syariat Al-Qur’an dan hadis. ❤️❤️', date: '2022-01-06T21:41:13+07:00'},
]

$(document).on('click', '.btn-open', function () {
  // console.log('cliked');
  play_music();

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
    <div class="media-left"><figure class="image is-48x48 rounded">
    <img class="is-rounded" src="https://robohash.org/{ava}" alt="Placeholder image">
    </figure></div>
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
// $(document).ready(function($) {
//   $(".preloader-wrapper").fadeOut();
//   $("body").removeClass("preloader-site");

// });
// $(window).load(function() {
//   var Body = $("body");
//   Body.addClass("preloader-site");
// });
