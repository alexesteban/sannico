app.controller('appAdmCtrl', ['$scope','$mdMedia','$mdDialog','person','$http',
function ($scope,$mdMedia,$mdDialog,person,$http) {

  $scope.openMenu = function($mdOpenMenu, ev) {
    originatorEv = ev;
    $mdOpenMenu(ev);
  };

  $scope.edit = function(ev,$tipo) {
  person.setPerson($tipo);
   $mdDialog.show({
     controller: 'addPeriodoCtrl',
     templateUrl: 'views/add_periodo.html',
     parent: angular.element(document.body),
     targetEvent: ev,
     clickOutsideToClose:true
   })
   .then(function(answer) {
     $scope.status = 'You said the information was "' + answer + '".';
   }, function() {
     $scope.status = 'You cancelled the dialog.';
   });
 };

 $scope.initContenido = function(){
   $scope.errorCont = "";
   $http.post("servicios/readContenido.php")
     .success(function(data){

       if (data.error) {
         $scope.errorCont = data.error;
       }else{
         $scope.institucional = data.institucional;
         $scope.mision = data.mision;
         $scope.vision = data.vision;
         $scope.servicios = data.servicios;
       }

     })
     .error(function(){
       $scope.error = "Error: No hay Datos" ;
   });

 };

 $scope.updContenido = function(){
   $scope.errorCont = "";
   if ($scope.institucional && $scope.mision && $scope.vision && $scope.servicios) {
     $http.post("servicios/updContenido.php", {"institucional": $scope.institucional,"mision": $scope.mision,"vision": $scope.vision,"servicios": $scope.servicios})
       .success(function(data){
         if (data.error) {
           $scope.errorCont = data.error;
         }else{
           $scope.successCon = "Los Datos se actualizaron correctamente";
         }
       });
   }else{
      $scope.errorCont = "Todos los datos son obligatorios";
   }
 };

 $scope.initContenido();



}]);
