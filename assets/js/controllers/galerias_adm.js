app.controller('galeriasAdmCtrl', ['$scope','$mdDialog','$mdMedia','person',
function ($scope,$mdDialog,$mdMedia,person) {

  var originatorEv;
   $scope.openMenu = function($mdOpenMenu, ev) {
     originatorEv = ev;
     $mdOpenMenu(ev);
   };

   $scope.addTeacher = function(ev,p) {
    person.setPerson(p);
    $mdDialog.show({
      controller: 'addGaleriaCtrl',
      templateUrl: 'views/add_galeria.html',
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
