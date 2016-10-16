app.controller('asignaturasCtrl', ['$scope','$cookies','$http',
function ($scope,$cookies,$http) {
  var log = $cookies.get('logued');

  if (log) {
    $scope.guidDocente = log;
  }else{
    $scope.logout();
  }

  $scope.initAsignaturas = function() {
    $http.post("servicios/readAsignaturasByTeacher.php", {'guidDocente': $scope.guidDocente})
      .success(function(data){

        if (data.error) {
          $scope.error = data.error;
        }else{
          $scope.asignaturas = data;
        }

      });
  };


    $scope.initAsignaturas();

}]);
