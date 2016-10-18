<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");
  $data = json_decode(file_get_contents("php://input"));
  $idTarea = mysqli_real_escape_string($conn, $data->idTarea);

  //GET ACTUAL PERIODO
  $periodoResult = $conn->query("SELECT actual_periodo FROM contenido WHERE id = 1");
  while ($row = $periodoResult->fetch_array(MYSQLI_ASSOC)) {
      $actual_periodo = $row["actual_periodo"];
  }

  //GET ASIGNATURA ID
  $asignaturaResult = $conn->query("SELECT id_asignatura FROM tareas WHERE id = $idTarea");
  while ($row = $asignaturaResult->fetch_array(MYSQLI_ASSOC)) {
      $idAsignatura = $row["id_asignatura"];
  }

  //GET PORCENTAJE DE LA TAREA
  $porcTareaResult = $conn->query("SELECT porcentaje FROM tareas WHERE id = $idTarea");
  while ($row = $porcTareaResult->fetch_array(MYSQLI_ASSOC)) {
      $porcentajeTarea = $row["porcentaje"];
  }


    //GET TOTAL PORCENTAJES
    $totalPorcResult = $conn->query("SELECT
                                    (SELECT SUM(porcentaje)
                                      FROM tareas
                                      WHERE id_asignatura = $idAsignatura AND actual_periodo = $actual_periodo
                                    ) AS porcentajeTareas,
                                    (SELECT SUM(porcentaje)
                                      FROM evaluaciones
                                      WHERE id_asignatura = $idAsignatura AND actual_periodo = $actual_periodo
                                    ) AS porcentajeEvaluaciones");
    while ($row = $totalPorcResult->fetch_array(MYSQLI_ASSOC)) {
        $porcentajeTareas = $row["porcentajeTareas"] - $porcentajeTarea;
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
