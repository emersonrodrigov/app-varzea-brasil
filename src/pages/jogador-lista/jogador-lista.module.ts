import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JogadorListaPage } from './jogador-lista';

@NgModule({
  declarations: [
    JogadorListaPage,
  ],
  imports: [
    IonicPageModule.forChild(JogadorListaPage),
  ],
})
export class JogadorListaPageModule {}
