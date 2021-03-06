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
  when('/perfil_edit/:guid', {
    templateUrl: 'views/perfil_edit.html',
    controller: 'perfilEditCtrl'
  }).
  when('/alumnos', {
    templateUrl: 'views/alumnos.html',
    controller: 'alumnosCtrl'
  }).
  when('/asignatura/:idAsignatura/:guidAlumno', {
    templateUrl: 'views/asignatura.html',
    controller: 'asignaturaCtrl'
  }).
  when('/asignaturas', {
    templateUrl: 'views/asignaturas.html',
    controller: 'asignaturasCtrl'
  }).
  when('/adm_asignatura/:idAsignatura/:idCurso', {
    templateUrl: 'views/adm_asignatura.html',
    controller: 'admAsignaturaCtrl'
  }).
  when('/asignaturas_adm', {
    templateUrl: 'views/asignaturas_adm.html',
    controller: 'asignaturasAdmCtrl'
  }).
  when('/calificar-tarea/:idTarea', {
    templateUrl: 'views/calificar-tarea.html',
    controller: 'calificarTareaCtrl'
  }).
  when('/calificar-evaluacion/:idEvaluacion', {
    templateUrl: 'views/calificar-evaluacion.html',
    controller: 'calificarEvaluacionCtrl'
  }).
  when('/calificar-promedio/:idAsignatura', {
    templateUrl: 'views/calificar-promedio.html',
    controller: 'calificarPromedioCtrl'
  }).
  when('/acudientes', {
    templateUrl: 'views/acudientes.html',
    controller: 'acudientesCtrl'
  }).
  when('/cronograma_adm', {
    templateUrl: 'views/cronograma_adm.html',
    controller: 'cronogramaAdmCtrl'
  }).
  when('/galerias_adm', {
    templateUrl: 'views/galerias_adm.html',
    controller: 'galeriasAdmCtrl'
  }).
  when('/galeria_adm/:id', {
    templateUrl: 'views/galeria_adm.html',
    controller: 'galeriaAdmCtrl'
  }).
  when('/curso_adm/:idCurso', {
    templateUrl: 'views/curso_adm.html',
    controller: 'cursoAdmCtrl'
  }).
  when('/app_adm', {
    templateUrl: 'views/app_adm.html',
    controller: 'appAdmCtrl'
  }).
  when('/publicaciones_adm', {
    templateUrl: 'views/publicaciones_adm.html',
    controller: 'publicacionesAdmCtrl'
  }).
  otherwise({
    redirectTo: '/'
  });
}]);
