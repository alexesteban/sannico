<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");

  $data = json_decode(file_get_contents("php://input"));
  $guid = mysqli_real_escape_string($conn, $data->guid);
  $nivel_academico = mysqli_real_escape_string($conn, $data->nivel_academico);
  $institucion = mysqli_real_escape_string($conn, $data->institucion);
  $programa_academico = mysqli_real_escape_string($conn, $data->programa_academico);
  $fecha_grado = mysqli_real_escape_string($conn, $data->fecha_grado);
  $titulo = mysqli_real_escape_string($conn, $data->titulo);

	$query = "INSERT INTO academic_adults (guid,nivel_academico,institucion,programa_academico,fecha_grado,titulo)	VALUES ('$guid','$nivel_academico','$institucion','$programa_academico','$fecha_grado','$titulo')";
  $result = $conn->query($query);

	$conn->close();

  $salida = json_encode($result);

	print_r($salida);

?>
