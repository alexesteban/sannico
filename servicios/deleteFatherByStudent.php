<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");

  $data = json_decode(file_get_contents("php://input"));
  $guid_student = mysqli_real_escape_string($conn, $data->guid_student);
  $guid_father = mysqli_real_escape_string($conn, $data->guid_father);

  $delete = $conn->query("DELETE FROM fathers_by_student WHERE guid_student = '$guid_student' AND guid_father = '$guid_father'");

  $result = $delete;

  $conn->close();

  $salida = json_encode($result);

	print_r($salida);

?>
