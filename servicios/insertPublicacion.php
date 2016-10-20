<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");
  $data = json_decode(file_get_contents("php://input"));
  $titulo = mysqli_real_escape_string($conn, $data->titulo);
  $descripcion = mysqli_real_escape_string($conn, $data->descripcion);
  $guid = mysqli_real_escape_string($conn, $data->guid);

  //GET ROL
  $rolResult = $conn->query("SELECT rol FROM users WHERE guid = '$guid'");
  while ($row = $rolResult->fetch_array(MYSQLI_ASSOC)) {
      $rol = $row["rol"];
  }



	$query = "INSERT INTO publicaciones (titulo,descripcion,fecha,guid,rol)	VALUES ('$titulo','$descripcion',NOW(),'$guid',$rol)";
  $result = $conn->query($query);

	$conn->close();

  $salida = json_encode($result);

	print_r($salida);

?>
