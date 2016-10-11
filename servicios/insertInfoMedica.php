<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");

  $data = json_decode(file_get_contents("php://input"));
  $guid = mysqli_real_escape_string($conn, $data->guid);
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

	$query = "INSERT INTO info_medica (guid,altura,peso,rh,eps,clinica,medico,telefono_medico,observaciones,nombre_contacto,telefono_contacto) VALUES ('$guid','$altura','$peso','$rh','$eps','$clinica','$medico','$telefono_medico','$observaciones','$nombre_contacto','$telefono_contacto')";
  $result = $conn->query($query);

	$conn->close();

  $salida = json_encode($result);

	print_r($salida);

?>
