app.controller('galeriasAdmCtrl', ['$scope','$mdDialog','$mdMedia','person','$http',
function ($scope,$mdDialog,$mdMedia,person,$http) {

  var originatorEv;
   $scope.openMenu = function($mdOpenMenu, ev) {
     originatorEv = ev;
     $mdOpenMenu(ev);
   };

   $scope.addGallery = function(ev,p) {
    person.setPerson(p);
    $mdDialog.show({
      controller: 'addGaleriaCtrl',
      templateUrl: 'views/add_galeria.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
    .then(function(answer) {
      $scope.initGalerias();
    }, function() {
      $scope.initGalerias();
    });
  };

  $scope.editGallery = function(ev,p) {
   person.setPerson(p);
   $mdDialog.show({
     controller: 'editGaleriaCtrl',
     templateUrl: 'views/edit_galeria.html',
     parent: angular.element(document.body),
     targetEvent: ev,
     clickOutsideToClose:true
   })
   .then(function(answer) {
     $scope.initGalerias();
   }, function() {
     $scope.initGalerias();
   });
 };

  $scope.deleteGallery = function(ev,idGallery) {
    // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
            .title('Quieres Eliminar la Galería?')
            .textContent('Si la eliminas, se perderán todas las fotos que tienes dentro de esta galería')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('ELIMINAR')
            .cancel('CANCELAR');
      $mdDialog.show(confirm).then(function() {


        $http.post("servicios/deleteGallery.php", {'idGallery': idGallery})
          .success(function(respuesta){

            $scope.initGalerias();

          });

      }, function() {

      });
  };

  $scope.initGalerias = function(){
    $http.post('servicios/readGallery.php')
        .success(function(data) {
          if (data.error) {
            $scope.error = data.error;
          }else{
            $scope.galerias = data;

          }
        });
  };

  $scope.initGalerias();

}]);
