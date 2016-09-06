app.controller('docentesAdmCtrl', ['$scope','$mdDialog','$mdMedia','person','$http',
function ($scope,$mdDialog,$mdMedia,person,$http) {

  var originatorEv;
   $scope.openMenu = function($mdOpenMenu, ev) {
     originatorEv = ev;
     $mdOpenMenu(ev);
   };

   $scope.addTeacher = function(ev,p) {
    person.setPerson(p);
    $mdDialog.show({
      controller: 'addPersonCtrl',
      templateUrl: 'views/add_person.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
    .then(function(answer) {
      $scope.initDocentes();
    }, function() {
      $scope.initDocentes();
    });
  };


$scope.initDocentes = function() {
  /*Data favoritos*/
  $http.post("servicios/readDocentes.php")
    .success(function(respuesta){

      if (respuesta.error) {
        $scope.error = respuesta.error;
      }else{
        $scope.docentes = respuesta;

        $scope.edad = function(Fecha){
          fecha = new Date(Fecha);
          hoy = new Date();
          ed = parseInt((hoy -fecha)/365/24/60/60/1000);
          return ed;
        };

        for (var i = 0; i < respuesta.length; i++) {
          var docentes = $scope.docentes[i];
          var data = respuesta[i];

          docentes.nombres = data.nombres;
          docentes.apellidos = data.apellidos;
          docentes.edad = $scope.edad(data.nacimiento);

        }

      }

    })
    .error(function(){
      $scope.misEmpresas = "Error: No hay Datos" ;
  });
  /*End Data favoritos*/
};

  $scope.initDocentes();


}]);
