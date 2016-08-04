app.controller('addPersonCtrl', ['$scope', '$mdDialog','person','guid','$http',
function ($scope,$mdDialog,person,guid,$http) {

  $scope.cancel = function() {
   $mdDialog.cancel();
 };

 $scope.typePerson = person.getPerson();
 guid = guid.createGuid();

 $scope.addPerson = function(typePerson){
   $scope.error = "";
   var grado = true;
   var email = true;
   var rol = 0;

   if (typePerson === "Alumno") {rol = 3;}
   else if (typePerson === "Docente") {rol = 2;}
   else if (typePerson === "Acudiente") {rol = 4;}
   else {rol = 0;}

   if (typePerson === "Alumno") {
      if (!$scope.grado || !$scope.codigo) {
        grado = false;
      }
      if (!$scope.email) {
        $scope.email = "";
      }
   }

   if (typePerson !== "Alumno") {
     $scope.grado = "";
     $scope.codigo = "";
     if (!$scope.email) {
       email = false;
     }
   }

   isValidEmail = function (mail){
     return /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(mail);
   };

   if ($scope.nombres && $scope.apellidos && $scope.Fnacimiento && $scope.genero && email && grado && guid) {
     $scope.pass = Math.random().toString(36).slice(-8);

     if ($scope.email === "" || isValidEmail($scope.email)) {

       $http.post('servicios/insertPerson.php', {'rol': rol, 'nombres': $scope.nombres, 'apellidos': $scope.apellidos, 'Fnacimiento': $scope.Fnacimiento,  'genero': $scope.genero, 'email': $scope.email,  'grado': $scope.grado, 'guid':guid, 'pass':$scope.pass,'codigo':$scope.codigo})
           .success(function(data) {
             if(data.error){
               $scope.error = data.error;
             }else{

               $scope.success = "El " +typePerson+ " se creó correctamente";

             }
           });

     }else{
       $scope.error = "El Email es incorrecto";
     }


   }else{
     $scope.error = "Todos los campos son obligatorios";
   }


 };

}]);
