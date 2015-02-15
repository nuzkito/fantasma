function documentReady(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function interval (fn, t) {
  return window.setInterval(fn, t);
}


;(function (window, document, undefined) {
  "use strict";

  documentReady(function () {

    var scrollAnchors = document.querySelectorAll('[data-scroll-down]');
    if (scrollAnchors) {
      [].forEach.call(scrollAnchors, function (element) {
        element.addEventListener('click', function (event) {
          event.preventDefault();

          var href = element.getAttribute('href');
          var elementToScroll = document.querySelector(href);
          var positionToScroll = elementToScroll.offsetTop - 3;
          var actualScroll = window.scrollY;
          var direction = (actualScroll > positionToScroll) ? -1 : 1;
          var duration = 300;
          var fraction = 10;
          var scrollBy = (positionToScroll - actualScroll) * direction / (duration / fraction);
          var time = 0;

          var scrollAnimated = function () {
            window.scrollBy(0, scrollBy);
            time += fraction;
            if (time >= duration) {
              clearInterval(intervalID);
              window.scrollTo(window.scrollX, positionToScroll);
            }
          };

          var intervalID = interval(scrollAnimated, fraction);


        });
      });
    }

    Prism.highlightAll();

  });

})(window, document);
