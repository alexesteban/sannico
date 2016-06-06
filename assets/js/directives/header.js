app.directive('header', function () {
  return {
    restrict: 'A',
    templateUrl: 'views/header.html',
    controller: 'headerCtrl',
  };
});
