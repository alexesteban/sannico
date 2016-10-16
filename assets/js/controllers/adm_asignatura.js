app.controller('admAsignaturaCtrl', ['$scope','$mdMedia','$mdDialog','person','$routeParams','$http',
function ($scope,$mdMedia,$mdDialog,person,$routeParams,$http) {

  $scope.idAsignatura = $routeParams.idAsignatura;
  $scope.idCurso = $routeParams.idCurso;

  $scope.openMenu = function($mdOpenMenu, ev) {
    originatorEv = ev;
    $mdOpenMenu(ev);
  };

  $scope.addTarea = function(ev,idAsignatura) {
  person.setPerson(idAsignatura);
   $mdDialog.show({
     controller: 'addTareaCtrl',
     templateUrl: 'views/add_tarea.html',
     parent: angular.element(document.body),
     targetEvent: ev,
     clickOutsideToClose:true
   })
   .then(function(answer) {
     $scope.initTareas();
   }, function() {
     $scope.initTareas();
   });
 };

 $scope.state = "Al";

  $scope.setState = function($state){
    $scope.state = $state;
  };

  $scope.initAlumnos = function() {
    $http.post("servicios/readAlumnosByCurso.php", {'idCurso': $scope.idCurso})
      .success(function(data){
        if (data.error) {
          $scope.error = data.error;
        }else{
          $scope.alumnos = data;
        }
      });
  };

  $scope.readCurso = function() {
    $http.post("servicios/readCurso.php", {'id': $scope.idCurso})
      .success(function(data){
        if (data.error) {
          $scope.error = data.error;
        }else{
          $scope.curso = data.name;
        }
      });
  };

  $scope.readAsignatura = function() {
    $http.post("servicios/readAsignatura.php", {'id': $scope.idAsignatura})
      .success(function(data){
        if (data.error) {
          $scope.error = data.error;
        }else{
          $scope.asignatura = data.asignaturaName;
        }
      });
  };

  $scope.initTareas = function() {
    $http.post("servicios/readTareas.php", {'id': $scope.idAsignatura})
      .success(function(data){
        if (data.error) {
          $scope.error = data.error;
        }else{

          $scope.tareas = data;

          for (var i = 0; i < data.length; i++) {
            var tareas = $scope.tareas[i];
            var tarea = data[i];
            if (tarea.publica === "1") {
              tareas.publica = true;
            }else{
              tareas.publica = false;
            }
          }



        }
      });
  };

  $scope.initAlumnos();
  $scope.readCurso();
  $scope.readAsignatura();
  $scope.initTareas();

}]);
