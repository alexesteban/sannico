app.controller('editEvaluacionCtrl', ['$scope', '$mdDialog','person','$http',
function ($scope,$mdDialog,person,$http) {

  $scope.cancel = function() {
   $mdDialog.cancel();
 };

 $scope.idEvaluacion = person.getPerson();

 $scope.initEvaluacion = function(){
   $http.post("servicios/readEvaluacion.php", {'idEvaluacion': $scope.idEvaluacion})
     .success(function(data){
       if (data.error) {
         $scope.error = data.error;
       }else{
         $scope.titulo = data.titulo;
         $scope.descripcion = data.descripcion;
         $scope.entrega = new Date(data.entrega);
         $scope.porcentaje = parseFloat(data.porcentaje);
         if (data.publica === "1") {
           $scope.publica = true;
         }else{
           $scope.publica = false;
         }
         $scope.id_asignatura = data.id_asignatura;
       }
     });
 };

 $scope.initEvaluacion();

 $scope.updEvaluacion = function(){
   $scope.error = "";
   if ($scope.titulo && $scope.entrega) {
     if (($scope.porcentaje || $scope.porcentaje === 0 ) && $scope.porcentaje <= $scope.porcentajeDisponible) {
       if(!$scope.publica){$scope.publica = 0;}
        $http.post("servicios/updEvaluacion.php", {'idEvaluacion': $scope.idEvaluacion, 'titulo':$scope.titulo, 'descripcion': $scope.descripcion, 'entrega': $scope.entrega, 'porcentaje': $scope.porcentaje, 'publica': $scope.publica})
          .success(function(data){
            if (data.error) {
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
    $http.post("servicios/readPorcentajeDisponibleByEvaluacion.php", {'idEvaluacion': $scope.idEvaluacion})
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
