<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");

  $id = 1;

	$result = $conn->query("SELECT actual_year FROM contenido WHERE id = '$id'");
  $rs = $result->fetch_array(MYSQLI_ASSOC);

	$miArray = array(
    	'year' 		=> $rs["actual_year"]
  );


	$salida = json_encode($miArray);
	$conn->close();
	print_r($salida);

?>
