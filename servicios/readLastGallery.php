<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");

	$result = $conn->query("SELECT G.id, G.titulo, P.imagen FROM gallery G
                          INNER JOIN photos P ON P.id_galeria = G.id
                          ORDER BY G.id DESC LIMIT 1");
  $rs = $result->fetch_array(MYSQLI_ASSOC);

  $miArray = array(
      'id' 		=> $rs["id"],
      'titulo' 		=> $rs["titulo"],
      'imagen' 		=> $rs["imagen"]
  );


  $salida = json_encode($miArray);
  $conn->close();
  print_r($salida);

?>
