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
