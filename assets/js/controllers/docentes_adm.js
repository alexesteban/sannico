app.controller('docentesAdmCtrl', ['$scope',
function ($scope) {

  var originatorEv;
   $scope.openMenu = function($mdOpenMenu, ev) {
     originatorEv = ev;
     $mdOpenMenu(ev);
   };


}]);
