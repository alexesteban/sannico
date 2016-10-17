<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");
  $data = json_decode(file_get_contents("php://input"));
  $avatar = mysqli_real_escape_string($conn, $data->avatar);
  $guid = mysqli_real_escape_string($conn, $data->guid);

  $query = $conn->query("UPDATE users SET  avatar = '$avatar' WHERE guid = '$guid'");



  $result = $query;
  $conn->close();
  $salida = json_encode($result);
  print_r($salida);

?>
