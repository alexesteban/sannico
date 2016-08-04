<?php
	$conn = @new mysqli('localhost', 'root','','sannico'); //Desarrollo	//$conn = @new mysqli('localhost', 'eliteonl_publine','Gforce220*','eliteonl_publinet'); //Produccion
	$acentos = $conn->query("SET NAMES 'utf8'");
?>