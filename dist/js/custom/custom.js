$( document ).ready(function() {
  var hamburger = $('#hamburger-icon');
  hamburger.click(function() {
     hamburger.toggleClass('active');
     return false;
  });
});

