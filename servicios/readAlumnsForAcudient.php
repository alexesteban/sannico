<?php

	include 'conexion.php';
	header("Content-Type: text/html;charset=utf-8");
	$data = json_decode(file_get_contents("php://input"));
	$guid = mysqli_real_escape_string($conn, $data->guid);

	$result = $conn->query("SELECT * FROM USERS U
  INNER JOIN fathers_by_student AF ON U.guid = AF.guid_student
  WHERE AF.guid_father = '$guid'");

	$miArray = array();
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {

			$miArray[] = $rs;

	}


	$salida = json_encode($miArray);
	$conn->close();
	print_r($salida);

?>
