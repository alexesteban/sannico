<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");

	$result = $conn->query("SELECT * FROM events ORDER BY id DESC LIMIT 1");
  $rs = $result->fetch_array(MYSQLI_ASSOC);

  $miArray = array(
      'id' 		=> $rs["id"],
      'titulo' 		=> $rs["titulo"],
      'foto' 		=> $rs["foto"],
      'fecha' 		=> $rs["fecha"],
      'hora' 		=> $rs["hora"],
      'descripcion' 		=> $rs["descripcion"]
  );


  $salida = json_encode($miArray);
  $conn->close();
  print_r($salida);

?>
