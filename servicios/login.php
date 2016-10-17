<?php
include 'conexion.php';
$data = json_decode(file_get_contents("php://input"));$password = mysqli_real_escape_string($conn, $data->password);
$email = mysqli_real_escape_string($conn, $data->email);

	$result = $conn->query("SELECT * FROM users WHERE email = '$email'");
	$num_rows = mysqli_num_rows($result);

	$resultCode = $conn->query("SELECT * FROM students WHERE codigo = '$email'");
	$num_rowsCode = mysqli_num_rows($resultCode);



	if ($num_rows != 1 && $num_rowsCode != 1) {
		$arr = array('error' => "El email no existe");
	}else{

		if ($num_rowsCode == 1 && $num_rows != 1 ) {

			//GET TAREA DATA
			$guidResult = $conn->query("SELECT guid FROM students WHERE codigo = $email");
			while ($row = $guidResult->fetch_array(MYSQLI_ASSOC)) {
					$guidStudent = $row["guid"];
			}

			$result = $conn->query("SELECT * FROM users WHERE guid = '$guidStudent'");

		}

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

}$conn->close();
	$salida = json_encode($arr);
	print_r($salida);


?>