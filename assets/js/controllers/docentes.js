app.controller('docentesCtrl', ['$scope','$http',
function ($scope,$http) {

  $scope.readDocentes = function(){
    $http.post('servicios/readDocentes.php')
        .success(function(data) {
          if(data.error){
            $scope.error = data.error;
          }else{
            $scope.docentes = data;
          }
        });
  };

  $scope.readDocentes();

}]);
