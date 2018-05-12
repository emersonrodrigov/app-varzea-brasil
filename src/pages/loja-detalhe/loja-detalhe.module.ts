import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LojaDetalhePage } from './loja-detalhe';

@NgModule({
  declarations: [
    LojaDetalhePage,
  ],
  imports: [
    IonicPageModule.forChild(LojaDetalhePage),
  ],
})
export class LojaDetalhePageModule {}
