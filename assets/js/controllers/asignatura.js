app.controller('asignaturaCtrl', ['$scope','$mdMedia','$mdDialog','person','$routeParams','$http',
function ($scope,$mdMedia,$mdDialog,person,$routeParams,$http) {

  $scope.idAsignatura = $routeParams.idAsignatura;
  $scope.guidAlumno = $routeParams.guidAlumno;

  $scope.openMenu = function($mdOpenMenu, ev) {
    originatorEv = ev;
    $mdOpenMenu(ev);
  };

  $scope.edit = function(ev,$tipo) {
  person.setPerson($tipo);
   $mdDialog.show({
     controller: 'editNoteCtrl',
     templateUrl: 'views/edit_note.html',
     parent: angular.element(document.body),
     targetEvent: ev,
     clickOutsideToClose:true
   })
   .then(function(answer) {
     $scope.initInfo();
   }, function() {
     $scope.initInfo();
   });
 };

 $scope.initInfo = function(){
   $http.post("servicios/readAsignaturaByStudent.php", {'idAsignatura': $scope.idAsignatura, 'guidAlumno': $scope.guidAlumno})
     .success(function(data){
       if (data.error) {
         $scope.error = data.error;
       }else{
         $scope.avatarAlumno = data.avatarAlumno;
         $scope.generoAlumno = data.generoAlumno;
         $scope.nombresAlumno = data.nombresAlumno;
         $scope.cursoAlumno = data.cursoAlumno;
         $scope.nombreAsignatura = data.nombreAsignatura;
         $scope.periodo = data.periodo;
         $scope.tareas = data.tareas;
         $scope.evaluaciones = data.evaluaciones;
       }
     });
 };

 $scope.initInfo();

 $scope.getPromedio = function(){
   $http.post("servicios/readPromedio.php", {'idAsignatura': $scope.idAsignatura, 'guidAlumno': $scope.guidAlumno})
     .success(function(data){
       if (data.error) {
         $scope.error = data.error;
       }else{
         $scope.promedio = parseFloat(data.promedio).toFixed(1);
       }
     });
 };

 $scope.getPromedio();

}]);
