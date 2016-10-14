<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");
  $data = json_decode(file_get_contents("php://input"));
  $year = mysqli_real_escape_string($conn, $data->year);

  $update = $conn->query("UPDATE contenido SET  actual_year = '$year' WHERE id = 1");

  $result = $update;
  $conn->close();
  $salida = json_encode($result);
  print_r($salida);

?>
