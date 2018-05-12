import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JogadorCadastroPage } from './jogador-cadastro';

@NgModule({
  declarations: [
    JogadorCadastroPage,
  ],
  imports: [
    IonicPageModule.forChild(JogadorCadastroPage),
  ],
})
export class JogadorCadastroPageModule {}
