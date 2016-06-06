app.directive('tabs', function () {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {

      var link = elem.find('a');

      $(link).click(function (e) {
        e.preventDefault();
        $(this).tab('show');
      });

    }
  };
});
