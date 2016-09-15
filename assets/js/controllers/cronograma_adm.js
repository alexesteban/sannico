app.controller('cronogramaAdmCtrl', ['$scope','$mdDialog','$mdMedia','person','$http',
function ($scope,$mdDialog,$mdMedia,person,$http) {

  var originatorEv;
   $scope.openMenu = function($mdOpenMenu, ev) {
     originatorEv = ev;
     $mdOpenMenu(ev);
   };

   $scope.addEvent = function(ev,p) {
    person.setPerson(p);
    $mdDialog.show({
      controller: 'addEventCtrl',
      templateUrl: 'views/add_event.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
    .then(function(answer) {
      $scope.initEventos();
    }, function() {
      $scope.initEventos();
    });
  };

   $scope.editEvent = function(ev,p) {
    person.setPerson(p);
    $mdDialog.show({
      controller: 'editEventCtrl',
      templateUrl: 'views/edit_event.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
    .then(function(answer) {
      $scope.initEventos();
    }, function() {
      $scope.initEventos();
    });
  };

  $scope.deleteEvent = function(ev,idEvento) {
    // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
            .title('Quieres Borrar el Evento?')
            .textContent('Este Evento se borrrá para siempre')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('ELIMINAR')
            .cancel('CANCELAR');
      $mdDialog.show(confirm).then(function() {


        $http.post("servicios/deleteEvent.php", {'idEvento': idEvento})
          .success(function(respuesta){

            $scope.initEventos();

          });

      }, function() {

      });


  };


  $scope.initEventos = function() {
    /*Data favoritos*/
    $http.post("servicios/readEventos.php")
      .success(function(respuesta){

        if (respuesta.error) {
          $scope.error = respuesta.error;
        }else{
          $scope.eventos = respuesta;
        }

      })
      .error(function(){
        $scope.error = "Error: No hay Datos" ;
    });
    /*End Data favoritos*/
  };

    $scope.initEventos();


}]);
