function documentReady(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

;(function (document) {
  "use strict";

  documentReady(function () {
    Prism.highlightAll();

    var times = document.querySelectorAll('time');
    [].forEach.call(times, function (time) {
      var englishMonths = 'January February March April May June July August September October November December'.split(' ');
      var spanishMonths = 'Enero Febrero Marzo Abril Mayo Junio Julio Agosto Septiembre Octubre Noviembre Diciembre'.split(' ');
      var content = time.textContent;

      englishMonths.forEach(function (month, index) {
        content = content.replace(month, spanishMonths[index]);
      });

      time.textContent = content;
    });
  });
})(document);
