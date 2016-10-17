<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");
  $data = json_decode(file_get_contents("php://input"));
  $idTarea = mysqli_real_escape_string($conn, $data->idTarea);
  $guid_docente = mysqli_real_escape_string($conn, $data->guid_docente);


  //GET TAREA DATA
  $tareaResult = $conn->query("SELECT titulo, id_asignatura FROM tareas WHERE id = $idTarea");
  while ($row = $tareaResult->fetch_array(MYSQLI_ASSOC)) {
      $tituloTarea = $row["titulo"];
      $id_asignatura = $row["id_asignatura"];
  }

  //GET ASIGNATURA DATA
  $asignaturaResult = $conn->query("SELECT name, guid_docente,id_curso FROM asignaturas WHERE id = $id_asignatura");
  while ($row = $asignaturaResult->fetch_array(MYSQLI_ASSOC)) {
      $nameAsignatura = $row["name"];
      $DBguid_docente = $row["guid_docente"];
      $id_curso = $row["id_curso"];
  }

  //GET ROL USER
  $rolResult = $conn->query("SELECT rol FROM users WHERE guid = '$guid_docente'");
  while ($row = $rolResult->fetch_array(MYSQLI_ASSOC)) {
      $rolActualUser = $row["rol"];
  }

  //GET CURSO DATA
  $cursoResult = $conn->query("SELECT name FROM cursos WHERE id = $id_curso");
  while ($row = $cursoResult->fetch_array(MYSQLI_ASSOC)) {
      $nameCurso = $row["name"];
  }

  //GET STUDENTS
	$resultStudents = $conn->query("SELECT U.guid, U.avatar, U.nombres, U.apellidos, U.genero, CT.nota, CT.observaciones FROM students S
                                  INNER JOIN users U ON U.guid = S.guid
                                  LEFT JOIN calificaciones_tareas CT ON U.guid = CT.guid_alumno AND id_tarea = $idTarea
                                  WHERE grado = $id_curso");
  $arrayStudents = array();
  while($rs = $resultStudents->fetch_array(MYSQLI_ASSOC)) {
      $arrayStudents[] = $rs;
  }



  $obj = new stdClass();
  $obj->tituloTarea = $tituloTarea;
  $obj->nameAsignatura = $nameAsignatura;
  $obj->nameCurso = $nameCurso;
  $obj->students = $arrayStudents;


  if ($DBguid_docente == $guid_docente || $rolActualUser == 1) {
      $salida = json_encode($obj);
  }else{
      $salida = json_encode(array('error' => 'El usuario no tiene permisos para hacer la calificación de esta asignatura'));
  }

  $conn->close();
  print_r($salida);









  /*
  $rs = $result->fetch_array(MYSQLI_ASSOC);

  $miArray = array(
      'titulo' 		=> $rs["titulo"],
      'descripcion' 		=> $rs["descripcion"],
      'entrega' 		=> $rs["entrega"],
      'porcentaje' 		=> $rs["porcentaje"],
      'publica' 		=> $rs["publica"],
      'id_asignatura' 		=> $rs["id_asignatura"]
  );


  $salida = json_encode($miArray);
  $conn->close();
  print_r($salida);
  */

?>
