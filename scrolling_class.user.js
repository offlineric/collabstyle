// ==UserScript==
// @name        testicles
// @namespace   eric
// @description be awesome
// @include     https://boards.4chan.org/*
// @include     http://boards.4chan.org/*
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_openInTab
// @grant          GM_xmlhttpRequest
// @grant          GM_addStyle
// @version     1
// @require    http://codeorigin.jquery.com/jquery.min.js
// @require    http://codeorigin.jquery.com/ui/1.10.3/jquery-ui.min.js
// ==/UserScript==

function init() {
  $('link[rel=stylesheet]').remove();
  win = $(window);
  oldCount = 0;
  header = $("#header-bar");
  $modules = $('.postContainer, .summary, .pagelist');
  dragMeKillMe = $('.postContainer');
  previousTop = 0	

  dragToKill();
  seeModules();
  tripClasses();
};

function inViewport (el, htmlClientHeight) {
  var r;
  if ( !el || 1 !== el.nodeType ) { return false; }
    r = el.getBoundingClientRect();
    return ( !!r 
      && r.bottom >= 0 
      && r.top - 10 <= htmlClientHeight 
  );
};


function seeModules () {
var html = document.documentElement;
var hch =  html.clientHeight;
 $modules.each(function(i, el) {
  var $el = $modules.eq(i);
  if (inViewport(el, hch) == true) {
    $modules
      .splice(i, 1);
    el.classList.add("come-in")
  }
 });
};

function refreshModules () {
 $modules = $('.postContainer, .summary, .pagelist');
 seeModules();
};

document.addEventListener("IndexRefresh", function(e){
  setTimeout( refreshModules, 500 );
}, false);
document.addEventListener("IndexBuild", function(e){ 
  setTimeout( refreshModules, 500 );
}, false);

document.addEventListener("ThreadUpdate", function(e){
    newcount = e.detail.postCount - oldCount;
    $modules = $('.postContainer:not(.come-in)');
    seeModules();
    dragMeKillMe = $('.postContainer');
    dragMeKillMe = dragMeKillMe.slice(-1*newcount);
    oldCount = e.detail.postCount;
    dragToKill();
    tripClasses();
}, false);

function dragToKill() 
{
  dragMeKillMe.draggable
  ({
        axis: "x",
        addClasses: false,
        revert: false,
        appendTo: 'body',
        drag: function(event, ui) 
        {
            if (Math.abs(ui.offset.left) < 100) {
                $(this).draggable( "option", "revert", true );
                $(this).css("background-color","#fff!important");
                }
            else{
                $(this).draggable( "option", "revert", false );
                $(this).css("background-color","#fff!important");
                }
        },
        stop: function(event, ui) 
     {
       if (Math.abs(ui.offset.left) > 100) 
       {
        var el = $(this);
        if (ui.offset.left > 100) {el.addClass("remove-me");};
        if (ui.offset.left <-100) {el.addClass("remove-me-l");};
        el.draggable('destroy');
        el.css("margin-bottom","-"+(el.outerHeight())+"px"); 
        el.css("pointer-events","none");
        setTimeout( seeModules, 500 );
       }
     }
  });
};

window.addEventListener('scroll', function() {
  if ($modules.length > 0) { seeModules();}
  var currentTop = $(window).scrollTop();
  if (currentTop < this.previousTop) {
     header.removeClass("hide-it");
  if (currentTop < 100 && header.hasClass('fixed') == true) {
     header.removeClass('fixed');
  }        
  } else {
  //down
     header.addClass("hide-it");
  if (currentTop > 100 && header.hasClass('fixed') == false) {
     header.addClass('fixed');
  }        
  }
  this.previousTop = currentTop;        
}, false);

function tripClasses() {   
  var $allSpans = $('.postertrip');
  $allSpans.each(function(i, el) {
    var $el = $allSpans.eq(i);
    el.classList.add(el.innerHTML);
  });
};

document.addEventListener("DOMContentLoaded", function () { 
    document.removeEventListener("DOMContentLoaded", arguments.callee, false);
    init();
});
