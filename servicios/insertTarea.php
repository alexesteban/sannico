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
  $calificable = mysqli_real_escape_string($conn, $data->calificable);

	//GET ACTUAL PERIODO
  $periodoResult = $conn->query("SELECT actual_periodo FROM contenido WHERE id = 1");
  while ($row = $periodoResult->fetch_array(MYSQLI_ASSOC)) {
      $actual_periodo = $row["actual_periodo"];
  }

	$query = "INSERT INTO tareas (titulo,descripcion,entrega,porcentaje,publica,calificable,id_asignatura,actual_periodo)	VALUES ('$titulo','$descripcion','$entrega','$porcentaje','$publica','$calificable',$idAsignatura,$actual_periodo)";
  $result = $conn->query($query);

	$conn->close();

  $salida = json_encode($result);

	print_r($salida);

?>
