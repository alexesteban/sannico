app.controller('eventoCtrl', ['$scope','$routeParams','$http',
function ($scope,$routeParams,$http) {

var idEvento = $routeParams.idEvento;

$http.post('servicios/readEvento.php', {'id': idEvento})
    .success(function(data) {
      if(data.error){
        $scope.error = data.error;
      }else{
        $scope.titulo = data.titulo;
        $scope.fecha = data.fecha;
        $scope.hora = data.hora;
        $scope.foto = data.foto;
        $scope.lugar = data.lugar;
        $scope.descripcion = data.descripcion;
      }
    });


}]);
