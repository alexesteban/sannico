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
         $scope.porcentaje = parseFloat(data.porcentaje);
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
   $scope.error = "";

   if ($scope.titulo && $scope.entrega && $scope.calificable) {
     if ($scope.calificable === "0") {
       $scope.porcentaje = 0;
     }

     if ( ($scope.porcentaje || $scope.porcentaje === 0 ) && $scope.porcentaje <= $scope.porcentajeDisponible ) {

       if(!$scope.publica){$scope.publica = 0;}
        $http.post("servicios/updTarea.php", {'idTarea': $scope.idTarea, 'titulo':$scope.titulo, 'descripcion': $scope.descripcion, 'entrega': $scope.entrega, 'porcentaje': $scope.porcentaje, 'publica': $scope.publica, 'calificable': $scope.calificable})
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
   $http.post("servicios/readPorcentajeDisponibleByTarea.php", {'idTarea': $scope.idTarea})
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
