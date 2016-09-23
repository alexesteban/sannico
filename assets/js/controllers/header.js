app.controller('headerCtrl', ['$scope','$cookies',
function ($scope,$cookies) {

  if ($cookies.get('logued') && $cookies.get('logued') !== '') {
      $scope.callAvatar();
  }

}]);
