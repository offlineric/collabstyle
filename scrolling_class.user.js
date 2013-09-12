// ==UserScript==
// @name        testicles
// @namespace   eric
// @description insert parent selectors jscript
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
// @require    http://code.jquery.com/ui/1.10.3/jquery-ui.js

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
var allMods = $(".postContainer, .summary, .pagelist");
// Already visible modules
allMods.each(function(i, el) {
  var el = $(el);
  if (el.visible(true)) {
    el.addClass("come-in"); 
  } 
});

$('link[rel=stylesheet]').remove();

var win = $(window);

document.addEventListener("ThreadUpdate", function(e){
    $modules = $('.postContainer:not(.come-in)');
    dragToKill ();
}, false);

function dragToKill() 
{
  $('.postContainer').draggable
  ({
        axis: "x",
        distance: 10,
        addClasses: false,
        revert: false,
        drag: function(event, ui) 
        {
            if (Math.abs(ui.offset.left) < 200) {
                $(this).draggable( "option", "revert", true );
                $(this).css("background-color","#fff!important");
                }
            else{
                $(this).draggable( "option", "revert", false );
                $(this).css("background-color","#f0f0f0!important");
                }
        },
        stop: function(event, ui) 
     {
       if (Math.abs(ui.offset.left) > 200) 
       {
        var el = $(this);
        if (ui.offset.left > 200) {el.addClass("remove-me");};
        if (ui.offset.left <-200) {el.addClass("remove-me-l");};
        el.draggable('destroy');
        el.css("margin-bottom","-"+(el.height()+33)+"px"); //fixme. 33 is height of top and bottom margins +1 more for some reason
        el.css("pointer-events","none");
       }
     }
  });
}
     dragToKill();




