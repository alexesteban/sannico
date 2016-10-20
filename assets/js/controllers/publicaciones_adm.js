app.controller('publicacionesAdmCtrl', ['$scope','$mdDialog','$mdMedia','person','$http','$cookies',
function ($scope,$mdDialog,$mdMedia,person,$http,$cookies) {

  var log = $cookies.get('logued');

  if (log) {
    $scope.guid = log;
  }else{
    $scope.logout();
  }

  var originatorEv;
   $scope.openMenu = function($mdOpenMenu, ev) {
     originatorEv = ev;
     $mdOpenMenu(ev);
   };

   $scope.addPublicacion = function(ev,p) {
    person.setPerson(p);
    $mdDialog.show({
      controller: 'addPublicacionCtrl',
      templateUrl: 'views/add_publicacion.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
    .then(function(answer) {
      $scope.initPublicaciones();
    }, function() {
      $scope.initPublicaciones();
    });
  };

  $scope.editPublicacion = function(ev,p) {
   person.setPerson(p);
   $mdDialog.show({
     controller: 'editPublicacionCtrl',
     templateUrl: 'views/edit_publicacion.html',
     parent: angular.element(document.body),
     targetEvent: ev,
     clickOutsideToClose:true
   })
   .then(function(answer) {
     $scope.initPublicaciones();
   }, function() {
     $scope.initPublicaciones();
   });
 };

  $scope.deletePublicacion = function(ev,idPublicacion) {
      var confirm = $mdDialog.confirm()
            .title('Quieres Eliminar la Publicaciòn?')
            .textContent('Si la eliminas, desaparecerá del Home permanentemente')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('ELIMINAR')
            .cancel('CANCELAR');
      $mdDialog.show(confirm).then(function() {
        $http.post("servicios/deletePublciacion.php", {'idPublicacion': idPublicacion})
          .success(function(respuesta){

            $scope.initPublicaciones();

          });

      }, function() {

      });
  };

  $scope.initPublicaciones = function(){
    $http.post('servicios/readPublicaciones.php', {'guid': $scope.guid})
        .success(function(data) {
          if (data.error) {
            $scope.error = data.error;
          }else{
            $scope.publicaciones = data;

          }
        });
  };

  $scope.initRol = function(){
    $http.post('servicios/rol.php', {'guid': $scope.guid})
        .success(function(data) {
          if (data.error) {
            $scope.error = data.error;
          }else{
            $scope.rol = data[0].rol;

          }
        });
  };


  $scope.initPublicaciones();
  $scope.initRol();

}]);
