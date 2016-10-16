<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");
  $data = json_decode(file_get_contents("php://input"));
  $id = mysqli_real_escape_string($conn, $data->id);

	$result = $conn->query("SELECT * FROM tareas WHERE id_asignatura = $id");
  $miArray = array();
  while($rs = $result->fetch_array(MYSQLI_ASSOC)) {

      $miArray[] = $rs;

  }


  $salida = json_encode($miArray);
  $conn->close();
  print_r($salida);

?>
