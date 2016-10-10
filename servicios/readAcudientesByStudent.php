<?php

	include 'conexion.php';
	header("Content-Type: text/html;charset=utf-8");
	$data = json_decode(file_get_contents("php://input"));
	$guid_student = mysqli_real_escape_string($conn, $data->guid_student);

	$result = $conn->query("SELECT * FROM users U LEFT OUTER JOIN fathers_by_student FS ON U.guid = FS.guid_father
  WHERE U.rol = 4 AND (FS.guid_student IS NULL OR (FS.guid_student != '$guid_student' AND FS.guid_father != U.guid) )");

	$miArray = array();
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {

			$miArray[] = $rs;

	}


	$salida = json_encode($miArray);
	$conn->close();
	print_r($salida);

?>
