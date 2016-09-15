<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");

  $data = json_decode(file_get_contents("php://input"));
  $titulo = mysqli_real_escape_string($conn, $data->titulo);
  $descripcion = mysqli_real_escape_string($conn, $data->descripcion);

	$query = "INSERT INTO gallery (titulo,descripcion)	VALUES ('$titulo','$descripcion')";
  $result = $conn->query($query);

	$conn->close();

  $salida = json_encode($result);

	print_r($salida);

?>
