<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");
  $data = json_decode(file_get_contents("php://input"));
  $id = mysqli_real_escape_string($conn, $data->idCurso);
  $name = mysqli_real_escape_string($conn, $data->name);


    $update = $conn->query("UPDATE cursos SET  name = '$name' WHERE id = $id");

  $result = $update;
  $conn->close();
  $salida = json_encode($result);
  print_r($salida);

?>
