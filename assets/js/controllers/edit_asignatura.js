app.controller('editAsignaturaCtrl', ['$scope', '$mdDialog','$http','person',
function ($scope,$mdDialog,$http,person) {

  $scope.cancel = function() {
     $mdDialog.cancel();
   };

   $scope.idAsignatura = person.getPerson();
   $scope.year = "";

   $scope.editAsignatura = function(){
     if ($scope.asignaturaName && $scope.docenteGuid) {
       $http.post('servicios/updAsignatura.php', {'name': $scope.asignaturaName, 'guid_docente': $scope.docenteGuid, 'idAsignatura': $scope.idAsignatura})
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

   $scope.readAsignatura = function(){
     $http.post('servicios/readAsignatura.php', {'id': $scope.idAsignatura})
         .success(function(data) {
           if(data.error){
             $scope.error = data.error;
           }else{
             $scope.asignaturaName = data.asignaturaName;
             $scope.docenteGuid = data.docenteGuid;
           }
         });
   };

   $scope.readNamesDocentes();
   $scope.readActualYear();
   $scope.readAsignatura();

}]);
