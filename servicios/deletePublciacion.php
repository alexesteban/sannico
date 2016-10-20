<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");

  $data = json_decode(file_get_contents("php://input"));
  $idPublicacion = mysqli_real_escape_string($conn, $data->idPublicacion);

  $delete = $conn->query("DELETE FROM publicaciones WHERE id = $idPublicacion");

  $result = $delete;

  $conn->close();

  $salida = json_encode($result);

	print_r($salida);

?>
