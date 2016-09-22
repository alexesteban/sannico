app.controller('nosotrosCtrl', ['$scope','$http',
function ($scope,$http) {


   $scope.initContenido = function(){
     $scope.errorCont = "";
     $http.post("servicios/readContenido.php")
       .success(function(data){

         if (data.error) {
           $scope.errorCont = data.error;
         }else{
           $scope.institucional = data.institucional;
           $scope.mision = data.mision;
           $scope.vision = data.vision;
           $scope.servicios = data.servicios;
         }

       })
       .error(function(){
         $scope.error = "Error: No hay Datos" ;
     });

   };

   $scope.initContenido();

}]);
