import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CampoModalPage } from './campo-modal';

@NgModule({
  declarations: [
    CampoModalPage,
  ],
  imports: [
    IonicPageModule.forChild(CampoModalPage),
  ],
})
export class CampoModalPageModule {}
