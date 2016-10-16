<?php

	include 'conexion.php';
	header("Content-Type: text/html;charset=utf-8");
	$data = json_decode(file_get_contents("php://input"));
	$idCurso = mysqli_real_escape_string($conn, $data->idCurso);

	$result = $conn->query("SELECT U.guid, U.avatar, U.nombres, U.apellidos, U.genero FROM users U
												  INNER JOIN students S ON U.guid = S.guid
												  WHERE U.rol = 3 AND S.grado = $idCurso");

	$miArray = array();
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {

			$miArray[] = $rs;

	}


	$salida = json_encode($miArray);
	$conn->close();
	print_r($salida);

?>
