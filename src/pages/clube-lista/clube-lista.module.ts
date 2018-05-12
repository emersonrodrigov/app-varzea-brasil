import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClubeListaPage } from './clube-lista';

@NgModule({
  declarations: [
    ClubeListaPage,
  ],
  imports: [
    IonicPageModule.forChild(ClubeListaPage),
  ],
})
export class ClubeListaPageModule {}
