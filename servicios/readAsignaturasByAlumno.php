<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");
  $data = json_decode(file_get_contents("php://input"));
  $guidAlumno = mysqli_real_escape_string($conn, $data->guid);

  //GET ID_CURSO
  $cursoResult = $conn->query("SELECT grado FROM students WHERE guid = '$guidAlumno'");
  while ($row = $cursoResult->fetch_array(MYSQLI_ASSOC)) {
      $idCurso = $row["grado"];
  }

  //GET ACTUAL YEAR
  $yearResult = $conn->query("SELECT actual_year FROM contenido WHERE id = 1");
  while ($row = $yearResult->fetch_array(MYSQLI_ASSOC)) {
      $year = $row["actual_year"];
  }

  if (isset($idCurso)) {
    $result = $conn->query("SELECT  A.id, A.name, U.nombres AS nombres_docente, U.apellidos AS apellidos_docente, P.nota FROM asignaturas A
                            LEFT JOIN users U ON U.guid = A.guid_docente
                            LEFT JOIN promedios P ON P.id_asignatura = A.id AND P.guid_alumno = '$guidAlumno'
                            WHERE id_curso = $idCurso AND A.year = '$year'");
    $miArray = array();
    while($rs = $result->fetch_array(MYSQLI_ASSOC)) {

        $miArray[] = $rs;

    }
  }else {
    $miArray = array();
  }

  $salida = json_encode($miArray);
  $conn->close();
  print_r($salida);

?>
