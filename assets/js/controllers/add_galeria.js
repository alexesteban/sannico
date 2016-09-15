app.controller('addGaleriaCtrl', ['$scope', '$mdDialog','person','$http',
function ($scope,$mdDialog,person,$http) {

  $scope.cancel = function() {
   $mdDialog.cancel();
 };

 $scope.typePerson = person.getPerson();

 $scope.addGallery = function(){

   $scope.error = "";

   if ($scope.typePerson === "Crear" ) {

     if ($scope.titulo && $scope.descripcion) {

       $http.post('servicios/insertGallery.php', {'titulo': $scope.titulo, 'descripcion': $scope.descripcion})
           .success(function(data) {
             if(data.error){
               $scope.error = data.error;
             }else{

               $scope.success = "La galería se creó correctamente";

             }
           });
     }else {
       $scope.error = "Todos los campos son obligatorios";
     }

   }else {

   }

 };

}]);
