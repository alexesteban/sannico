<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");
  $data = json_decode(file_get_contents("php://input"));
  $id = mysqli_real_escape_string($conn, $data->id);

	$result = $conn->query("SELECT
  (SELECT count(*)
    FROM users
    WHERE rol = 2
  ) AS teacher,
  (SELECT count(*)
    FROM users
    WHERE rol = 3
  ) AS student,
  (SELECT count(*)
    FROM users
    WHERE rol = 4
  ) AS father,
  (SELECT count(*)
    FROM events
  ) AS events,
  (SELECT count(*)
    FROM photos
  ) AS photos,
  (SELECT count(*)
    FROM photos
    WHERE guid_usuario = '$id'
  ) AS owner_photos
  ");

  $rs = $result->fetch_array(MYSQLI_ASSOC);

	$miArray = array(
    	'teacher' 		=> $rs["teacher"],
    	'student' 		=> $rs["student"],
    	'father' 		=> $rs["father"],
    	'events' 		=> $rs["events"],
    	'photos' 		=> $rs["photos"],
    	'owner_photos' 		=> $rs["owner_photos"]
  );


	$salida = json_encode($miArray);
	$conn->close();
	print_r($salida);

?>
