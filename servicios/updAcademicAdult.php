<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");
  $data = json_decode(file_get_contents("php://input"));
  $id = mysqli_real_escape_string($conn, $data->id);
  $nivel_academico = mysqli_real_escape_string($conn, $data->nivel_academico);
  $institucion = mysqli_real_escape_string($conn, $data->institucion);
  $programa_academico = mysqli_real_escape_string($conn, $data->programa_academico);
  $fecha_grado = mysqli_real_escape_string($conn, $data->fecha_grado);
  $titulo = mysqli_real_escape_string($conn, $data->titulo);

  $update = $conn->query("UPDATE academic_adults SET  nivel_academico = '$nivel_academico', institucion = '$institucion', programa_academico = '$programa_academico', fecha_grado = '$fecha_grado', titulo = '$titulo'  WHERE id = '$id'");

  $result = $update;
  $conn->close();
  $salida = json_encode($result);
  print_r($salida);

?>
