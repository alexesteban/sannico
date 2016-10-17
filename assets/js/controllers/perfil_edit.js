app.controller('perfilEditCtrl', ['$scope','$routeParams','$http','person','$mdDialog','$timeout','$cookies',
function ($scope,$routeParams,$http,person,$mdDialog,$timeout,$cookies) {

  $scope.guid = $routeParams.guid;

  $scope.tipoDoc = [
    {
      "name" : "T.I."
    },
    {
      "name" : "C.C."
    }
  ];

  $scope.getRolSession = function() {
    $http.post("servicios/rol.php", {'guid': $cookies.get('logued')})
      .success(function(respuesta){

        $scope.rolSession = respuesta[0].rol;

      })
      .error(function(){
        $scope.rol = 0;
    });
  };

  $scope.initPerson = function() {
    /*Data favoritos*/
    $http.post("servicios/readPerson.php", {'guid': $scope.guid })
      .success(function(data){

        if (data.error) {
          $scope.error = data.error;
        }else{
          $scope.nombres = data.nombres;
          $scope.apellidos = data.apellidos;
          $scope.avatar = data.avatar;
          $scope.celular = data.celular;
          $scope.telefono = data.telefono;
          $scope.email = data.email;
          $scope.genero = data.genero;
          $scope.nacimiento = data.nacimiento;
          $scope.rol = data.rol;
          $scope.id = data.id;
          $scope.documento = data.documento;
          $scope.escivil = data.escivil;
          $scope.direccion = data.direccion;
          $scope.curso = data.curso;
          $scope.grado = data.grado;
          $scope.codigo = data.codigo;
          $scope.myCroppedImage='';
        }

      })
      .error(function(){
        $scope.error = "Error: No hay Datos" ;
    });
    /*End Data favoritos*/
  };

  $scope.initAcudientes = function() {
    $http.post("servicios/readAcudientesForStudent.php", {'guid': $scope.guid })
      .success(function(data){
        if (data.error) {
          $scope.error = data.error;
        }else{
          $scope.acudientes = data;
        }
      })
      .error(function(){
        $scope.error = "Error: No hay Datos" ;
    });
  };

  $scope.initAlumnos = function() {
    $http.post("servicios/readAlumnsForAcudient.php", {'guid': $scope.guid })
      .success(function(data){
        if (data.error) {
          $scope.error = data.error;
        }else{
          $scope.alumnos = data;
        }
      })
      .error(function(){
        $scope.error = "Error: No hay Datos" ;
    });
  };

  $scope.initAcademicAd = function() {
    $http.post("servicios/readAcademicAdults.php", {'guid': $scope.guid })
      .success(function(data){

        if (data.error) {
          $scope.error = data.error;
        }else{
          $scope.nivel_academico = data.nivel_academico;
          $scope.programa_academico = data.programa_academico;
          $scope.institucion = data.institucion;
          $scope.fecha_grado = new Date(data.fecha_grado);
          $scope.titulo = data.titulo;
          $scope.idAcademicAd = data.id;
        }

      })
      .error(function(){
        $scope.error = "Error: No hay Datos" ;
    });
  };

  $scope.initAcademicAlumno = function() {
    $http.post("servicios/readAsignaturasByAlumno.php", {'guid': $scope.guid })
      .success(function(data){

        if (data.error) {
          $scope.error = data.error;
        }else{
          $scope.asignaturas = data;
        }

      })
      .error(function(){
        $scope.error = "Error: No hay Datos" ;
    });
  };

  $scope.initLaboralAd = function() {
    $http.post("servicios/readLaboralAdults.php", {'guid': $scope.guid })
      .success(function(data){

        if (data.error) {
          $scope.error = data.error;
        }else{
          $scope.nombre_empresa = data.nombre_empresa;
          $scope.cargo = data.cargo;
          $scope.funcion = data.funcion;
          $scope.fecha_inicio = new Date(data.fecha_inicio);
          $scope.fecha_fin = new Date(data.fecha_fin);
          $scope.idLaboralAd = data.id;
        }

      })
      .error(function(){
        $scope.error = "Error: No hay Datos" ;
    });
  };

  $scope.initInfoMedica = function() {
    $http.post("servicios/readInfoMedica.php", {'guid': $scope.guid })
      .success(function(data){

        if (data.error) {
          $scope.error = data.error;
        }else{
          $scope.altura = data.altura;
          $scope.peso = data.peso;
          $scope.rh = data.rh;
          $scope.eps = data.eps;
          $scope.clinica = data.clinica;
          $scope.medico = data.medico;
          $scope.telefono_medico = data.telefono_medico;
          $scope.observaciones = data.observaciones;
          $scope.nombre_contacto = data.nombre_contacto;
          $scope.telefono_contacto = data.telefono_contacto;
          $scope.idinfoMedica = data.id;
        }

      })
      .error(function(){
        $scope.error = "Error: No hay Datos" ;
    });
  };

    $scope.getRolSession();
    $scope.initPerson();
    $scope.initAcudientes();
    $scope.initAcademicAd();
    $scope.initAcademicAlumno();
    $scope.initLaboralAd();
    $scope.initInfoMedica();
    $scope.initAlumnos();

    $scope.readCursos = function(){
      $http.post('servicios/readCursos.php')
          .success(function(data) {
            if(data.error){
              $scope.error = data.error;
            }else{
              $scope.cursos = data;
            }
          });
    };

    $scope.readCursos();

    $scope.addFather = function(ev,p) {
       person.setPerson(p);
       $mdDialog.show({
         controller: 'chooseFatherCtrl',
         templateUrl: 'views/choose_father.html',
         parent: angular.element(document.body),
         targetEvent: ev,
         clickOutsideToClose:true
       })
       .then(function(answer) {
         $scope.initPerson();
         $scope.initAcudientes();
       }, function() {
         $scope.initPerson();
         $scope.initAcudientes();
       });
    };

    $scope.addAlumno = function(ev,p) {
       person.setPerson(p);
       $mdDialog.show({
         controller: 'chooseAlumnoCtrl',
         templateUrl: 'views/choose_alumno.html',
         parent: angular.element(document.body),
         targetEvent: ev,
         clickOutsideToClose:true
       })
       .then(function(answer) {
         $scope.initPerson();
         $scope.initAlumnos();
       }, function() {
         $scope.initPerson();
         $scope.initAlumnos();
       });
    };

    $scope.deleteFather = function(guidFather) {
      $http.post('servicios/deleteFatherByStudent.php',{'guid_student': $scope.guid, 'guid_father': guidFather})
          .success(function(data) {
            if(data.error){
              $scope.error = data.error;
            }else{
               $scope.initAcudientes();
            }
          });
    };

    $scope.deleteAlumno = function(guidAlumno) {
      $http.post('servicios/deleteAlumnoByFather.php',{'guid_father': $scope.guid, 'guid_student': guidAlumno})
          .success(function(data) {
            if(data.error){
              $scope.error = data.error;
            }else{
               $scope.initAlumnos();
            }
          });
    };

    $scope.updateUser = function(){
      $scope.successUpdDatosPersonales = "";

      $scope.telefono = (!$scope.telefono) ? "" : $scope.telefono;
      $scope.celular = (!$scope.celular) ?  "" :  $scope.celular;
      $scope.escivil = (!$scope.escivil) ?  "" :  $scope.escivil;
      $scope.direccion = (!$scope.direccion) ?  "" :  $scope.direccion;

      if($scope.nombres && $scope.documento && $scope.email && $scope.apellidos){
        $http.post('servicios/updUser.php',{'guid': $scope.guid, 'nombres':$scope.nombres, 'documento': $scope.documento, 'telefono': $scope.telefono, 'celular': $scope.celular, 'email': $scope.email, 'apellidos': $scope.apellidos, 'escivil': $scope.escivil, 'direccion': $scope.direccion, 'grado': $scope.grado, 'rol': $scope.rol})
            .success(function(data) {
              if(data.error){
                $scope.error = data.error;
              }else{
                $scope.initPerson();
                $scope.successUpdDatosPersonales = "Se actualizaron los datos correctamente";
              }
            });
      }else{
        $scope.errUser = "Diligencie todos los campos obligatorios";
      }

    };

    $scope.updAcademicAdult = function(idInfo){
      if (idInfo) {
        $http.post('servicios/updAcademicAdult.php',{'id': idInfo, 'nivel_academico': $scope.nivel_academico, 'institucion': $scope.institucion, 'programa_academico': $scope.programa_academico,  'fecha_grado': $scope.fecha_grado, 'titulo': $scope.titulo})
            .success(function(data) {
              if(data.error){
                $scope.error = data.error;
              }else{
                console.log("Se actualizaron los datos");
              }
            });
      }else{
        $http.post('servicios/insertAcademicAdult.php', {'guid': $scope.guid, 'nivel_academico': $scope.nivel_academico, 'institucion': $scope.institucion, 'programa_academico': $scope.programa_academico,  'fecha_grado': $scope.fecha_grado, 'titulo': $scope.titulo})
            .success(function(data) {
              if(data.error){
                $scope.error = data.error;
              }else{

              }
            });
      }
    };

    $scope.updLaboralAdult = function(idInfo){
      if (idInfo) {
        $http.post('servicios/updLaboralAdult.php',{'id': idInfo, 'nombre_empresa': $scope.nombre_empresa, 'cargo': $scope.cargo, 'fecha_inicio': $scope.fecha_inicio,  'fecha_fin': $scope.fecha_fin, 'funcion': $scope.funcion})
            .success(function(data) {
              if(data.error){
                $scope.error = data.error;
              }else{
                console.log("Se actualizaron los datos");
              }
            });
      }else{
        $http.post('servicios/insertLaboralAdult.php', {'guid': $scope.guid, 'nombre_empresa': $scope.nombre_empresa, 'cargo': $scope.cargo, 'fecha_inicio': $scope.fecha_inicio,  'fecha_fin': $scope.fecha_fin, 'funcion': $scope.funcion})
            .success(function(data) {
              if(data.error){
                $scope.error = data.error;
              }else{

              }
            });
      }
    };

    $scope.updInfoMedica = function(idInfo){
      if (idInfo) {
        $http.post('servicios/updInfoMedica.php',{'id': idInfo, 'altura': $scope.altura, 'peso': $scope.peso, 'rh': $scope.rh,  'eps': $scope.eps, 'clinica': $scope.clinica, 'medico': $scope.medico, 'telefono_medico': $scope.telefono_medico, 'observaciones': $scope.observaciones, 'nombre_contacto': $scope.nombre_contacto, 'telefono_contacto': $scope.telefono_contacto})
            .success(function(data) {
              if(data.error){
                $scope.error = data.error;
              }else{
                console.log("Se actualizaron los datos");
              }
            });
      }else{
        $http.post('servicios/insertInfoMedica.php', {'guid': $scope.guid, 'altura': $scope.altura, 'peso': $scope.peso, 'rh': $scope.rh,  'eps': $scope.eps, 'clinica': $scope.clinica, 'medico': $scope.medico, 'telefono_medico': $scope.telefono_medico, 'observaciones': $scope.observaciones, 'nombre_contacto': $scope.nombre_contacto, 'telefono_contacto': $scope.telefono_contacto})
            .success(function(data) {
              if(data.error){
                $scope.error = data.error;
              }else{

              }
            });
      }
    };


/* CHANGE AVATAR */
          $scope.myImage='';
          $scope.myCroppedImage='';

           var handleFileSelect=function(evt) {
             var file=evt.currentTarget.files[0];
             var reader = new FileReader();
             reader.onload = function (evt) {
               $scope.$apply(function($scope){
                 $scope.myImage=evt.target.result;
               });
             };
             reader.readAsDataURL(file);

             $scope.updAvatar();

           };
           angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
/* END CHANGE AVATAR */


$scope.updAvatar = function() {
  $timeout(function () {

    $http.post("servicios/updAvatar.php", {'avatar': $scope.myCroppedImage,'guid': $scope.guid})
    .success(function(respuesta){
      if (respuesta) {
        if (respuesta.error) {
          $scope.avError = respuesta.error;
        }else{
          $scope.avError = "";
          $scope.avSucces = "Has actualizado tu Avatar";
          $scope.callAvatar();
        }
      }else{
        $scope.avError = "No se actualizaron los Datos" ;
      }
    });

  }, 500);
};

}]);
