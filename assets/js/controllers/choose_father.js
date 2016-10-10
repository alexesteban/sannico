app.controller('chooseFatherCtrl', ['$scope', '$mdDialog','person','$http',
function ($scope,$mdDialog,person,$http) {

  $scope.cancel = function() {
   $mdDialog.cancel();
 };

 $scope.guid_student = person.getPerson();

 $http.post('servicios/readAcudientesByStudent.php',{'guid_student': $scope.guid_student})
     .success(function(data) {
       if(data.error){
         $scope.error = data.error;
       }else{
         $scope.fathers = data;
       }
     });

  $scope.chooseFather = function(guid) {
    $http.post('servicios/insertFatherByStudent.php',{'guid_student': $scope.guid_student, 'guid_father': guid})
        .success(function(data) {
          if(data.error){
            $scope.error = data.error;
          }else{
            $mdDialog.cancel();
          }
        });
  };


}]);
