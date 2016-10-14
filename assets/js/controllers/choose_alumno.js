app.controller('chooseAlumnoCtrl', ['$scope', '$mdDialog','person','$http',
function ($scope,$mdDialog,person,$http) {

  $scope.cancel = function() {
   $mdDialog.cancel();
 };

 $scope.guid_father = person.getPerson();

 $http.post('servicios/readAlumnosByAcudiente.php',{'guid_father': $scope.guid_father})
     .success(function(data) {
       if(data.error){
         $scope.error = data.error;
       }else{
         $scope.alumnos = data;
       }
     });

  $scope.chooseAlumno = function(guid) {
    $http.post('servicios/insertAlumnoByfather.php',{'guid_father': $scope.guid_father, 'guid_student': guid})
        .success(function(data) {
          if(data.error){
            $scope.error = data.error;
          }else{
            $mdDialog.cancel();
          }
        });
  };


}]);
