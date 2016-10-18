<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");

  $id = 1;

	$result = $conn->query("SELECT P.nombre_periodo FROM contenido C
                          INNER JOIN periodos P ON C.actual_periodo = P.id
                          WHERE C.id = $id");
  $rs = $result->fetch_array(MYSQLI_ASSOC);

	$miArray = array(
    	'actualPeriodo' 		=> $rs["nombre_periodo"]
  );


	$salida = json_encode($miArray);
	$conn->close();
	print_r($salida);

?>
