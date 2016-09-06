app.controller('perfilEditCtrl', ['$scope','$routeParams','$http',
function ($scope,$routeParams,$http) {

  $scope.guid = $routeParams.guid;

  $scope.tipoDoc = [
    {
      "name" : "T.I."
    },
    {
      "name" : "C.C."
    }
  ];

  $scope.initPerson = function() {
    /*Data favoritos*/
    $http.post("servicios/readPerson.php", {'guid': $scope.guid })
      .success(function(respuesta){

        if (respuesta.error) {
          $scope.error = respuesta.error;
        }else{
          $scope.nombres = respuesta.nombres;
          $scope.apellidos = respuesta.apellidos;
        }

      })
      .error(function(){
        $scope.error = "Error: No hay Datos" ;
    });
    /*End Data favoritos*/
  };

    $scope.initPerson();



}]);
