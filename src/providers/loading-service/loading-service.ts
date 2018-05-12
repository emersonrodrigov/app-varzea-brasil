import { Loading, LoadingController } from 'ionic-angular';

import { Injectable } from '@angular/core';
/*
  Generated class for the LoadingServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoadingServiceProvider {

  loading: Loading;

  constructor(public loadingCtrl: LoadingController) {
    console.log('Hello LoadingServiceProvider Provider');
    
   
  }
 

  show(msg?:string) {

    if(!msg){
      msg = 'Carregando...';
    }

    this.loading = this.loadingCtrl.create({
      content: msg
    });

    this.loading.present();
  }

  hide() {
    this.loading.dismiss();
  }

}
