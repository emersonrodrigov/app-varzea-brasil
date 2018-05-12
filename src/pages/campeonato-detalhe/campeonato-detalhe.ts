import { Campeonato } from './../../entity/campeonato';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CampeonatoDetalhePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-campeonato-detalhe',
  templateUrl: 'campeonato-detalhe.html',
})
export class CampeonatoDetalhePage {

  public campeonato: Campeonato;
  public isDetalhe:boolean = false;;
  constructor(public navCtrl: NavController, public navParams: NavParams) {


    //se for alteracao
    if (navParams.get('campeonato') != null) {
      this.campeonato = navParams.get('campeonato');
    }

    if(navParams.get('detalhe') != null){
      this.isDetalhe = navParams.get('detalhe');
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CampeonatoDetalhePage');
  }

}
