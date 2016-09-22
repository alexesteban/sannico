<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");
  $data = json_decode(file_get_contents("php://input"));
  $institucional = mysqli_real_escape_string($conn, $data->institucional);
  $mision = mysqli_real_escape_string($conn, $data->mision);
  $vision = mysqli_real_escape_string($conn, $data->vision);
  $servicios = mysqli_real_escape_string($conn, $data->servicios);

  $update = $conn->query("UPDATE contenido SET  institucional = '$institucional', mision = '$mision', vision = '$vision', servicios = '$servicios' WHERE id = 1");

  $result = $update;
  $conn->close();
  $salida = json_encode($result);
  print_r($salida);

?>
