app.directive('gallery', function () {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      $('.gallery a').simpleLightbox();
    }
  };
});
