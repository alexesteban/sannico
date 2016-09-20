app.controller('galeriaAdmCtrl', ['$scope','$mdDialog','$mdMedia','person','$routeParams','$http',
function ($scope,$mdDialog,$mdMedia,person,$routeParams,$http) {

  var idGaleria = $routeParams.id;

  var originatorEv;
   $scope.openMenu = function($mdOpenMenu, ev) {
     originatorEv = ev;
     $mdOpenMenu(ev);
   };

   $scope.addPhoto = function(ev,p) {
     person.setPerson(p);
    $mdDialog.show({
      controller: 'addPhotoCtrl',
      templateUrl: 'views/add_photo.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
    .then(function(answer) {
      $scope.initPhotos();
    }, function() {
        $scope.initPhotos();
    });
  };

  $scope.initPhotos = function(){

    $http.post('servicios/readPhotos.php',{'id':idGaleria})
        .success(function(data) {
          if (data.error) {
            $scope.error = data.error;
          }else{
            $scope.photos = data;
          }
        });

      $http.post('servicios/readGaleria.php',{'id':idGaleria})
          .success(function(data) {
            if (data.error) {
              $scope.error = data.error;
            }else{
              $scope.galeria = data;
            }
        });

  };

  $scope.initPhotos();



}]);
