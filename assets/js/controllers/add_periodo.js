app.controller('addPeriodoCtrl', ['$scope', '$mdDialog', '$http',
function ($scope,$mdDialog,$http) {

  $scope.cancel = function() {
   $mdDialog.cancel();
 };

 $scope.addPeriodo = function(){
   $scope.error = "";
   if ($scope.nombre_periodo) {
     $http.post("servicios/insertPeriodo.php", {'nombre_periodo': $scope.nombre_periodo })
       .success(function(data){
         if (data.error) {
           $scope.error = data.error;
         }else{
           $mdDialog.cancel();
         }
       });
   }else{
     $scope.error = "El campo es obligatorio";
   }

 };


}]);
