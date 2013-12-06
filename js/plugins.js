// Avoid `console` errors in browsers that lack a console.
(function() {
  var method;
  var noop = function () {};
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
}());

// Place any jQuery/helper plugins in here.

// Track JavaScript errors in Google Analytics
// See here: https://github.com/h5bp/html5-boilerplate/blob/v4.3.0/doc/extend.md
/*
(function(window){
  var undefined,
    link = function (href) {
      var a = window.document.createElement('a');
      a.href = href;
      return a;
    };
  window.onerror = function (message, file, line, column) {
    var host = link(file).hostname;
    _gaq.push([
      '_trackEvent',
      (host == window.location.hostname || host == undefined || host == '' ? '' : 'external ') + 'error',
      message, file + ' LINE: ' + line + (column ? ' COLUMN: ' + column : ''), undefined, undefined, true
    ]);
  };
}(window));

// Track page scroll
$(function(){
  var isDuplicateScrollEvent,
      scrollTimeStart = new Date,
      $window = $(window),
      $document = $(document),
      scrollPercent;

  $window.scroll(function() {
    scrollPercent = Math.round(100 * ($window.height() + $window.scrollTop())/$document.height());
    if (scrollPercent > 90 && !isDuplicateScrollEvent) { //page scrolled to 90%
      isDuplicateScrollEvent = 1;
      _gaq.push(['_trackEvent', 'scroll',
        'Window: ' + $window.height() + 'px; Document: ' + $document.height() + 'px; Time: ' + Math.round((new Date - scrollTimeStart )/1000,1) + 's',
        undefined, undefined, true
      ]);
    }
  });
});
*/