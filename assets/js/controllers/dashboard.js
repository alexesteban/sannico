app.controller('dashboardCtrl', ['$scope','$http','$routeParams','$cookies',
function ($scope,$http,$routeParams,$cookies) {

  var log = $cookies.get('logued');

  if (log) {
    if (log ===  $routeParams.idUser) {
      $scope.callRol();
      var id = log;
    }else{
      $scope.logout();
    }
  }else{
    $scope.logout();
  }


  $scope.initCounts = function() {
    $scope.error = "";
    if(id) {
      $http.post("servicios/readCounts.php",{"id": id})
        .success(function(data){
          if (data.error) {
            $scope.error = data.error;
          }else{
            $scope.events = data.events;
            $scope.father = data.father;
            $scope.owner_photos = data.owner_photos;
            $scope.photos = data.photos;
            $scope.student = data.student;
            $scope.teacher = data.teacher;
          }
        })
        .error(function(){
          $scope.error = "Error: No hay Datos" ;
      });
    }else{
      $scope.logout();
    }
  };

    $scope.initCounts();

    $scope.students = function() {
      if(id) {
        $http.post("servicios/readAlumnsForAcudient.php",{"guid": id})
          .success(function(data){
            if (data.error) {
              $scope.error = data.error;
            }else{
              $scope.alumnos = data;

              $scope.edad = function(Fecha){
                fecha = new Date(Fecha);
                hoy = new Date();
                ed = parseInt((hoy -fecha)/365/24/60/60/1000);
                return ed;
              };

              for (var i = 0; i < data.length; i++) {
                var alumnos = $scope.alumnos[i];
                var respuesta = data[i];
                alumnos.nacimiento = $scope.edad(respuesta.nacimiento);
              }

            }
          })
          .error(function(){
            $scope.error = "Error: No hay Datos" ;
        });
      }else{
        $scope.logout();
      }
    };



}]);
