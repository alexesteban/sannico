<?php

	include 'conexion.php';
	header("Content-Type: text/html;charset=utf-8");

	$result = $conn->query("SELECT U.id, U.avatar, U.nombres, U.apellidos, U.genero, U.guid, S.grado FROM users AS U
                          INNER JOIN students AS S
                          ON U.guid = S.guid
                          WHERE U.rol = 3");

	$miArray = array();
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {

			$miArray[] = $rs;

	}


	$salida = json_encode($miArray);
	$conn->close();
	print_r($salida);

?>
