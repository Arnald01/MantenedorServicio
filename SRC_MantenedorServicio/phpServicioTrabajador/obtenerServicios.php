<?php
   header("Access-Control-Allow-Origin: *");
   header('Content-Type: application/json');
   require_once "db.php";


    $sql = "SELECT cod_servicio , tipo_servicio, nombre , descripcion , precio FROM SERVICIO";
    

   $resultado = select($sql);
   echo json_encode($resultado);
 ?>


