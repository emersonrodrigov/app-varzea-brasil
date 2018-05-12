import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClubeCadastroPage } from './clube-cadastro';

@NgModule({
  declarations: [
    ClubeCadastroPage,
  ],
  imports: [
    IonicPageModule.forChild(ClubeCadastroPage),
  ],
})
export class ClubeCadastroPageModule {}
