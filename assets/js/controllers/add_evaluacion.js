app.controller('addEvaluacionCtrl', ['$scope', '$mdDialog','person','$http',
function ($scope,$mdDialog,person,$http) {

  $scope.cancel = function() {
   $mdDialog.cancel();
 };

 $scope.idAsignatura = person.getPerson();


  $scope.addEvaluacion = function() {
    if ($scope.titulo && $scope.entrega) {
      if(!$scope.publica){$scope.publica = 0;}
      $http.post('servicios/insertEvaluacion.php', {'idAsignatura': $scope.idAsignatura, 'titulo':$scope.titulo, 'descripcion': $scope.descripcion, 'entrega': $scope.entrega, 'porcentaje': 0, 'publica': $scope.publica})
          .success(function(data) {
            if(data.error){
              $scope.error = data.error;
            }else{
                $mdDialog.cancel();
            }
          });
    }else{
      $scope.error = "Todos los campos son obligatorios";
    }
  };

}]);
