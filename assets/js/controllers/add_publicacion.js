app.controller('addPublicacionCtrl', ['$scope', '$mdDialog','person','$http',
function ($scope,$mdDialog,person,$http) {

  $scope.cancel = function() {
   $mdDialog.cancel();
 };

 $scope.guid = person.getPerson();

 $scope.addPublicacion = function(){

   $scope.error = "";

   if ($scope.titulo && $scope.descripcion) {
     $http.post('servicios/insertPublicacion.php', {'titulo': $scope.titulo, 'descripcion': $scope.descripcion, 'guid': $scope.guid})
         .success(function(data) {
           if(data.error){
             $scope.error = data.error;
           }else{
             $mdDialog.cancel();
           }
         });
   }else {
     $scope.error = "Todos los campos son obligatorios";
   }

 };

}]);
