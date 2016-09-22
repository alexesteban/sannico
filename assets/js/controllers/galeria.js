app.controller('galeriaCtrl', ['$scope','$http',
function ($scope,$http) {

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
