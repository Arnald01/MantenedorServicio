import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalServicioPage } from './modal-servicio';

@NgModule({
  declarations: [
    ModalServicioPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalServicioPage),
  ],
})
export class ModalServicioPageModule {}
