import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModificarServicioPage } from './modificar-servicio';

@NgModule({
  declarations: [
    ModificarServicioPage,
  ],
  imports: [
    IonicPageModule.forChild(ModificarServicioPage),
  ],
})
export class ModificarServicioPageModule {}
