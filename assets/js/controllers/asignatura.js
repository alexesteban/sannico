app.controller('asignaturaCtrl', ['$scope','$mdMedia','$mdDialog','person',
function ($scope,$mdMedia,$mdDialog,person) {

  $scope.openMenu = function($mdOpenMenu, ev) {
    originatorEv = ev;
    $mdOpenMenu(ev);
  };

  $scope.edit = function(ev,$tipo) {
  person.setPerson($tipo);
   $mdDialog.show({
     controller: 'editNoteCtrl',
     templateUrl: 'views/edit_note.html',
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


}]);
