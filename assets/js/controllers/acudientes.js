app.controller('acudientesCtrl', ['$scope','$mdDialog','$mdMedia','person','$http',
  function ($scope,$mdDialog,$mdMedia,person,$http) {

    var originatorEv;
     $scope.openMenu = function($mdOpenMenu, ev) {
       originatorEv = ev;
       $mdOpenMenu(ev);
     };

     $scope.addAcudiente = function(ev,p) {
      person.setPerson(p);
      $mdDialog.show({
        controller: 'addPersonCtrl',
        templateUrl: 'views/add_person.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      })
      .then(function(answer) {
        $scope.initAcudientes();
      }, function() {
        $scope.initAcudientes();
      });
    };


    $scope.initAcudientes = function() {
      /*Data favoritos*/
      $http.post("servicios/readAcudientes.php")
        .success(function(respuesta){

          if (respuesta.error) {
            $scope.error = respuesta.error;
          }else{
            $scope.acudientes = respuesta;
          }

        })
        .error(function(){
          $scope.error = "Error: No hay Datos" ;
      });
      /*End Data favoritos*/
    };

      $scope.initAcudientes();


}]);
