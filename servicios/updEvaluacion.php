<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");
  $data = json_decode(file_get_contents("php://input"));
  $idEvaluacion = mysqli_real_escape_string($conn, $data->idEvaluacion);
  $titulo = mysqli_real_escape_string($conn, $data->titulo);
  $descripcion = mysqli_real_escape_string($conn, $data->descripcion);
  $entrega = mysqli_real_escape_string($conn, $data->entrega);
  $porcentaje = mysqli_real_escape_string($conn, $data->porcentaje);
  $publica = mysqli_real_escape_string($conn, $data->publica);


    $update = $conn->query("UPDATE evaluaciones SET  titulo = '$titulo', descripcion = '$descripcion', entrega = '$entrega', porcentaje = '$porcentaje', publica = '$publica'  WHERE id = $idEvaluacion");

  $result = $update;
  $conn->close();
  $salida = json_encode($result);
  print_r($salida);

?>
