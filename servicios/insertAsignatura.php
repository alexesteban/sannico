<?php

	include 'conexion.php';
	header("Content-Type: text/html;charset=utf-8");
  $data = json_decode(file_get_contents("php://input"));
  $name = mysqli_real_escape_string($conn, $data->name);
  $guid_docente = mysqli_real_escape_string($conn, $data->guid_docente);
  $year = mysqli_real_escape_string($conn, $data->year);
  $id_curso = mysqli_real_escape_string($conn, $data->id_curso);


	$query = "INSERT INTO asignaturas (name,guid_docente,year,id_curso)	VALUES ('$name','$guid_docente','$year','$id_curso')";
  $result = $conn->query($query);

	$conn->close();

  $salida = json_encode($result);

	print_r($salida);

?>
