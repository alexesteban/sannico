app.controller('appCtrl', ['$scope','$http','$cookies', '$location',
  function($scope,$http,$cookies,$location) {
    $scope.loggedIn = $cookies.get('logued');

    $scope.logued = function(){
      $scope.loggedIn = $cookies.get('logued');
      $location.path('/dashboard/1');
    };

    $scope.logout = function(){
      $scope.loggedIn = '';
      $cookies.put('logued', '');
      $location.path('/login');
    };

    $scope.callAvatar = function(){
      $http.post("servicios/avatar.php", {'guid': $cookies.get('logued')})
        .success(function(respuesta){

          if (respuesta !== '') {
            $scope.avatar = respuesta[0].avatar;
          }

        })
        .error(function(){
          $scope.user = "Error: No hay Datos" ;
      });
    };

    $scope.callRol = function() {
      $http.post("servicios/rol.php", {'guid': $cookies.get('logued')})
        .success(function(respuesta){

          $scope.rol = respuesta[0].rol;

        })
        .error(function(){
          $scope.rol = 0;
      });
    };

    $scope.callAvatar();
    $scope.callRol();


  }]);
