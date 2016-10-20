app.controller('homeCtrl', ['$scope','$http',
function ($scope,$http) {

  $scope.initPublicacioneAdm = function(){
    $http.post('servicios/readPublicacionAdm.php')
        .success(function(data) {
          if (data.error) {
            $scope.error = data.error;
          }else{
            $scope.publicacionAdm = data;

          }
        });
  };

  $scope.initPublicaciones = function(){
    $http.post('servicios/readPublicacionesDoc.php')
        .success(function(data) {
          if (data.error) {
            $scope.error = data.error;
          }else{
            $scope.publicaciones = data;

          }
        });
  };

  $scope.initLastGallery = function(){
    $http.post('servicios/readLastGallery.php')
        .success(function(data) {
          if (data.error) {
            $scope.error = data.error;
          }else{
            $scope.gallery = data;

          }
        });
  };

  $scope.initLastEvent = function(){
    $http.post('servicios/readLastEvent.php')
        .success(function(data) {
          if (data.error) {
            $scope.error = data.error;
          }else{
            $scope.evento = data;

          }
        });
  };


  $scope.initPublicacioneAdm();
  $scope.initPublicaciones();
  $scope.initLastGallery();
  $scope.initLastEvent();


}]);
