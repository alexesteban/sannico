<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");
  $data = json_decode(file_get_contents("php://input"));
  $idEvaluacion = mysqli_real_escape_string($conn, $data->idEvaluacion);
  $guid_alumno = mysqli_real_escape_string($conn, $data->guid_alumno);
  $nota = mysqli_real_escape_string($conn, $data->nota);

  $resultNota = $conn->query("SELECT * FROM calificaciones_evaluaciones WHERE id_evaluacion = $idEvaluacion AND guid_alumno = '$guid_alumno'");
  $num_rows = mysqli_num_rows($resultNota);
  if ($num_rows != 1) {
    //no hay ninguna calificación
    $query = $conn->query("INSERT INTO calificaciones_evaluaciones (id_evaluacion,guid_alumno,nota) VALUES ($idEvaluacion,'$guid_alumno',$nota)");
  }else{
    //Ya existe una calificación
    $query = $conn->query("UPDATE calificaciones_evaluaciones SET  nota = '$nota' WHERE id_evaluacion = $idEvaluacion AND guid_alumno = '$guid_alumno'");
  }



  $result = $query;
  $conn->close();
  $salida = json_encode($result);
  print_r($salida);

?>
