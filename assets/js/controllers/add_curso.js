app.controller('addCursoCtrl', ['$scope', '$mdDialog','$http',
function ($scope,$mdDialog,$http) {

  $scope.cancel = function() {
     $mdDialog.cancel();
   };

   $scope.insertCurso = function(){
     if ($scope.name) {
       $http.post('servicios/insertCurso.php', {'name': $scope.name})
           .success(function(data) {
             if(data.error){
               $scope.error = data.error;
             }else{
                 $mdDialog.cancel();
             }
           });
     }else{
       $scope.error = "El Campo es obligatorio";
     }
   };

}]);
