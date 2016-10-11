<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");
  $data = json_decode(file_get_contents("php://input"));
  $guid = mysqli_real_escape_string($conn, $data->guid);

	$result = $conn->query("SELECT * FROM academic_adults WHERE guid = '$guid'");
  $rs = $result->fetch_array(MYSQLI_ASSOC);

  $miArray = array(
      'id' 		=> $rs["id"],
      'nivel_academico' 		=> $rs["nivel_academico"],
      'institucion' 		=> $rs["institucion"],
      'programa_academico' 		=> $rs["programa_academico"],
      'fecha_grado' 		=> $rs["fecha_grado"],
      'titulo' 		=> $rs["titulo"]
  );

	$salida = json_encode($miArray);
	$conn->close();
	print_r($salida);

?>
