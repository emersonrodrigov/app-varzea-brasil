import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LojaListaPage } from './loja-lista';

@NgModule({
  declarations: [
    LojaListaPage,
  ],
  imports: [
    IonicPageModule.forChild(LojaListaPage),
  ],
})
export class LojaListaPageModule {}
