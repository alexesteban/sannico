<?php

	include 'conexion.php';
	header("Content-Type: text/html;charset=utf-8");

	$result = $conn->query("SELECT G.id, G.titulo, G.descripcion, COUNT(distinct P.id) as fotos FROM gallery G
  LEFT JOIN photos P ON G.id = P.id_galeria
  GROUP BY G.id DESC");

	$miArray = array();
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {

			$miArray[] = $rs;

	}


	$salida = json_encode($miArray);
	$conn->close();
	print_r($salida);

?>
