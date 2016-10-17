<?php

	include 'conexion.php';
	header("Content-Type: text/html;charset=utf-8");
  $data = json_decode(file_get_contents("php://input"));
  $idAsignatura = mysqli_real_escape_string($conn, $data->idAsignatura);
  $titulo = mysqli_real_escape_string($conn, $data->titulo);
  $descripcion = mysqli_real_escape_string($conn, $data->descripcion);
  $entrega = mysqli_real_escape_string($conn, $data->entrega);
  $porcentaje = mysqli_real_escape_string($conn, $data->porcentaje);
  $publica = mysqli_real_escape_string($conn, $data->publica);


	$query = "INSERT INTO evaluaciones (titulo,descripcion,entrega,porcentaje,publica,id_asignatura)	VALUES ('$titulo','$descripcion','$entrega','$porcentaje','$publica',$idAsignatura)";
  $result = $conn->query($query);

	$conn->close();

  $salida = json_encode($result);

	print_r($salida);

?>
