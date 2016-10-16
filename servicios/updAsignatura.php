<?php

	include 'conexion.php';
	header("Content-Type: text/html;charset=utf-8");
  $data = json_decode(file_get_contents("php://input"));
  $name = mysqli_real_escape_string($conn, $data->name);
  $guid_docente = mysqli_real_escape_string($conn, $data->guid_docente);
  $idAsignatura = mysqli_real_escape_string($conn, $data->idAsignatura);


	$query = "UPDATE asignaturas SET name = '$name', guid_docente = '$guid_docente' WHERE id = $idAsignatura";
  $result = $conn->query($query);

	$conn->close();

  $salida = json_encode($result);

	print_r($salida);

?>
