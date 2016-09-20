app.controller('editGaleriaCtrl', ['$scope', '$mdDialog','person','$http',
function ($scope,$mdDialog,person,$http) {

  $scope.cancel = function() {
   $mdDialog.cancel();
 };

 $scope.typePerson = person.getPerson();

 $scope.editGaleria = function(){

   $scope.error="";
   $scope.success="";

   if ($scope.titulo && $scope.descripcion) {

        $http.post('servicios/updGallery.php', {'titulo': $scope.titulo, 'descripcion': $scope.descripcion, 'id': $scope.typePerson})
          .success(function(data) {
            if(data === 'true'){
              $scope.success = "La Galería se editó correctamente";
            }else{
              $scope.error = "No se pudo editar la Galería";
            }
          });

   }else{
     $scope.error="Todos los campos son obligatorios";
   }

 };

 $http.post('servicios/readGaleria.php', {'id': $scope.typePerson})
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
