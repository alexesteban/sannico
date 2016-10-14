<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");

  $data = json_decode(file_get_contents("php://input"));
  $name = mysqli_real_escape_string($conn, $data->name);

	$query = "INSERT INTO cursos (name)	VALUES ('$name')";
  $result = $conn->query($query);

	$conn->close();

  $salida = json_encode($result);

	print_r($salida);

?>
