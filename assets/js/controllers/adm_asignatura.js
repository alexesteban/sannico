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

  $scope.addEvaluacion = function(ev,idAsignatura) {
  person.setPerson(idAsignatura);
   $mdDialog.show({
     controller: 'addEvaluacionCtrl',
     templateUrl: 'views/add_evaluacion.html',
     parent: angular.element(document.body),
     targetEvent: ev,
     clickOutsideToClose:true
   })
   .then(function(answer) {
     $scope.initEvaluaciones();
   }, function() {
     $scope.initEvaluaciones();
   });
 };

 $scope.editTarea = function(ev,idTarea) {
 person.setPerson(idTarea);
  $mdDialog.show({
    controller: 'editTareaCtrl',
    templateUrl: 'views/edit_tarea.html',
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

 $scope.editEvaluacion = function(ev,idEvaluacion) {
 person.setPerson(idEvaluacion);
  $mdDialog.show({
    controller: 'editEvaluacionCtrl',
    templateUrl: 'views/edit_evaluacion.html',
    parent: angular.element(document.body),
    targetEvent: ev,
    clickOutsideToClose:true
  })
  .then(function(answer) {
    $scope.initEvaluaciones();
  }, function() {
    $scope.initEvaluaciones();
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

  $scope.initEvaluaciones = function() {
    $http.post("servicios/readEvaluaciones.php", {'id': $scope.idAsignatura})
      .success(function(data){
        if (data.error) {
          $scope.error = data.error;
        }else{

          $scope.evaluaciones = data;

          for (var i = 0; i < data.length; i++) {
            var evaluaciones = $scope.evaluaciones[i];
            var evaluacion = data[i];
            if (evaluacion.publica === "1") {
              evaluaciones.publica = true;
            }else{
              evaluaciones.publica = false;
            }
          }

        }
      });
  };

  $scope.initAlumnos();
  $scope.readCurso();
  $scope.readAsignatura();
  $scope.initTareas();
  $scope.initEvaluaciones();

  $scope.updPublica = function(idTarea,state){
    if (state === true) {state = 1;}else{state = 0;}
    $http.post("servicios/updTareaPublica.php", {'idTarea': idTarea, 'state': state})
      .success(function(data){});
  };

  $scope.updEvPublica = function(idEvaluacion,state){
    if (state === true) {state = 1;}else{state = 0;}
    $http.post("servicios/updEvaluacionPublica.php", {'idEvaluacion': idEvaluacion, 'state': state})
      .success(function(data){});
  };

  $scope.deleteTarea = function(ev,idTarea) {
    // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
            .title('Quieres Eliminar esta Tarea?')
            .textContent('Si la eliminas, se perderá los datos de calificaciones asociados a esta tarea')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('ELIMINAR')
            .cancel('CANCELAR');
      $mdDialog.show(confirm).then(function() {

        $http.post("servicios/deleteTarea.php", {'id': idTarea})
          .success(function(respuesta){

            $scope.initTareas();

          });

      }, function() {

      });
  };

  $scope.deleteEvaluacion = function(ev,idEvaluacion) {
    // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
            .title('Quieres Eliminar esta Evaluacion?')
            .textContent('Si la eliminas, se perderá los datos de calificaciones asociados a esta evaluacion')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('ELIMINAR')
            .cancel('CANCELAR');
      $mdDialog.show(confirm).then(function() {

        $http.post("servicios/deleteEvaluacion.php", {'id': idEvaluacion})
          .success(function(respuesta){

            $scope.initEvaluaciones();

          });

      }, function() {

      });
  };

}]);
