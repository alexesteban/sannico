app.controller('addTeacherCtrl', ['$scope', '$mdDialog',
function ($scope,$mdDialog) {

  $scope.cancel = function() {
   $mdDialog.cancel();
 };

}]);
