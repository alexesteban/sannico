<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");
  $data = json_decode(file_get_contents("php://input"));
  $idEvaluacion = mysqli_real_escape_string($conn, $data->idEvaluacion);

	$result = $conn->query("SELECT * FROM evaluaciones WHERE id = $idEvaluacion");
  $rs = $result->fetch_array(MYSQLI_ASSOC);

  $miArray = array(
      'titulo' 		=> $rs["titulo"],
      'descripcion' 		=> $rs["descripcion"],
      'entrega' 		=> $rs["entrega"],
      'porcentaje' 		=> $rs["porcentaje"],
      'publica' 		=> $rs["publica"],
      'id_asignatura' 		=> $rs["id_asignatura"]
  );


  $salida = json_encode($miArray);
  $conn->close();
  print_r($salida);

?>
