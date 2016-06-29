app.controller('galeriaAdmCtrl', ['$scope','$mdDialog','$mdMedia','person',
function ($scope,$mdDialog,$mdMedia,person) {

  var originatorEv;
   $scope.openMenu = function($mdOpenMenu, ev) {
     originatorEv = ev;
     $mdOpenMenu(ev);
   };

   $scope.addPhoto = function(ev) {
    $mdDialog.show({
      controller: 'addPhotoCtrl',
      templateUrl: 'views/add_photo.html',
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
