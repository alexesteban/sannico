<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");
  $data = json_decode(file_get_contents("php://input"));
  $id = mysqli_real_escape_string($conn, $data->id);

	$result = $conn->query("SELECT * FROM events WHERE id = '$id'");
  $rs = $result->fetch_array(MYSQLI_ASSOC);

	$miArray = array(
    	'titulo' 		=> $rs["titulo"],
    	'fecha' 		=> $rs["fecha"],
    	'hora' 		=> $rs["hora"],
    	'foto' 		=> $rs["foto"],
    	'lugar' 		=> $rs["lugar"],
    	'descripcion' 		=> $rs["descripcion"]
  );


	$salida = json_encode($miArray);
	$conn->close();
	print_r($salida);

?>
