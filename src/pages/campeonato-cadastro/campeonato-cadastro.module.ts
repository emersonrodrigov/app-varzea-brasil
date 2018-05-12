import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CampeonatoCadastroPage } from './campeonato-cadastro';

@NgModule({
  declarations: [
    CampeonatoCadastroPage,
  ],
  imports: [
    IonicPageModule.forChild(CampeonatoCadastroPage),
  ],
})
export class CampeonatoCadastroPageModule {}
