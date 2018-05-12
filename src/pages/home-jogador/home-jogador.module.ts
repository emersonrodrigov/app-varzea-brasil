import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeJogadorPage } from './home-jogador';

@NgModule({
  declarations: [
    HomeJogadorPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeJogadorPage),
  ],
})
export class HomeJogadorPageModule {}
