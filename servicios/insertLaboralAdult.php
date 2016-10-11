<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");

  $data = json_decode(file_get_contents("php://input"));
  $guid = mysqli_real_escape_string($conn, $data->guid);
  $nombre_empresa = mysqli_real_escape_string($conn, $data->nombre_empresa);
  $cargo = mysqli_real_escape_string($conn, $data->cargo);
  $fecha_inicio = mysqli_real_escape_string($conn, $data->fecha_inicio);
  $fecha_fin = mysqli_real_escape_string($conn, $data->fecha_fin);
  $funcion = mysqli_real_escape_string($conn, $data->funcion);

	$query = "INSERT INTO info_laboral (guid,nombre_empresa,cargo,fecha_inicio,fecha_fin,funcion)	VALUES ('$guid','$nombre_empresa','$cargo','$fecha_inicio','$fecha_fin','$funcion')";
  $result = $conn->query($query);

	$conn->close();

  $salida = json_encode($result);

	print_r($salida);

?>
