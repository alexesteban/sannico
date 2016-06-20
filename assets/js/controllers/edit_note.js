app.controller('editNoteCtrl', ['$scope', '$mdDialog','person',
function ($scope,$mdDialog,person) {

  $scope.cancel = function() {
   $mdDialog.cancel();
 };

 $scope.typeEdit = person.getPerson();


}]);
