import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController, ViewController ,AlertController , PopoverController} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { PopModDuracionPage } from '../pop-mod-duracion/pop-mod-duracion';

/**
 * Generated class for the ModalServicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-servicio',
  templateUrl: 'modal-servicio.html',
})

export class ModalServicioPage {
  servicio:any;
  trabajador:any;
  constructor(public navCtrl: NavController, public navParams: NavParams , public viewCtrl:ViewController,
    private http : RestProvider , private alertCrtl : AlertController,
      
      private pop :PopoverController, private Toast :ToastController) {
      this.servicio = navParams.get('servicio');

  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad ModalServicioPage');

    let cod=this.servicio["cod_servicio"];
    console.log(cod)
    this.http.obtenerServicioTrabajador(cod).subscribe((resp)=>{
      console.log(resp);
      this.trabajador = resp;
    },
    (error) => {console.log(error)});
    let Toast = this.Toast.create({
      message:"Clickee la duracion , para modificarla",
      duration:2000,
      dismissOnPageChange:true,
      position:'bottom'
    })
    Toast.present();
  }


  presentPopOver(myEvent,data,dr){
    console.log(data)
    let poper = this.pop.create(PopModDuracionPage,{data,dr},{cssClass:'setting-modal'}); //css 4735
      poper.present({ev:myEvent});
  }

  //ALERTA CON LISTA DE TRABAJADORES
  OpenAlert(){
    let n:number =this.servicio.cod_servicio;
    console.log(n);
    this.http.obtenertrabajador(n).subscribe((resp)=>{
      this.trabajador =resp;
      console.log(resp);
      let alert = this.alertCrtl.create();
      alert.setTitle("Asociar Trabajador (Opcional)");
      alert.setSubTitle("Seleccione los trabajadores que desea asociar a este Servicio");
            this.trabajador.forEach(value => {
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
                  cod_servicio:this.servicio.cod_servicio,
                  tiempo:'00:30:00'
                }
                console.log(Datos);
                this.http.AssocServicioExistente_Trabajador(Datos).subscribe((res)=>{
                  console.log(res)
                  let resp:any = res;
                  if(resp.mensaje =="exitoso!"){
                     this.MostrarAlerta(1); 
                  }else{
                    this.MostrarAlerta(0);
                  }
                },(error) => {console.log(error)})

        }
      })
      alert.present();
    },//FIN REGISTRAR DATOS
    (error) =>{
      console.log(error);
    })//FIN SUSCRIPCION
  }

  MostrarAlerta(n:number){
    if(n==1){
     let alert= this.alertCrtl.create(
       { title:'Registro Exitoso',
         subTitle:'Los datos fueron ingresados Exitosamente!'
       }
     );
     alert.present();
    }else{
      let alert= this.alertCrtl.create(
        { title:'Registro Fallidos',
          subTitle:'Ocurrio un error intentelo denuevo'
        }
      );
      alert.present(); 
    }
  }//FIN METODO MOSTRAR ALERTA INGRESO DE DATOS ********************+*******

}
