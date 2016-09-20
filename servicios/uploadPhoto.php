<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");

  $data = json_decode(file_get_contents("php://input"));
  $imagen = mysqli_real_escape_string($conn, $data->imagen);
  $format = mysqli_real_escape_string($conn, $data->format);
  $descripcion = mysqli_real_escape_string($conn, $data->descripcion);
  $idGaleria = mysqli_real_escape_string($conn, $data->idGaleria);

  if ($format == "jpeg") {
    $ext = "jpg";
  }else{
    $ext = $format;
  }

  define('UPLOAD_DIR', '../assets/img/galeria/');
	$img = $imagen;
	$img = str_replace('data:image/'.$format.';base64,', '', $img);
	$img = str_replace(' ', '+', $img);
	$data = base64_decode($img);
	$imageName = uniqid() . '.'.$ext;
	$file = UPLOAD_DIR . $imageName;
	$success = file_put_contents($file, $data);


	$query = "INSERT INTO photos (titulo,imagen,id_galeria)	VALUES ('$descripcion','$imageName','$idGaleria')";
  $result = $conn->query($query);

	$conn->close();

  $salida = json_encode($result);

	print_r($salida);

?>
