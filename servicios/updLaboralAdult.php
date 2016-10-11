<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");
  $data = json_decode(file_get_contents("php://input"));
  $id = mysqli_real_escape_string($conn, $data->id);
  $nombre_empresa = mysqli_real_escape_string($conn, $data->nombre_empresa);
  $cargo = mysqli_real_escape_string($conn, $data->cargo);
  $fecha_inicio = mysqli_real_escape_string($conn, $data->fecha_inicio);
  $fecha_fin = mysqli_real_escape_string($conn, $data->fecha_fin);
  $funcion = mysqli_real_escape_string($conn, $data->funcion);

  $update = $conn->query("UPDATE info_laboral SET  nombre_empresa = '$nombre_empresa', cargo = '$cargo', fecha_inicio = '$fecha_inicio', fecha_fin = '$fecha_fin', funcion = '$funcion'  WHERE id = '$id'");

  $result = $update;
  $conn->close();
  $salida = json_encode($result);
  print_r($salida);

?>
