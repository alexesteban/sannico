<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");
  $data = json_decode(file_get_contents("php://input"));
  $idTarea = mysqli_real_escape_string($conn, $data->idTarea);
  $guid_alumno = mysqli_real_escape_string($conn, $data->guid_alumno);
  $observaciones = mysqli_real_escape_string($conn, $data->observaciones);

  $resultNota = $conn->query("SELECT * FROM calificaciones_tareas WHERE id_tarea = $idTarea AND guid_alumno = '$guid_alumno'");
  $num_rows = mysqli_num_rows($resultNota);
  if ($num_rows != 1) {
    //no hay ninguna calificación
    $query = $conn->query("INSERT INTO calificaciones_tareas (id_tarea,guid_alumno,observaciones) VALUES ($idTarea,'$guid_alumno','$observaciones')");
  }else{
    //Ya existe una calificación
    $query = $conn->query("UPDATE calificaciones_tareas SET  observaciones = '$observaciones' WHERE id_tarea = $idTarea AND guid_alumno = '$guid_alumno'");
  }



  $result = $query;
  $conn->close();
  $salida = json_encode($result);
  print_r($salida);

?>
