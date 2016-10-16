app.controller('cursoAdmCtrl', ['$scope','$routeParams','$http','person','$mdDialog',
function ($scope,$routeParams,$http,person,$mdDialog) {

$scope.idCurso = $routeParams.idCurso;

$scope.openMenu = function($mdOpenMenu, ev) {
  originatorEv = ev;
  $mdOpenMenu(ev);
};

$scope.initAsignaturas = function(){
  $http.post('servicios/readAsignaturas.php',{'id': $scope.idCurso})
      .success(function(data) {
        if (data.error) {
          $scope.error = data.error;
        }else{
          $scope.asignaturas = data;
        }
      });
};

$scope.readNombreCurso = function(){
  $http.post('servicios/readNombreCurso.php',{'id': $scope.idCurso})
      .success(function(data) {
        if (data.error) {
          $scope.error = data.error;
        }else{
          $scope.nombreCurso = data.nombreCurso;
        }
      });
};

$scope.initAsignaturas();
$scope.readNombreCurso();

$scope.addAsignatura = function(ev,p) {
 person.setPerson(p);
 $mdDialog.show({
   controller: 'addAsignaturaCtrl',
   templateUrl: 'views/add_asignatura.html',
   parent: angular.element(document.body),
   targetEvent: ev,
   clickOutsideToClose:true
 })
 .then(function(answer) {
   $scope.initAsignaturas();
 }, function() {
   $scope.initAsignaturas();
 });
};

$scope.editAsignatura = function(ev,p) {
 person.setPerson(p);
 $mdDialog.show({
   controller: 'editAsignaturaCtrl',
   templateUrl: 'views/edit_asignatura.html',
   parent: angular.element(document.body),
   targetEvent: ev,
   clickOutsideToClose:true
 })
 .then(function(answer) {
   $scope.initAsignaturas();
 }, function() {
   $scope.initAsignaturas();
 });
};


$scope.deleteAsignatura = function(ev,idAsignatura) {
  // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Quieres Eliminar esta Asignatura?')
          .textContent('Si la eliminas, se perderán todas las tareas, evaluaciones y notas asignadas con esta asignatura')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('ELIMINAR')
          .cancel('CANCELAR');
    $mdDialog.show(confirm).then(function() {


      $http.post("servicios/deleteAsignatura.php", {'id': idAsignatura})
        .success(function(respuesta){

          $scope.initAsignaturas();

        });

    }, function() {

    });
};


}]);
