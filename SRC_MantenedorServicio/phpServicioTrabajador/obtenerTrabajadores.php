<?php
   header("Access-Control-Allow-Origin: *");
   header('Content-Type: application/json');
   require_once "db.php";
   $json = file_get_contents("php://input");
   $data = json_decode($json,true);
   $_POST = $data;
    if($_POST == 0){
      $sql ="SELECT t.nombre , t.rut_trabajador FROM TRABAJADOR t WHERE t.correo IN (SELECT correo FROM CUENTA WHERE tipo_cuenta='E')";
    }else{ //OBTENER A TODOS LOS ESTILISTAS QUE POSEAN CUENTA EN EL SISTEMA*/
      $cod = $_POST;
      $sql = "SELECT T.nombre, T.rut_trabajador FROM TRABAJADOR T WHERE T.rut_trabajador NOT IN (SELECT rut_trabajador FROM
      SERVICIO_TRABAJADOR WHERE cod_servicio='$cod') AND T.correo IN (SELECT correo FROM CUENTA WHERE tipo_cuenta='E')";
    }  
   $resultado = select($sql);
   echo json_encode($resultado);
 ?>


