<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");
  $data = json_decode(file_get_contents("php://input"));
  $guid = mysqli_real_escape_string($conn, $data->guid);

	$result = $conn->query("SELECT * FROM info_laboral WHERE guid = '$guid'");
  $rs = $result->fetch_array(MYSQLI_ASSOC);

  $miArray = array(
      'id' 		=> $rs["id"],
      'nombre_empresa' 		=> $rs["nombre_empresa"],
      'cargo' 		=> $rs["cargo"],
      'funcion' 		=> $rs["funcion"],
      'fecha_inicio' 		=> $rs["fecha_inicio"],
      'fecha_fin' 		=> $rs["fecha_fin"]
  );

	$salida = json_encode($miArray);
	$conn->close();
	print_r($salida);

?>
