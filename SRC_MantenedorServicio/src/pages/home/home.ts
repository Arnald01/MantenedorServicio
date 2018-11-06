import { Component } from '@angular/core';
import { NavController , AlertController, ModalController} from 'ionic-angular';
import { Validators , FormBuilder, FormGroup } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { valNom } from '../../Validaciones/valNom';
import { ModalServicioPage } from '../modal-servicio/modal-servicio';
import { ModificarServicioPage } from '../modificar-servicio/modificar-servicio';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //VARIABLES
  trabajadores:any = {};
  checkboxdata :any;
  data :any;
  servicios:any;
  //FORMULARIO 
  private FServicio : FormGroup;

  constructor(public navCtrl: NavController , private FBuild : FormBuilder , public alertCtrl:AlertController,
    private TrabService : RestProvider, public modalCtrl : ModalController) {
    this.FServicio = this.FBuild.group({
      Nombre:['',[Validators.required,Validators.maxLength(30)],[valNom.valorUnico(this.TrabService)]],
      TipoServicio:['',[Validators.required,Validators.maxLength(30)]],
      Descripcion:['',Validators.maxLength(300)],
      Precio:['',[Validators.required,Validators.pattern(/^[0-9]+$/),Validators.maxLength(7)]],
      Tiempo:['00:30']
    })
   
  }
//INGRESAR SERVICIO **************************************************************************************
  IngresarServicio(formulario:FormGroup){
        //OBTENCION DE TRABAJADORES
        let n:any = 0;
          this.TrabService.obtenertrabajador(n).subscribe( 
            (resp) =>{   
              this.trabajadores = resp;
              let alert = this.alertCtrl.create();
              alert.setTitle("Asociar Trabajador (Opcional)");
              alert.setSubTitle("Seleccione los trabajadores que imparten este Servicio");
                    this.trabajadores.forEach(value => {
                        alert.addInput({
                            type:'checkbox',
                            label:value["nombre"],
                            value:value["rut_trabajador"]
                         });
                     })
              alert.addButton('Cancelar');
              alert.addButton({
                text:'Aceptar',
                handler: data =>{  
                      //INGRESO TABLA SERVICIO-TRABAJADOR Y SERVICIO
                        let Datos = {
                          rut_trabajador:data,
                          cod_servicio:this.data,
                          Nombre:formulario.controls['Nombre'].value,
                          Descripcion:formulario.controls['Descripcion'].value,
                          TipoServicio:formulario.controls['TipoServicio'].value,
                          Precio:formulario.controls['Precio'].value,
                          Tiempo:formulario.controls['Tiempo'].value,
                        }

                        this.TrabService.guardarServicioTrabajador(Datos).subscribe((res)=>{
                          console.log(res)
                          let resp:any = res;
                          if(resp.mensaje =="exitoso!"){
                             this.MostrarAlerta(1); 
                          }else{
                            this.MostrarAlerta(0);
                          }
                        },(error) => {console.log(error)})

                  this.checkboxdata = data;
                }
              })
              alert.present(); 
            },//FIN REGISTRAR DATOS
            (error) =>{
              console.log(error);
            })//FIN SUSCRIPCION
  }//FIN METODO

  //ALERTA DE EXITO INGRESO DE DATOS
  MostrarAlerta(n:number){
    if(n==1){
     let alert= this.alertCtrl.create(
       { title:'Registro Exitoso',
         subTitle:'Los datos fueron ingresados Exitosamente!'
       }
     );
     alert.present();
    }else{
      let alert= this.alertCtrl.create(
        { title:'Registro Fallidos',
          subTitle:'Ocurrio un error intentelo denuevo'
        }
      );
      alert.present(); 
    }
  }//FIN METODO MOSTRAR ALERTA INGRESO DE DATOS ********************+*****************************************

  //LISTAR SERVICIOS **************************************************************************************
  ListarServicios(){
    console.log("hola");
    this.TrabService.obtenerServicios().subscribe((resp) =>{
      this.servicios = resp; 
      console.log(this.servicios);
    },
    (error)=> { console.log(error) })
  }
  //ABRIR DETALLE DE LA LISTA
  openModal(servicio){
    let modal = this.modalCtrl.create(ModalServicioPage ,{servicio});
    modal.present();
  }  
  //ELIMINAR SERVICIO ********************************************************************+++
  Eliminar(codigo){
    this.TrabService.EliminarServicio(codigo).subscribe((Resp)=>{
      let status:any = Resp;
      console.log(status)
      if(status.mensaje == "exitoso!"){
        let alert = this.alertCtrl.create({
          title:"Eliminacion Exitosa!",
          subTitle:"El servicio se ah elimiado con exito"
        })
        alert.present();
      }else{
        let alert = this.alertCtrl.create({
          title:"Error!",
          subTitle:"Ocurrio un error al eliminar el servicio"
        })
        alert.present();
      }
      this.ListarServicios();
    })
  }
  //MODIFICAR
  Modificar(servicio){
    this.navCtrl.push(ModificarServicioPage,{servicio});
  }
}
