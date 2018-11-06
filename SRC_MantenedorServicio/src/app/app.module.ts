import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RestProvider } from '../providers/rest/rest';
import { HttpClientModule } from '@angular/common/http';
import { ModalServicioPageModule } from '../pages/modal-servicio/modal-servicio.module';
import { ModificarServicioPage } from '../pages/modificar-servicio/modificar-servicio';
import { ModificarServicioPageModule } from '../pages/modificar-servicio/modificar-servicio.module';
import { PopModDuracionPageModule } from '../pages/pop-mod-duracion/pop-mod-duracion.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    ModalServicioPageModule,
    ModificarServicioPageModule,
    PopModDuracionPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
  ]
})
export class AppModule {}
