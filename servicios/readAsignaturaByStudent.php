<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");
  $data = json_decode(file_get_contents("php://input"));
  $idAsignatura = mysqli_real_escape_string($conn, $data->idAsignatura);
  $guidAlumno = mysqli_real_escape_string($conn, $data->guidAlumno);


  //GET STUDENT DATA
  $studentResult = $conn->query("SELECT U.avatar, U.genero, U.nombres, U.apellidos, C.name AS cursoAlumno  FROM users U
                                    INNER JOIN students S ON U.guid = S.guid
                                    INNER JOIN cursos C ON C.id = S.grado
                                    WHERE U.guid = '$guidAlumno'");
  while ($row = $studentResult->fetch_array(MYSQLI_ASSOC)) {
      $avatarAlumno = $row["avatar"];
      $generoAlumno = $row["genero"];
      $nombresAlumno = $row["nombres"]." ".$row["apellidos"];
      $cursoAlumno = $row["cursoAlumno"];
  }

  //GET ASIGNATURA DATA
  $asignaturaResult = $conn->query("SELECT name, guid_docente FROM asignaturas WHERE id = $idAsignatura");
  while ($row = $asignaturaResult->fetch_array(MYSQLI_ASSOC)) {
      $nombreAsignatura = $row["name"];
      $DBguid_docente = $row["guid_docente"];
  }

  //GET TAREAS
	$resultTareas = $conn->query("SELECT * FROM tareas T
                                LEFT JOIN calificaciones_tareas CT ON CT.id_tarea = T.id AND CT.guid_alumno = '$guidAlumno'
                                WHERE T.id_asignatura = $idAsignatura AND T.publica = 1");
  $arrayTareas = array();
  while($rs = $resultTareas->fetch_array(MYSQLI_ASSOC)) {
      $arrayTareas[] = $rs;
  }

  //GET EVALUACIONES
	$resultEvaluaciones = $conn->query("SELECT * FROM evaluaciones E
                                      LEFT JOIN calificaciones_evaluaciones CE ON CE.id_evaluacion = E.id AND CE.guid_alumno = '$guidAlumno'
                                      WHERE E.id_asignatura = $idAsignatura AND E.publica = 1");
  $arrayEvaluaciones = array();
  while($rs = $resultEvaluaciones->fetch_array(MYSQLI_ASSOC)) {
      $arrayEvaluaciones[] = $rs;
  }

  $obj = new stdClass();
  $obj->avatarAlumno = $avatarAlumno;
  $obj->generoAlumno = $generoAlumno;
  $obj->nombresAlumno = $nombresAlumno;
  $obj->cursoAlumno = $cursoAlumno;
  $obj->nombreAsignatura = $nombreAsignatura;
  $obj->tareas = $arrayTareas;
  $obj->evaluaciones = $arrayEvaluaciones;

  $salida = json_encode($obj);

  $conn->close();
  print_r($salida);


?>
