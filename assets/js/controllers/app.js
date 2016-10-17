app.controller('appCtrl', ['$scope','$http','$cookies', '$location','auth',
  function($scope,$http,$cookies,$location,auth) {
    $scope.loggedIn = $cookies.get('logued');

    $scope.logued = function(rol){
      $scope.loggedIn = $cookies.get('logued');
      $scope.callAvatar();
      $scope.callRol();
      auth.setAuth($scope.loggedIn);

      if (rol === '3') {
        $location.path('/perfil_edit/' + $scope.loggedIn );
      }else {
        $location.path('/dashboard/' + $scope.loggedIn );
      }

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
            return true;
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
          return $scope.rol;

        })
        .error(function(){
          $scope.rol = 0;
      });
    };



  }]);
