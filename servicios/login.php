<?php
include 'conexion.php';
$data = json_decode(file_get_contents("php://input"));$password = mysqli_real_escape_string($conn, $data->password);
$email = mysqli_real_escape_string($conn, $data->email);

	$result = $conn->query("SELECT * FROM users WHERE email = '$email'");
	$num_rows = mysqli_num_rows($result);

	$conn->close();

	if ($num_rows != 1) {
		$arr = array('error' => "El email no existe");
	}else{

		$rs = $result->fetch_array(MYSQLI_ASSOC);
		$passDB = $rs["password"];

		$password = md5($password);
		if ($password == $passDB) {
			$arr = array(
				'id' 			=> $rs["id"],
				'nombres' 		=> $rs["nombres"],
				'apellidos' 	=> $rs["apellidos"],
				'nacimiento' 	=> $rs["nacimiento"],
				'email' 		=> $rs["email"],
				'rol' 			=> $rs["rol"],
				'guid' 			=> $rs["guid"]
			);

		}else{
			$arr = array('error' => "El password es incorrecto");
		}

}
	$salida = json_encode($arr);
	print_r($salida);


?>