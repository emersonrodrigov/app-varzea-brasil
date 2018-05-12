import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfrontoListaPage } from './confronto-lista';

@NgModule({
  declarations: [
    ConfrontoListaPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfrontoListaPage),
  ],
})
export class ConfrontoListaPageModule {}
