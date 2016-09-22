app.controller('albumCtrl', ['$scope','$routeParams','$http',
function ($scope,$routeParams,$http) {

var idGaleria = $routeParams.idAlbum;

$scope.initPhotos = function(){

  $http.post('servicios/readPhotos.php',{'id':idGaleria})
      .success(function(data) {
        if (data.error) {
          $scope.error = data.error;
        }else{
          $scope.photos = data;
        }
      });

    $http.post('servicios/readGaleria.php',{'id':idGaleria})
        .success(function(data) {
          if (data.error) {
            $scope.error = data.error;
          }else{
            $scope.galeria = data;
          }
      });

};

$scope.initPhotos();

}]);
