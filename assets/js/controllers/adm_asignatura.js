app.controller('admAsignaturaCtrl', ['$scope','$mdMedia','$mdDialog','person',
function ($scope,$mdMedia,$mdDialog,person) {

  $scope.openMenu = function($mdOpenMenu, ev) {
    originatorEv = ev;
    $mdOpenMenu(ev);
  };

  $scope.edit = function(ev,$tipo) {
  person.setPerson($tipo);
   $mdDialog.show({
     controller: 'editTareaCtrl',
     templateUrl: 'views/edit_tarea.html',
     parent: angular.element(document.body),
     targetEvent: ev,
     clickOutsideToClose:true
   })
   .then(function(answer) {
     $scope.status = 'You said the information was "' + answer + '".';
   }, function() {
     $scope.status = 'You cancelled the dialog.';
   });
 };

 $scope.state = "Al";

  $scope.setState = function($state){
    $scope.state = $state;
  };

}]);
