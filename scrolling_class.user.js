// ==UserScript==
// @name        4chan post scrolling
// @namespace   eric
// @description add a class to posts for scrolling effects
// @include     https://boards.4chan.org/*
// @include     http://boards.4chan.org/*
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_openInTab
// @grant          GM_xmlhttpRequest
// @grant          GM_addStyle
// @version     1
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js

// ==/UserScript==


(function($) {

  /**
   * Copyright 2012, Digital Fusion
   * Licensed under the MIT license.
   * http://teamdf.com/jquery-plugins/license/
   *
   * @author Sam Sehnert
   * @desc A small plugin that checks whether elements are within
   *     the user visible viewport of a web browser.
   *     only accounts for vertical position, not horizontal.
   */

  $.fn.visible = function(partial) {
    
      var $t            = $(this),
          $w            = $(window),
          viewTop       = $w.scrollTop(),
          viewBottom    = viewTop + $w.height(),
          _top          = $t.offset().top,
          _bottom       = _top + $t.height(),
          compareTop    = partial === true ? _bottom : _top,
          compareBottom = partial === true ? _top : _bottom;
    
    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

  };
    
})(jQuery);


var $modules = $('.postContainer, .summary, .pagelist');

$(window).scroll(function(event) {
  $modules.each(function(i, el) {
    var $el = $modules.eq(i);
    if ($el.visible(true)) {
      $modules
        .splice(i, 1);
      $el
        .addClass("come-in")

    } 
  });
});

var win = $(window);

document.addEventListener("ThreadUpdate", function(e){
    

    $modules = $('.postContainer:not(.come-in)');
    
    }, false);


var allMods = $(".postContainer, .summary, .pagelist");

// Already visible modules
allMods.each(function(i, el) {
  var el = $(el);
  if (el.visible(true)) {
    el.addClass("come-in"); 
  } 
});
