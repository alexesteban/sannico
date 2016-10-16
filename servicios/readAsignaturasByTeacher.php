<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");
  $data = json_decode(file_get_contents("php://input"));
  $guidDocente = mysqli_real_escape_string($conn, $data->guidDocente);

  //GET ACTUAL YEAR
  $yearResult = $conn->query("SELECT actual_year FROM contenido WHERE id = 1");
  while ($row = $yearResult->fetch_array(MYSQLI_ASSOC)) {
      $year = $row["actual_year"];
  }

	$result = $conn->query("SELECT A.id AS idAsignatura, A.name AS nameAsignatura, A.id_curso, C.name AS nameCurso, (SELECT count(*) FROM students WHERE grado = A.id_curso) AS cantAlumnos FROM asignaturas A
                            LEFT JOIN cursos C ON C.id = A.id_curso
                            WHERE A.guid_docente = '$guidDocente' AND A.year = '$year'");
  $miArray = array();
  while($rs = $result->fetch_array(MYSQLI_ASSOC)) {

      $miArray[] = $rs;

  }


  $salida = json_encode($miArray);
  $conn->close();
  print_r($salida);

?>
