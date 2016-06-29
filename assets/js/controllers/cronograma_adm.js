app.controller('cronogramaAdmCtrl', ['$scope','$mdDialog','$mdMedia','person',
function ($scope,$mdDialog,$mdMedia,person) {

  var originatorEv;
   $scope.openMenu = function($mdOpenMenu, ev) {
     originatorEv = ev;
     $mdOpenMenu(ev);
   };

   $scope.addEvent = function(ev,p) {
    person.setPerson(p);
    $mdDialog.show({
      controller: 'addEventCtrl',
      templateUrl: 'views/add_event.html',
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
