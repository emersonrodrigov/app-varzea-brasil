import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeClubePage } from './home-clube';

@NgModule({
  declarations: [
    HomeClubePage,
  ],
  imports: [
    IonicPageModule.forChild(HomeClubePage),
  ],
})
export class HomeClubePageModule {}
