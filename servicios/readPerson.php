<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");
  $data = json_decode(file_get_contents("php://input"));
  $guid = mysqli_real_escape_string($conn, $data->guid);

	$result = $conn->query("SELECT * FROM users WHERE guid = '$guid'");
  $rs = $result->fetch_array(MYSQLI_ASSOC);

	$miArray = array(
      'nombres' 		=> $rs["nombres"],
    	'apellidos' 		=> $rs["apellidos"],
    	'avatar' 		=> $rs["avatar"],
    	'celular' 		=> $rs["celular"],
    	'email' 		=> $rs["email"],
    	'genero' 		=> $rs["genero"],
    	'guid' 		=> $rs["guid"],
    	'id' 		=> $rs["id"],
    	'nacimiento' 		=> $rs["nacimiento"],
    	'rol' 		=> $rs["rol"],
    	'telefono' 		=> $rs["telefono"],
    	'documento' 		=> $rs["documento"],
    	'escivil' 		=> $rs["escivil"],
    	'direccion' 		=> $rs["direccion"],
  );


	$salida = json_encode($miArray);
	$conn->close();
	print_r($salida);

?>
