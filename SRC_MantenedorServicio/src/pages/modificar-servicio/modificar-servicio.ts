import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { Validators , FormBuilder, FormGroup} from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { valNom } from '../../Validaciones/valNom';
import { HomePage } from '../home/home';

/**
 * Generated class for the ModificarServicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modificar-servicio',
  templateUrl: 'modificar-servicio.html',
})
export class ModificarServicioPage {
  FservicioModif : FormGroup;
  datos:any;
  constructor(public navCtrl: NavController, public navParams: NavParams , private frBuild : FormBuilder,
    private TrabService:RestProvider , private alertCrtl : AlertController , private viewCtrl : ViewController) {
    this.datos = this.navParams.get('servicio');
    this.FservicioModif = this.frBuild.group({
      Nombre:['',[Validators.required,Validators.maxLength(30)]],
      TipoServicio:['',[Validators.required,Validators.maxLength(30)]],
      Descripcion:['',Validators.maxLength(300)],
      Precio:['',[Validators.required,Validators.pattern(/^[0-9]+$/),Validators.maxLength(7)]],
      original:[]
    })
    console.log(this.datos)
    this.FservicioModif.controls['Nombre'].setValue(this.datos.nombre);
    this.FservicioModif.controls['TipoServicio'].setValue(this.datos.tipo_servicio);
    this.FservicioModif.controls['Precio'].setValue(this.datos.precio);
    this.FservicioModif.controls['Descripcion'].setValue(this.datos.descripcion);
    let valor = this.FservicioModif.controls['Nombre'].value;
    this.FservicioModif.controls['original'].setValue(valor);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModificarServicioPage');
  }
  UpdateServicio(formulario){
    this.TrabService.UpdateServicio(formulario.value).subscribe((resp)=>{
      let dato:any = resp;
       if(dato.mensaje == "Exito"){
         let alerta = this.alertCrtl.create({
            title:"Modificacion exitosa",
            subTitle:"Datos modificados correctamente",
            buttons:[{
              text:'Aceptar'
            }]            
         });
         alerta.present();
       }else{
        let alerta = this.alertCrtl.create({
          title:"Modificacion Erronea",
          subTitle:"Este nombre ya Existe!",
          buttons:[{
            text:'Aceptar'
          }]            
        });
         alerta.present();
       }
    })
    this.navCtrl.pop();
  }//FIN METODO UPDATE

}
