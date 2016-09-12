app.controller('addEventCtrl', ['$scope', '$mdDialog','person','$http',
function ($scope,$mdDialog,person,$http) {

  $scope.cancel = function() {
   $mdDialog.cancel();
 };

 $scope.typePerson = person.getPerson();

 $scope.addEvent = function(){

   $scope.error="";

   if ($scope.typePerson === "Crear") {


     if ($scope.titulo, $scope.fecha, $scope.hora, $scope.lugar, $scope.imgEvent, $scope.descripcion) {

       var imagen = "";
       var format = "";
       var updImg = 0;

       if ($scope.imgEvent) {
         imagen = $scope.imgEvent;
        }

        if (imagen !== "") {

          var img = new Image();
          img.src = imagen;
          img.addEventListener('load',function(){
              width=img.width;
              height=img.height;
          });

          if (($scope.imgEvent).indexOf("jpg") === 11) {
            format = "jpg";
          }else if (($scope.imgEvent).indexOf("jpeg") === 11) {
            format = "jpeg";
          }else if (($scope.imgEvent).indexOf("png") === 11) {
            format = "png";
          }else if (($scope.imgEvent).indexOf("gif") === 11) {
            format = "gif";
          }else {
            format = 0;
          }

          if (format !== 0) {
            if (img.width === 600 && img.height === 400) {
              updImg = 1;
            }else{
              $scope.error = "El tamaño de la imágen debe ser de 600px x 400px";
              $scope.imgEvent = "";
              imagen = "";
            }
          }else{
            $scope.error = "Formato de la imágen Inválido";
            $scope.imgEvent = "";
            imagen = "";
          }

        }

        if (updImg === 1) {
          $http.post('servicios/insertEvent.php', {'titulo': $scope.titulo, 'fecha': $scope.fecha, 'hora': $scope.hora, 'lugar': $scope.lugar,  'imagen': imagen, 'format': format, 'descripcion': $scope.descripcion})
              .success(function(data) {
                if(data.error){
                  $scope.error = data.error;
                }else{
                  $scope.success = "El Evento se creó correctamente";
                }
              });
        }

     }else{
      $scope.error="Todos los campos son obligatorios";
     }


   }

 };

}]);
