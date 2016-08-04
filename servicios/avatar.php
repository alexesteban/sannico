<?php	include 'conexion.php';
  $data = json_decode(file_get_contents("php://input"));
  $guid = mysqli_real_escape_string($conn, $data->guid);
	$result = $conn->query("SELECT avatar FROM users WHERE guid = '$guid' ");
	$miArray = array();
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	        $miArray[] = $rs;
	}
	$salida = json_encode($miArray);
	$conn->close();
	print_r($salida);
?>
