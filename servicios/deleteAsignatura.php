<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");

  $data = json_decode(file_get_contents("php://input"));
  $id = mysqli_real_escape_string($conn, $data->id);

  $delete = $conn->query("DELETE FROM asignaturas WHERE id = $id");


  $result = $delete;

  $conn->close();

  $salida = json_encode($result);

	print_r($salida);

?>
