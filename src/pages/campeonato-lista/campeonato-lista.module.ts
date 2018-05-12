import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CampeonatoListaPage } from './campeonato-lista';

@NgModule({
  declarations: [
    CampeonatoListaPage,
  ],
  imports: [
    IonicPageModule.forChild(CampeonatoListaPage),
  ],
})
export class CampeonatoListaPageModule {}
