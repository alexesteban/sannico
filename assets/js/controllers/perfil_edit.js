app.controller('perfilEditCtrl', ['$scope','$routeParams','$http','person','$mdDialog',
function ($scope,$routeParams,$http,person,$mdDialog) {

  $scope.guid = $routeParams.guid;

  $scope.tipoDoc = [
    {
      "name" : "T.I."
    },
    {
      "name" : "C.C."
    }
  ];

  $scope.initPerson = function() {
    /*Data favoritos*/
    $http.post("servicios/readPerson.php", {'guid': $scope.guid })
      .success(function(data){

        if (data.error) {
          $scope.error = data.error;
        }else{
          $scope.nombres = data.nombres;
          $scope.apellidos = data.apellidos;
          $scope.avatar = data.avatar;
          $scope.celular = data.celular;
          $scope.telefono = data.telefono;
          $scope.email = data.email;
          $scope.genero = data.genero;
          $scope.nacimiento = data.nacimiento;
          $scope.rol = data.rol;
          $scope.id = data.id;
          $scope.documento = data.documento;
          $scope.escivil = data.escivil;
          $scope.docdireccionumento = data.direccion;
        }

      })
      .error(function(){
        $scope.error = "Error: No hay Datos" ;
    });
    /*End Data favoritos*/
  };

  $scope.initAcudientes = function() {
    /*Data favoritos*/
    $http.post("servicios/readAcudientesForStudent.php", {'guid': $scope.guid })
      .success(function(data){

        if (data.error) {
          $scope.error = data.error;
        }else{
          $scope.acudientes = data;
        }

      })
      .error(function(){
        $scope.error = "Error: No hay Datos" ;
    });
    /*End Data favoritos*/
  };

    $scope.initPerson();
    $scope.initAcudientes();

    $scope.addFather = function(ev,p) {
       person.setPerson(p);
       $mdDialog.show({
         controller: 'chooseFatherCtrl',
         templateUrl: 'views/choose_father.html',
         parent: angular.element(document.body),
         targetEvent: ev,
         clickOutsideToClose:true
       })
       .then(function(answer) {
         $scope.initPerson();
         $scope.initAcudientes();
       }, function() {
         $scope.initPerson();
         $scope.initAcudientes();
       });
    };

    $scope.deleteFather = function(guidFather) {
      $http.post('servicios/deleteFatherByStudent.php',{'guid_student': $scope.guid, 'guid_father': guidFather})
          .success(function(data) {
            if(data.error){
              $scope.error = data.error;
            }else{
               $scope.initAcudientes();
            }
          });
    };


}]);
