import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController} from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { HomePage } from '../home/home';
/**
 * Generated class for the PopModDuracionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pop-mod-duracion',
  templateUrl: 'pop-mod-duracion.html',
})
export class PopModDuracionPage {
  data:any;
  dura:any;
  duracion :FormGroup
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuild:FormBuilder, public http :RestProvider ,public viewCtrl :ViewController ) {
      this.data= navParams.get('data');
      this.dura=navParams.get('dr');
      this.duracion = this.formBuild.group({
        Tiempo:[''],
      })
      this.duracion.controls['Tiempo'].setValue(this.dura);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopModDuracionPage');
  }

  UpdateDuracion(control:FormControl){
    console.log(control.value)
    console.log(this.data);
    let datos :any = {
      rut : this.data,
      duracion :control.value
    }
    this.http.UpdateDuracion(datos).subscribe((resp) => {
      let response:any = resp;
      console.log(response);
    },
    (error) => console.log(error));
    this.viewCtrl.dismiss();
  }
  
}
