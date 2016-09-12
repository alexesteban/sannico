<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");

  $data = json_decode(file_get_contents("php://input"));
  $titulo = mysqli_real_escape_string($conn, $data->titulo);
  $fecha = mysqli_real_escape_string($conn, $data->fecha);
  $hora = mysqli_real_escape_string($conn, $data->hora);
  $lugar = mysqli_real_escape_string($conn, $data->lugar);
  $imagen = mysqli_real_escape_string($conn, $data->imagen);
  $format = mysqli_real_escape_string($conn, $data->format);
  $descripcion = mysqli_real_escape_string($conn, $data->descripcion);


  if ($format == "jpeg") {
    $ext = "jpg";
  }else{
    $ext = $format;
  }


  define('UPLOAD_DIR', '../assets/img/eventos/');
	$img = $imagen;
	$img = str_replace('data:image/'.$format.';base64,', '', $img);
	$img = str_replace(' ', '+', $img);
	$data = base64_decode($img);
	$imageName = uniqid() . '.'.$ext;
	$file = UPLOAD_DIR . $imageName;
	$success = file_put_contents($file, $data);


	$query = "INSERT INTO events (titulo,fecha,hora,lugar,foto,descripcion)	VALUES ('$titulo','$fecha','$hora','$lugar','$imageName','$descripcion')";
  $result = $conn->query($query);

	$conn->close();

  $salida = json_encode($result);

	print_r($salida);

?>
