<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");
  $data = json_decode(file_get_contents("php://input"));
  $guid = mysqli_real_escape_string($conn, $data->guid);
  $nombres = mysqli_real_escape_string($conn, $data->nombres);
  $documento = mysqli_real_escape_string($conn, $data->documento);
  $telefono = mysqli_real_escape_string($conn, $data->telefono);
  $celular = mysqli_real_escape_string($conn, $data->celular);
  $email = mysqli_real_escape_string($conn, $data->email);
  $apellidos = mysqli_real_escape_string($conn, $data->apellidos);
  $escivil = mysqli_real_escape_string($conn, $data->escivil);
  $direccion = mysqli_real_escape_string($conn, $data->direccion);
  $grado = mysqli_real_escape_string($conn, $data->grado);
  $rol = mysqli_real_escape_string($conn, $data->rol);

  $update = $conn->query("UPDATE users SET  nombres = '$nombres', documento = '$documento', telefono = '$telefono', celular = '$celular', email = '$email', apellidos = '$apellidos', escivil = '$escivil', direccion = '$direccion'  WHERE guid = '$guid'");

  if($rol == 3) {
    $updateStudent = $conn->query("UPDATE students SET  grado = '$grado' WHERE guid = '$guid'");
  }

  $result = $update;
  $conn->close();
  $salida = json_encode($result);
  print_r($salida);

?>
