<?php

	include 'conexion.php';
	header("Content-Type: text/html;charset=utf-8");
  $data = json_decode(file_get_contents("php://input"));
  $nombre_periodo = mysqli_real_escape_string($conn, $data->nombre_periodo);


	$query = "INSERT INTO periodos (nombre_periodo)	VALUES ('$nombre_periodo')";
  $result = $conn->query($query);

	$conn->close();

  $salida = json_encode($result);

	print_r($salida);

?>
