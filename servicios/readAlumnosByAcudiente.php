<?php

	include 'conexion.php';
	header("Content-Type: text/html;charset=utf-8");
	$data = json_decode(file_get_contents("php://input"));
	$guid_father = mysqli_real_escape_string($conn, $data->guid_father);

	$result = $conn->query("SELECT * FROM users U
													WHERE U.rol = 3
													AND U.guid NOT IN (
														SELECT FS.guid_student FROM fathers_by_student FS
														WHERE FS.guid_father = '$guid_father')");


	$miArray = array();
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {

			$miArray[] = $rs;

	}


	$salida = json_encode($miArray);
	$conn->close();
	print_r($salida);

?>
