import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  api : string = 'http://localhost/php/ServicioTrabajador/'
  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }
  obtenertrabajador(n){//LISTA A TODOS LOS TRABAJADORES(0) Y A LOS QUE NO ESTAN ASOCIADOS(1) DEPENDIENDO DEL PARAMETRO
      console.log(n)
      return this.http.post(this.api+'obtenerTrabajadores.php',JSON.stringify(n));

  }
  
  obtenerServicios(){//LISTA A TODOS LOS SERVICIOS
    return this.http.get(this.api+'obtenerServicios.php');
  }
  obtenerServicioTrabajador(cod){//OBTIENETODOS LOS TRABAJADORES ASOCIADOS A UN SERVICIO
    return this.http.post(this.api+'obtenerServicioTrabajador.php',JSON.stringify(cod));
  }
  //ultimo
  BuscarServicio(Nombre:string):Observable<any>{//OBTIENE UN SERVICIO EN PARTICULAR PARA VERIFICAR EXISTENCIA
      return this.http.post(this.api+'buscar.php' , JSON.stringify(Nombre));
  }
  guardarServicioTrabajador(datos){ //INSERTA LOS SERVICIOS Y TRABAJADORES SELECCIONADOS EN REGISTRO DE SERVICIO
    console.log("REST")
    console.log(datos);
   return this.http.post(this.api+'ingresarServicioTrabajador.php', JSON.stringify(datos) );
  } 
  AssocServicioExistente_Trabajador(datos){ //ASOCIA UN SERVICIO YA EXISTENTE A UN NUEVO TRABAJADOR
    console.log("REST")
    console.log(datos);
   return this.http.post(this.api+'AssocServicioTrabajador.php', JSON.stringify(datos) );
  } 
  EliminarServicio(codigo){//ELIMINA UN SERVICIO
    return this.http.post(this.api+'eliminarServicio.php',JSON.stringify(codigo));
  }
  UpdateDuracion(data){//ACTUALIZA LA DURACION DE UN SERVICIO PARA UN TRABAJADOR PARTICULAR
    return this.http.post(this.api+'ActualizarDuracionTr.php',JSON.stringify(data));
  }

  UpdateServicio(todo){//MODIFICA UN SERVICIO
    return this.http.post(this.api+'ModificarServicio.php', JSON.stringify(todo));
  }
}
