<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");

  $id = 1;

	$result = $conn->query("SELECT * FROM contenido WHERE id = '$id'");
  $rs = $result->fetch_array(MYSQLI_ASSOC);

	$miArray = array(
    	'institucional' 		=> $rs["institucional"],
    	'mision' 		=> $rs["mision"],
    	'vision' 		=> $rs["vision"],
    	'servicios' 		=> $rs["servicios"]
  );


	$salida = json_encode($miArray);
	$conn->close();
	print_r($salida);

?>
