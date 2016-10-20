<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");

  $rol = 1;

  //GET PUBLICACION DATA
  $publicacionAdmResult = $conn->query("SELECT * FROM publicaciones WHERE rol = $rol LIMIT 1");
  while ($row = $publicacionAdmResult->fetch_array(MYSQLI_ASSOC)) {
      $tituloPA = $row["titulo"];
      $descripcionPA = $row["descripcion"];
      $fechaPA = $row["fecha"];
      $guidPA = $row["guid"];
  }

  //GET USER PA DATA
  $userResult = $conn->query("SELECT * FROM users WHERE guid = '$guidPA' ");
  while ($row = $userResult->fetch_array(MYSQLI_ASSOC)) {
      $nombres = $row["nombres"];
      $apellidos = $row["apellidos"];
      $avatar = $row["avatar"];
  }


  $obj = new stdClass();
  $obj->tituloPA = $tituloPA;
  $obj->descripcionPA = $descripcionPA;
  $obj->fechaPA = $fechaPA;
  $obj->nombres = $nombres;
  $obj->apellidos = $apellidos;
  $obj->avatar = $avatar;


  $salida = json_encode($obj);
	$conn->close();
	print_r($salida);

?>
