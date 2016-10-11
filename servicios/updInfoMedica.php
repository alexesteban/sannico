<?php
  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");
  $data = json_decode(file_get_contents("php://input"));
  $id = mysqli_real_escape_string($conn, $data->id);
  $altura = mysqli_real_escape_string($conn, $data->altura);
  $peso = mysqli_real_escape_string($conn, $data->peso);
  $rh = mysqli_real_escape_string($conn, $data->rh);
  $eps = mysqli_real_escape_string($conn, $data->eps);
  $clinica = mysqli_real_escape_string($conn, $data->clinica);
  $medico = mysqli_real_escape_string($conn, $data->medico);
  $telefono_medico = mysqli_real_escape_string($conn, $data->telefono_medico);
  $observaciones = mysqli_real_escape_string($conn, $data->observaciones);
  $nombre_contacto = mysqli_real_escape_string($conn, $data->nombre_contacto);
  $telefono_contacto = mysqli_real_escape_string($conn, $data->telefono_contacto);

  $update = $conn->query("UPDATE info_medica SET  altura = '$altura', peso = '$peso', rh = '$rh', eps = '$eps', clinica = '$clinica', medico = '$medico', telefono_medico = '$telefono_medico', observaciones = '$observaciones', nombre_contacto = '$nombre_contacto', telefono_contacto = '$telefono_contacto'  WHERE id = '$id'");

  $result = $update;
  $conn->close();
  $salida = json_encode($result);
  print_r($salida);

?>
