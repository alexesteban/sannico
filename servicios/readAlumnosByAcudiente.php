<?php

	include 'conexion.php';
	header("Content-Type: text/html;charset=utf-8");
	$data = json_decode(file_get_contents("php://input"));
	$guid_father = mysqli_real_escape_string($conn, $data->guid_father);

	$result = $conn->query("SELECT * FROM users U LEFT OUTER JOIN alumns_by_father AF ON U.guid = AF.guid_student
  WHERE U.rol = 3 AND (AF.guid_father IS NULL OR (AF.guid_father != '$guid_father' AND AF.guid_student != U.guid) )");

	$miArray = array();
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {

			$miArray[] = $rs;

	}


	$salida = json_encode($miArray);
	$conn->close();
	print_r($salida);

?>
