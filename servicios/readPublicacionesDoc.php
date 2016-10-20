<?php

	include 'conexion.php';
	header("Content-Type: text/html;charset=utf-8");

	$result = $conn->query("SELECT P.id, U.avatar, U.nombres, U.apellidos, P.titulo, P.descripcion, P.fecha FROM publicaciones P
												  INNER JOIN users U ON U.guid = P.guid
												  WHERE P.rol = 2 ORDER BY P.id DESC LIMIT 4");

	$miArray = array();
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
			$miArray[] = $rs;
	}


	$salida = json_encode($miArray);
	$conn->close();
	print_r($salida);

?>
