<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");
  $data = json_decode(file_get_contents("php://input"));
  $idTarea = mysqli_real_escape_string($conn, $data->idTarea);
  $titulo = mysqli_real_escape_string($conn, $data->titulo);
  $descripcion = mysqli_real_escape_string($conn, $data->descripcion);
  $entrega = mysqli_real_escape_string($conn, $data->entrega);
  $porcentaje = mysqli_real_escape_string($conn, $data->porcentaje);
  $publica = mysqli_real_escape_string($conn, $data->publica);
  $calificable = mysqli_real_escape_string($conn, $data->calificable);


    $update = $conn->query("UPDATE tareas SET  titulo = '$titulo', descripcion = '$descripcion', entrega = '$entrega', porcentaje = '$porcentaje', publica = '$publica', calificable = '$calificable'  WHERE id = $idTarea");

  $result = $update;
  $conn->close();
  $salida = json_encode($result);
  print_r($salida);

?>
