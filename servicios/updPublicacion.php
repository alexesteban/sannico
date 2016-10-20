<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");
  $data = json_decode(file_get_contents("php://input"));
  $id = mysqli_real_escape_string($conn, $data->id);
  $titulo = mysqli_real_escape_string($conn, $data->titulo);
  $descripcion = mysqli_real_escape_string($conn, $data->descripcion);

  $update = $conn->query("UPDATE publicaciones SET  titulo = '$titulo', descripcion = '$descripcion'  WHERE id = $id");

  $result = $update;
  $conn->close();
  $salida = json_encode($result);
  print_r($salida);

?>
