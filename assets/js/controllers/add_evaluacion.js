app.controller('addEvaluacionCtrl', ['$scope', '$mdDialog','person','$http',
function ($scope,$mdDialog,person,$http) {

  $scope.cancel = function() {
   $mdDialog.cancel();
 };

 $scope.idAsignatura = person.getPerson();


  $scope.addEvaluacion = function() {

    $scope.error = "";

    if ($scope.titulo && $scope.entrega) {
      if (($scope.porcentaje || $scope.porcentaje === 0 ) && $scope.porcentaje <= $scope.porcentajeDisponible) {
        if(!$scope.publica){$scope.publica = 0;}
        $http.post('servicios/insertEvaluacion.php', {'idAsignatura': $scope.idAsignatura, 'titulo':$scope.titulo, 'descripcion': $scope.descripcion, 'entrega': $scope.entrega, 'porcentaje': $scope.porcentaje, 'publica': $scope.publica})
            .success(function(data) {
              if(data.error){
                $scope.error = data.error;
              }else{
                  $mdDialog.cancel();
              }
            });

      }else{
        $scope.error = "El porcentaje es obligatorio y debe ser menor al disponible";
      }
    }else{
      $scope.error = "Todos los campos son obligatorios";
    }
  };


    $scope.readPeridoActual = function() {
      $http.post("servicios/readActualPeriodo.php")
        .success(function(data){
          if (data.error) {
            $scope.error = data.error;
          }else{
            $scope.actualPeriodo = data.actualPeriodo;
          }
        });
    };

    $scope.readPorcentajeDisponible = function() {
      $http.post("servicios/readPorcentajeDisponible.php", {'idAsignatura': $scope.idAsignatura})
        .success(function(data){
          if (data.error) {
            $scope.error = data.error;
          }else{
            $scope.porcentajeDisponible = data.porcentajeDisponible;
          }
        });
    };

    $scope.readPeridoActual();
    $scope.readPorcentajeDisponible();

}]);
