<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");

  $data = json_decode(file_get_contents("php://input"));
  $idEvento = mysqli_real_escape_string($conn, $data->idEvento);

  $delete = $conn->query("DELETE FROM events WHERE id = $idEvento");

  $result = $delete;

  $conn->close();

  $salida = json_encode($result);

	print_r($salida);

?>
