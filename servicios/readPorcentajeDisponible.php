<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");
  $data = json_decode(file_get_contents("php://input"));
  $idAsignatura = mysqli_real_escape_string($conn, $data->idAsignatura);

  //GET ACTUAL PERIODO
  $periodoResult = $conn->query("SELECT actual_periodo FROM contenido WHERE id = 1");
  while ($row = $periodoResult->fetch_array(MYSQLI_ASSOC)) {
      $actual_periodo = $row["actual_periodo"];
  }

  //GET TOTAL PORCENTAJES
  $periodoResult = $conn->query("SELECT
                                  (SELECT SUM(porcentaje)
                                    FROM tareas
                                    WHERE id_asignatura = $idAsignatura AND actual_periodo = $actual_periodo
                                  ) AS porcentajeTareas,
                                  (SELECT SUM(porcentaje)
                                    FROM evaluaciones
                                    WHERE id_asignatura = $idAsignatura AND actual_periodo = $actual_periodo
                                  ) AS porcentajeEvaluaciones");
  while ($row = $periodoResult->fetch_array(MYSQLI_ASSOC)) {
      $porcentajeTareas = $row["porcentajeTareas"];
      $porcentajeEvaluaciones = $row["porcentajeEvaluaciones"];
  }

  $porcentajeDisponible = 100 - ($porcentajeTareas + $porcentajeEvaluaciones);

	$miArray = array(
    	'porcentajeDisponible' 		=> $porcentajeDisponible
  );


	$salida = json_encode($miArray);
	$conn->close();
	print_r($salida);

?>
