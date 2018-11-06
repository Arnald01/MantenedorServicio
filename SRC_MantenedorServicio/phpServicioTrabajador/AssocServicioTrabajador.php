<?php
   header("Access-Control-Allow-Origin: *");
   header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
   header('Access-Control-Allow-Headers: Origin, Content-Type');
   require_once "db.php";

	  $json = file_get_contents("php://input");
	  $data = json_decode($json,true);
	  $_POST = $data;
	   
	if($_POST == null){
		$res->mensaje = "No llegaron datos al servidor";
	}else{
		//SI REGISTRO A ALGUN TRABAJADOR ENTONCES INSERTARLO EN TABLA SERVICIO-TRABAJADOR
		if($_POST["rut_trabajador"]!=null){
			$Duracion =$_POST["tiempo"];
			$rut = $_POST["rut_trabajador"];
			$cod_servicio= $_POST["cod_servicio"];
			$i=count($_POST["rut_trabajador"],0);
				for($j=0;$j<$i;$j++){
					$rut=$_POST["rut_trabajador"][$j];
					$sql1="INSERT INTO SERVICIO_TRABAJADOR (cod_servicio , rut_trabajador , duracion) VALUES 
					('$cod_servicio','$rut','$Duracion')";
					$res1=query($sql1);
				}//FIN DEL CICLO FOR
      		       }
		  }
  	echo json_encode($res1);
 ?>					
