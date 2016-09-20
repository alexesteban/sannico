app.controller('addPhotoCtrl', ['$scope', '$mdDialog','person','$http',
function ($scope,$mdDialog,person,$http) {

  $scope.cancel = function() {
   $mdDialog.cancel();
 };

 $scope.typePerson = person.getPerson();

 $scope.uploadPhoto = function(){

   $scope.error="";

   if ($scope.photo && $scope.descripcion) {

     var imagen = "";
     var format = "";
     var updImg = 0;

     if ($scope.photo) {
       imagen = $scope.photo;
      }

      if (imagen !== "") {

        var img = new Image();
        img.src = imagen;
        img.addEventListener('load',function(){
            width=img.width;
            height=img.height;
        });

        if (($scope.photo).indexOf("jpg") === 11) {
          format = "jpg";
        }else if (($scope.photo).indexOf("jpeg") === 11) {
          format = "jpeg";
        }else if (($scope.photo).indexOf("png") === 11) {
          format = "png";
        }else if (($scope.photo).indexOf("gif") === 11) {
          format = "gif";
        }else {
          format = 0;
        }

        if (format !== 0) {
          if (img.width <= 1024 && img.height <= 850) {
            updImg = 1;
          }else{
            $scope.error = "El tamaño de la imágen es muy grande";
            $scope.photo = "";
            imagen = "";
          }
        }else{
          $scope.error = "Formato de la imágen Inválido";
          $scope.photo = "";
          imagen = "";
        }

      }

      if (updImg === 1) {
        $http.post('servicios/uploadPhoto.php', {'imagen': imagen, 'format': format, 'descripcion': $scope.descripcion, 'idGaleria': $scope.typePerson})
            .success(function(data) {
              if(data.error){
                $scope.error = data.error;
              }else{
                $scope.success = "La foto se agregó correctamente";
              }
            });
      }

   }else{
    $scope.error="Todos los campos son obligatorios";
   }

 };


}]);
