app.controller('calificarTareaCtrl', ['$scope','$routeParams','$http','$cookies',
function ($scope,$routeParams,$http,$cookies) {

    $scope.idTarea = $routeParams.idTarea;

    var guid_docente = $cookies.get('logued');
    if (!guid_docente) {
      $scope.logout();
    }


    $scope.initCalificaciones = function() {
      $scope.error = "";
      $http.post("servicios/readCalficarTarea.php", {'idTarea': $scope.idTarea, 'guid_docente': guid_docente})
        .success(function(data){
          if (data.error) {
            $scope.error = data.error;
          }else{

            $scope.nameAsignatura = data.nameAsignatura;
            $scope.nameCurso = data.nameCurso;
            $scope.tituloTarea = data.tituloTarea;
            $scope.alumnos = data.students;

          }
        });
    };

    $scope.initCalificaciones();

    $scope.updNota = function(idTarea,guid,nota) {
      $scope.error = "";
      $scope.errorNota = "";
      if (nota <= 10) {
        $http.post("servicios/updNota.php", {'idTarea': idTarea, 'guid_alumno': guid, 'nota': nota})
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

    $scope.updObservacion = function(idTarea,guid,observaciones) {
      $scope.error = "";
      $http.post("servicios/updObservacion.php", {'idTarea': idTarea, 'guid_alumno': guid, 'observaciones': observaciones})
        .success(function(data){
          if (data.error) {
            $scope.error = data.error;
          }else{
            console.log(data);
          }
        });
    };

}]);
