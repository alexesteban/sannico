app.controller('asignaturasAdmCtrl', ['$scope','$mdDialog','$mdMedia','$http',
function ($scope,$mdDialog,$mdMedia,$http) {
  var originatorEv;
   $scope.openMenu = function($mdOpenMenu, ev) {
     originatorEv = ev;
     $mdOpenMenu(ev);
   };

   $scope.addCurso = function(ev) {
    $mdDialog.show({
      controller: 'addCursoCtrl',
      templateUrl: 'views/add_curso.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
    .then(function(answer) {
      $scope.initCursos();
    }, function() {
      $scope.initCursos();
    });
  };

  $scope.initCursos = function() {
    $http.post("servicios/readCursos.php")
      .success(function(data){

        if (data.error) {
          $scope.error = data.error;
        }else{
          $scope.cursos = data;
        }

      });
  };

    $scope.initCursos();


}]);
