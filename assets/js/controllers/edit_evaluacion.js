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
         $scope.porcentaje = data.porcentaje;
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
  if(!$scope.publica){$scope.publica = 0;}
   $http.post("servicios/updEvaluacion.php", {'idEvaluacion': $scope.idEvaluacion, 'titulo':$scope.titulo, 'descripcion': $scope.descripcion, 'entrega': $scope.entrega, 'porcentaje': 0, 'publica': $scope.publica})
     .success(function(data){
       if (data.error) {
         $scope.error = data.error;
       }else{
         $mdDialog.cancel();
       }
     });
 };


}]);
