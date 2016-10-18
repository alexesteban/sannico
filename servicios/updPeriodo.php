<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");
  $data = json_decode(file_get_contents("php://input"));
  $actual_periodo = mysqli_real_escape_string($conn, $data->actual_periodo);

  $update = $conn->query("UPDATE contenido SET  actual_periodo = '$actual_periodo' WHERE id = 1");

  $result = $update;
  $conn->close();
  $salida = json_encode($result);
  print_r($salida);

?>
