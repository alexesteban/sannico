app.controller('addAsignaturaCtrl', ['$scope', '$mdDialog','$http','person',
function ($scope,$mdDialog,$http,person) {

  $scope.cancel = function() {
     $mdDialog.cancel();
   };

   $scope.idCurso = person.getPerson();
   $scope.year = "";

   $scope.insertAsignatura = function(){
     if ($scope.asignaturaName && $scope.docenteGuid) {
       $http.post('servicios/insertAsignatura.php', {'name': $scope.asignaturaName, 'guid_docente': $scope.docenteGuid, 'year': $scope.year, 'id_curso': $scope.idCurso})
           .success(function(data) {
             if(data.error){
               $scope.error = data.error;
             }else{
                 $mdDialog.cancel();
             }
           });
     }else{
       $scope.error = "Todos los Campos son Obligatorios";
     }

   };

   $scope.readNamesDocentes = function(){
     $http.post('servicios/readDocentes.php')
         .success(function(data) {
           if(data.error){
             $scope.error = data.error;
           }else{
             $scope.docentes = data;
           }
         });
   };

   $scope.readActualYear = function(){
     $http.post('servicios/readActualYear.php')
         .success(function(data) {
           if(data.error){
             $scope.error = data.error;
           }else{
             $scope.year = data.year;
           }
         });
   };

   $scope.readNamesDocentes();
   $scope.readActualYear();

}]);
