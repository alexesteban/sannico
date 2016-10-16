app.controller('editCursoCtrl', ['$scope', '$mdDialog','person','$http',
function ($scope,$mdDialog,person,$http) {

  $scope.cancel = function() {
   $mdDialog.cancel();
 };

 $scope.idCurso = person.getPerson();

 $scope.editCurso = function(){

   $scope.error="";

   if ($scope.name) {

        $http.post('servicios/updCurso.php', {'name': $scope.name, 'idCurso': $scope.idCurso})
          .success(function(data) {
            if(data === 'true'){
              $mdDialog.cancel();
            }else{
              $scope.error = "No se pudo editar el Evento";
            }
          });


   }else{
     $scope.error="El campo nombre no puede estar vacìo";
   }

 };

 $http.post('servicios/readCurso.php', {'id': $scope.idCurso})
     .success(function(data) {
       if(data.error){
         $scope.error = data.error;
       }else{
         $scope.name = data.name;
       }
     });
}]);
