<?php

	include 'conexion.php';
	header("Content-Type: text/html;charset=utf-8");

	$result = $conn->query("SELECT C.id, C.name, COUNT(distinct A.id) as cantAsig FROM cursos C
												  LEFT JOIN asignaturas A ON C.id = A.id_curso
												  GROUP BY C.name ASC");

	$miArray = array();
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {

			$miArray[] = $rs;

	}


	$salida = json_encode($miArray);
	$conn->close();
	print_r($salida);

?>
