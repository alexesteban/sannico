<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");
  $data = json_decode(file_get_contents("php://input"));
  $idTarea = mysqli_real_escape_string($conn, $data->idTarea);

	$result = $conn->query("SELECT * FROM tareas WHERE id = $idTarea");
  $rs = $result->fetch_array(MYSQLI_ASSOC);

  $miArray = array(
      'titulo' 		=> $rs["titulo"],
      'descripcion' 		=> $rs["descripcion"],
      'entrega' 		=> $rs["entrega"],
      'porcentaje' 		=> $rs["porcentaje"],
      'publica' 		=> $rs["publica"],
      'calificable' 		=> $rs["calificable"],
      'id_asignatura' 		=> $rs["id_asignatura"]
  );


  $salida = json_encode($miArray);
  $conn->close();
  print_r($salida);

?>
