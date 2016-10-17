<?php

	include 'conexion.php';
	header("Content-Type: text/html;charset=utf-8");
  $data = json_decode(file_get_contents("php://input"));
  $idTarea = mysqli_real_escape_string($conn, $data->idTarea);
  $state = mysqli_real_escape_string($conn, $data->state);

	$query = "UPDATE tareas SET publica = '$state' WHERE id = $idTarea";
  $result = $conn->query($query);

	$conn->close();

  $salida = json_encode($result);

	print_r($salida);

?>
