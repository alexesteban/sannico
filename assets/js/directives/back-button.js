app.directive('backButton', function () {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {

      elem.bind('click', goBack);

         function goBack() {
           history.back();
           scope.$apply();
         }
    }
  };
});
