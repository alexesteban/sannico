app.controller('cronogramaCtrl', ['$scope','$http',
function ($scope,$http) {

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
