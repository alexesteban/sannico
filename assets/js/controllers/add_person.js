app.controller('addPersonCtrl', ['$scope', '$mdDialog','person',
function ($scope,$mdDialog,person) {

  $scope.cancel = function() {
   $mdDialog.cancel();
 };

 $scope.typePerson = person.getPerson();

}]);
