<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");
  $data = json_decode(file_get_contents("php://input"));
  $guid = mysqli_real_escape_string($conn, $data->guid);

	$result = $conn->query("SELECT * FROM info_medica WHERE guid = '$guid'");
  $rs = $result->fetch_array(MYSQLI_ASSOC);

  $miArray = array(
      'id' 		=> $rs["id"],
      'altura' 		=> $rs["altura"],
      'peso' 		=> $rs["peso"],
      'rh' 		=> $rs["rh"],
      'eps' 		=> $rs["eps"],
      'clinica' 		=> $rs["clinica"],
      'medico' 		=> $rs["medico"],
      'telefono_medico' 		=> $rs["telefono_medico"],
      'observaciones' 		=> $rs["observaciones"],
      'nombre_contacto' 		=> $rs["nombre_contacto"],
      'telefono_contacto' 		=> $rs["telefono_contacto"]
  );

	$salida = json_encode($miArray);
	$conn->close();
	print_r($salida);

?>
