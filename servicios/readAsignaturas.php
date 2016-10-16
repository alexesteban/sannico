<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");
  $data = json_decode(file_get_contents("php://input"));
  $id = mysqli_real_escape_string($conn, $data->id);

  //GET ACTUAL YEAR
  $yearResult = $conn->query("SELECT actual_year FROM contenido WHERE id = 1");
  while ($row = $yearResult->fetch_array(MYSQLI_ASSOC)) {
      $year = $row["actual_year"];
  }

	$result = $conn->query("SELECT A.id, A.name, A.guid_docente, A.id_curso, U.nombres AS nombres_docente, U.apellidos AS apellidos_docente FROM asignaturas A
                            INNER JOIN users U ON U.guid = A.guid_docente
                            WHERE A.id_curso = $id AND A.year = '$year'");
  $miArray = array();
  while($rs = $result->fetch_array(MYSQLI_ASSOC)) {

      $miArray[] = $rs;

  }


  $salida = json_encode($miArray);
  $conn->close();
  print_r($salida);

?>
