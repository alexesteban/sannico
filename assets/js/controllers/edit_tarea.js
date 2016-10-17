app.controller('editTareaCtrl', ['$scope', '$mdDialog','person','$http',
function ($scope,$mdDialog,person,$http) {

  $scope.cancel = function() {
   $mdDialog.cancel();
 };

 $scope.idTarea = person.getPerson();

 $scope.initTarea = function(){
   $http.post("servicios/readTarea.php", {'idTarea': $scope.idTarea})
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
         $scope.calificable = data.calificable;
         $scope.id_asignatura = data.id_asignatura;
       }
     });
 };

 $scope.initTarea();

 $scope.updTarea = function(){
  if(!$scope.publica){$scope.publica = 0;}
   $http.post("servicios/updTarea.php", {'idTarea': $scope.idTarea, 'titulo':$scope.titulo, 'descripcion': $scope.descripcion, 'entrega': $scope.entrega, 'porcentaje': 0, 'publica': $scope.publica, 'calificable': $scope.calificable})
     .success(function(data){
       if (data.error) {
         $scope.error = data.error;
       }else{
         $mdDialog.cancel();
       }
     });
 };


}]);
