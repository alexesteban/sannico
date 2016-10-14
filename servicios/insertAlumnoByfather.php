<?php

	include 'conexion.php';
	header("Content-Type: text/html;charset=utf-8");
  $data = json_decode(file_get_contents("php://input"));
  $guid_student = mysqli_real_escape_string($conn, $data->guid_student);
  $guid_father = mysqli_real_escape_string($conn, $data->guid_father);

	$query = "INSERT INTO alumns_by_father (guid_student,guid_father)	VALUES ('$guid_student','$guid_father')";
  $result = $conn->query($query);

	$conn->close();

  $salida = json_encode($result);

	print_r($salida);


?>
