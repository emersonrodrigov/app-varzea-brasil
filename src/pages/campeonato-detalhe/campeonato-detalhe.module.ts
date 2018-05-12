import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CampeonatoDetalhePage } from './campeonato-detalhe';

@NgModule({
  declarations: [
    CampeonatoDetalhePage,
  ],
  imports: [
    IonicPageModule.forChild(CampeonatoDetalhePage),
  ],
})
export class CampeonatoDetalhePageModule {}
