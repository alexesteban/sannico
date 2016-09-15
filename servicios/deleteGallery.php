<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");

  $data = json_decode(file_get_contents("php://input"));
  $idGallery = mysqli_real_escape_string($conn, $data->idGallery);

  $delete = $conn->query("DELETE FROM gallery WHERE id = $idGallery");

  $result = $delete;

  $conn->close();

  $salida = json_encode($result);

	print_r($salida);

?>
