<?php

  include 'conexion.php';
  header("Content-Type: text/html;charset=utf-8");
  $data = json_decode(file_get_contents("php://input"));
  $idAsignatura = mysqli_real_escape_string($conn, $data->idAsignatura);
  $guidAlumno = mysqli_real_escape_string($conn, $data->guidAlumno);

  //GET ACTUAL PERIODO
	$periodoResult = $conn->query("SELECT actual_periodo FROM contenido WHERE id = 1");
	while ($row = $periodoResult->fetch_array(MYSQLI_ASSOC)) {
			$actual_periodo = $row["actual_periodo"];
	}

  //GET PROMEDIO TAREAS DATA
  $promTareasResult = $conn->query("SELECT SUM(CT.nota * (T.porcentaje/100)) AS promedioTareas FROM tareas T
                                    INNER JOIN calificaciones_tareas CT ON T.id = CT.id_tarea
                                    WHERE T.id_asignatura = $idAsignatura AND T.actual_periodo = $actual_periodo AND CT.guid_alumno = '$guidAlumno'");
  while ($row = $promTareasResult->fetch_array(MYSQLI_ASSOC)) {
      $promedioTareas = $row["promedioTareas"];
  }

  //GET PROMEDIO EVALUACIONES DATA
  $promEvaluacionesResult = $conn->query("SELECT SUM(CE.nota * (E.porcentaje/100)) AS promedioEvaluaciones FROM evaluaciones E
                                    INNER JOIN calificaciones_evaluaciones CE ON E.id = CE.id_evaluacion
                                    WHERE E.id_asignatura = $idAsignatura AND E.actual_periodo = $actual_periodo AND CE.guid_alumno = '$guidAlumno'");
  while ($row = $promEvaluacionesResult->fetch_array(MYSQLI_ASSOC)) {
      $promedioEvaluaciones = $row["promedioEvaluaciones"];
  }

  $obj = new stdClass();
  $obj->promedio = $promedioTareas + $promedioEvaluaciones;

  $salida = json_encode($obj);

  $conn->close();
  print_r($salida);


?>
