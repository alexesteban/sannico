app.controller('loginCtrl', ['$scope','$location','$http','$cookies',
function ($scope,$location,$http,$cookies) {

  $scope.login = function() {

      $scope.error = '';
      if($scope.email && $scope.password){
        $http.post('servicios/login.php', {'email': $scope.email, 'password': $scope.password})
            .success(function(data) {

              if(data.error){
                $scope.error = data.error;
              }else{

                var guid = data.guid;
                var rol = data.rol;
                $cookies.put('logued', guid);
                $scope.callAvatar();
                $scope.logued(rol);
              }

            }).error(function(data, status) {
          $scope.errors.push(status);
        });
      }else{
        $scope.error = "Por favor ingrese los datos";
        $scope.login = false;
      }
  };



}]);
