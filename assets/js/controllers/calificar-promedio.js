app.controller('calificarPromedioCtrl', ['$scope','$routeParams','$http','$cookies',
function ($scope,$routeParams,$http,$cookies) {

    $scope.idAsignatura = $routeParams.idAsignatura;

    var guid_docente = $cookies.get('logued');
    if (!guid_docente) {
      $scope.logout();
    }


    $scope.initCalificaciones = function() {
      $scope.error = "";
      $http.post("servicios/readCalficarAsignatura.php", {'idAsignatura': $scope.idAsignatura, 'guid_docente': guid_docente})
        .success(function(data){
          if (data.error) {
            $scope.error = data.error;
          }else{

            $scope.nameAsignatura = data.nameAsignatura;
            $scope.nameCurso = data.nameCurso;
            $scope.alumnos = data.students;

          }
        });
    };

    $scope.initCalificaciones();

    $scope.updNota = function(idAsignatura,guid,nota) {
      $scope.error = "";
      $scope.errorNota = "";
      if (nota <= 10) {
        $http.post("servicios/updNotaAsignatura.php", {'idAsignatura': idAsignatura, 'guid_alumno': guid, 'nota': nota})
          .success(function(data){
            if (data.error) {
              $scope.error = data.error;
            }else{

              console.log(data);

            }
          });
      }else{
        $scope.errorNota = "La nota no puede ser mayor a 10, para decimales, asegurese usar el punto, ej: 7.8";
      }
    };


}]);
