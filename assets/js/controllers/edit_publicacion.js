app.controller('editPublicacionCtrl', ['$scope', '$mdDialog','person','$http',
function ($scope,$mdDialog,person,$http) {

  $scope.cancel = function() {
   $mdDialog.cancel();
 };

 $scope.idPublicacion = person.getPerson();

 $scope.editPublicacion = function(){

   $scope.error="";

   if ($scope.titulo && $scope.descripcion) {

        $http.post('servicios/updPublicacion.php', {'titulo': $scope.titulo, 'descripcion': $scope.descripcion, 'id': $scope.idPublicacion})
          .success(function(data) {
            if(data === 'true'){
              $mdDialog.cancel();
            }else{
              $mdDialog.cancel();
            }
          });

   }else{
     $scope.error="Todos los campos son obligatorios";
   }

 };

 $http.post('servicios/readPublicacion.php', {'id': $scope.idPublicacion})
     .success(function(data) {
       if(data.error){
         $scope.error = data.error;
       }else{
         $scope.id = data.id;
         $scope.titulo = data.titulo;
         $scope.descripcion = data.descripcion;
       }
     });

}]);
