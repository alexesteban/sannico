app.controller('appAdmCtrl', ['$scope','$mdMedia','$mdDialog','person','$http',
function ($scope,$mdMedia,$mdDialog,person,$http) {

  $scope.openMenu = function($mdOpenMenu, ev) {
    originatorEv = ev;
    $mdOpenMenu(ev);
  };

  $scope.addPeriodo = function(ev) {
   $mdDialog.show({
     controller: 'addPeriodoCtrl',
     templateUrl: 'views/add_periodo.html',
     parent: angular.element(document.body),
     targetEvent: ev,
     clickOutsideToClose:true
   })
   .then(function(answer) {
      $scope.initPeriodos();
   }, function() {
      $scope.initPeriodos();
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
         $scope.year = data.year;
         $scope.actual_periodo = data.actual_periodo;
       }

     })
     .error(function(){
       $scope.error = "Error: No hay Datos" ;
   });

 };

 $scope.initPeriodos = function(){
   $scope.errorCont = "";
   $http.post("servicios/readPeriodos.php")
     .success(function(data){
       if (data.error) {
         $scope.errorCont = data.error;
       }else{
         $scope.periodos = data;
       }
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
 $scope.initPeriodos();

 $scope.updYear = function(){
   $http.post("servicios/updYear.php", {"year": $scope.year})
     .success(function(data){
       if (data.error) {
         $scope.errorCont = data.error;
       }else{
         $scope.successYear = "Los Datos se actualizaron correctamente";
       }
     });
 };

 $scope.updPeridoo = function(){
   $http.post("servicios/updPeriodo.php", {"actual_periodo": $scope.actual_periodo})
     .success(function(data){
       if (data.error) {
         $scope.errorCont = data.error;
       }else{
         $scope.successPeriodo = "Los Datos se actualizaron correctamente";
       }
     });
 };

 $scope.deletePeriodo = function(ev,id) {
   // Appending dialog to document.body to cover sidenav in docs app
     var confirm = $mdDialog.confirm()
           .title('Quieres Eliminar el periodo?')
           .textContent('Si lo eliminas, podrán generarse inconsistencias en las notas y ponderados')
           .ariaLabel('Lucky day')
           .targetEvent(ev)
           .ok('ELIMINAR')
           .cancel('CANCELAR');
     $mdDialog.show(confirm).then(function() {


       $http.post("servicios/deletePeriodo.php", {"id": id})
         .success(function(data){
           if (data.error) {
             $scope.errorCont = data.error;
           }else{
             $scope.initPeriodos();
           }
         });

     }, function() {

     });
 };

}]);
