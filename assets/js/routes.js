app.config(['$routeProvider',
function($routeProvider) {
  $routeProvider.
  when('/', {
    templateUrl: 'views/home.html',
    controller: 'homeCtrl'
  }).
  when('/nosotros', {
    templateUrl: 'views/nosotros.html',
    controller: 'nosotrosCtrl'
  }).
  when('/cronograma', {
    templateUrl: 'views/cronograma.html',
    controller: 'cronogramaCtrl'
  }).
  when('/docentes', {
    templateUrl: 'views/docentes.html',
    controller: 'docentesCtrl'
  }).
  when('/galeria', {
    templateUrl: 'views/galeria.html',
    controller: 'galeriaCtrl'
  }).
  when('/login', {
    templateUrl: 'views/login.html',
    controller: 'loginCtrl'
  }).
  when('/evento/:idEvento', {
    templateUrl: 'views/evento.html',
    controller: 'eventoCtrl'
  }).
  when('/album/:idAlbum', {
    templateUrl: 'views/album.html',
    controller: 'albumCtrl'
  }).
  when('/dashboard/:idUser', {
    templateUrl: 'views/dashboard.html',
    controller: 'dashboardCtrl'
  }).
  when('/docentes_adm', {
    templateUrl: 'views/docentes_adm.html',
    controller: 'docentesAdmCtrl'
  }).
  when('/perfil_edit/:id', {
    templateUrl: 'views/perfil_edit.html',
    controller: 'perfilEditCtrl'
  }).
  otherwise({
    redirectTo: '/'
  });
}]);
