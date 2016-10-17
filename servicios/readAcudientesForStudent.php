<?php

	include 'conexion.php';
	header("Content-Type: text/html;charset=utf-8");
	$data = json_decode(file_get_contents("php://input"));
	$guid = mysqli_real_escape_string($conn, $data->guid);

	$result = $conn->query("SELECT * FROM users U
  INNER JOIN fathers_by_student FS ON U.guid = FS.guid_father
  WHERE FS.guid_student = '$guid'");

	$miArray = array();
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {

			$miArray[] = $rs;

	}


	$salida = json_encode($miArray);
	$conn->close();
	print_r($salida);

?>
