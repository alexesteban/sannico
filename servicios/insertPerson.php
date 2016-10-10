<?php
<?php

	include 'conexion.php';
	header("Content-Type: text/html;charset=utf-8");
  $data = json_decode(file_get_contents("php://input"));
  $nombres = mysqli_real_escape_string($conn, $data->nombres);
  $apellidos = mysqli_real_escape_string($conn, $data->apellidos);
  $Fnacimiento = mysqli_real_escape_string($conn, $data->Fnacimiento);
  $genero = mysqli_real_escape_string($conn, $data->genero);
  $email = mysqli_real_escape_string($conn, $data->email);
  $pass = mysqli_real_escape_string($conn, $data->pass);
  $rol = mysqli_real_escape_string($conn, $data->rol);
  $guid = mysqli_real_escape_string($conn, $data->guid);

	$origPass = $pass;
	$pass = md5($pass);

  $grado = mysqli_real_escape_string($conn, $data->grado);
  $codigo = mysqli_real_escape_string($conn, $data->codigo);

	$email_stats = false;
	$code_stats = false;

	if ($email != "") {
			$result = $conn->query("SELECT * FROM users WHERE email = '$email'");
			$num_rows = mysqli_num_rows($result);

			if ($num_rows != 0) {
				$email_stats = false;
			}else{
				$email_stats = true;
		}
	}else{
		$email_stats = true;
	}

	if($rol == 3){
		$result = $conn->query("SELECT * FROM students WHERE codigo = '$codigo'");
		$num_rows = mysqli_num_rows($result);

		if ($num_rows != 0) {
			$code_stats = false;
		}else{
			$code_stats = true;
		}
	}else{
		$code_stats = true;
	}


	$query_insert_person = "INSERT INTO users (nombres,apellidos,nacimiento,genero,email,password,rol,guid)	VALUES ('$nombres','$apellidos','$Fnacimiento','$genero','$email','$pass',$rol,'$guid')";
	$query_inser_student = "INSERT INTO students (guid,grado,codigo)	VALUES ('$guid','$grado','$codigo')";

	if ($email_stats) {

		if ($code_stats) {

			$result = $conn->query($query_insert_person);
			if ($rol == 3) {
				$conn->query($query_inser_student);
			}

		}else{
				$result =  array('error' => "El código ya está en uso");
		}

	}else{
		$result = array('error' => "El email ya está en uso");
	}

	$conn->close();


	if ($email != "") {

		$EmailReceptor = $email;

		//Envía el Email de Contacto
					require "MAIL/class.phpmailer.php";
					$html = '
							<h1>
								Creación de Usuario - Colegio San Nicolás
							</h1>
							<p>
								Buen día, nos permitimos informarle que ahora hace parte de nuestra plataforma virtua,
								Sus datos de ingreso son:
							</p>
							<p> Email: '.$email.' </p>
							<p> Password: '.$origPass.' </p>
					 		';

					 $mail = new PHPMailer(FALSE); // the true param means it will throw exceptions on errors, which we need to catch

				        $nmEmisor = 'San Nicolás';
				        $emEmisor = "sannicolas@gmail.com";
				        $mail->AddReplyTo($emEmisor, $nmEmisor);
				        $mail->SetFrom($emEmisor, $nmEmisor);
				        $mail->CharSet = "iso-8859-1";
				        $mail->Subject = "Contacto: ".$nombres;
				        $mail->AltBody = 'To view the message, please use an HTML compatible email viewer!';
				        $mail->CharSet = 'UTF-8';
				        $mail->MsgHTML($html);
				        try {
				            $mail->AddAddress($EmailReceptor);
				            $enviado = $mail->Send();
				        } catch (phpmailerException $e) {
											$arr = array('error' => "El correo no pudo ser enviado, favor contacte el administrador del sistema.");
				        } catch (Exception $e) {
									$arr = array('error' => "El correo no pudo ser enviado, favor contacte el administrador del sistema.");
				        }

				        $arr = array("Se envió correctamente");

				        //echo $html;
}





  $salida = json_encode($result);

	print_r($salida);

?>
