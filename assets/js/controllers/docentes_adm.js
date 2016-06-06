app.controller('docentesAdmCtrl', ['$scope','$mdDialog','$mdMedia',
function ($scope,$mdDialog,$mdMedia) {

  var originatorEv;
   $scope.openMenu = function($mdOpenMenu, ev) {
     originatorEv = ev;
     $mdOpenMenu(ev);
   };

   $scope.addTeacher = function(ev) {
    $mdDialog.show({
      controller: 'addTeacherCtrl',
      templateUrl: 'views/add_teacher.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  };


}]);
