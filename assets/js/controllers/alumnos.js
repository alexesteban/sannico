app.controller('alumnosCtrl', ['$scope','$mdDialog','$mdMedia','person','$http',
function ($scope,$mdDialog,$mdMedia,person,$http) {

  var originatorEv;
   $scope.openMenu = function($mdOpenMenu, ev) {
     originatorEv = ev;
     $mdOpenMenu(ev);
   };

   $scope.addTeacher = function(ev,p) {
    person.setPerson(p);
    $mdDialog.show({
      controller: 'addPersonCtrl',
      templateUrl: 'views/add_person.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
    .then(function(answer) {
      $scope.initAlumnos();
    }, function() {
      $scope.initAlumnos();
    });
  };


  $scope.initAlumnos = function() {
    /*Data favoritos*/
    $http.post("servicios/readAlumnos.php")
      .success(function(respuesta){

        if (respuesta.error) {
          $scope.error = respuesta.error;
        }else{
          $scope.alumnos = respuesta;

        }

      })
      .error(function(){
        $scope.error = "Error: No hay Datos" ;
    });
    /*End Data favoritos*/
  };

    $scope.initAlumnos();


}]);
