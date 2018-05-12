import { CampeonatoServiceProvider } from './../../providers/campeonato-service/campeonato-service';
import { Campeonato } from './../../entity/campeonato';
import { Clube } from './../../entity/clube';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ClubeListaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-clube-lista',
  templateUrl: 'clube-lista.html',
})
export class ClubeListaPage {


  clubesInscritos: Clube[] = new Array();
  campeonato: Campeonato;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public serviceCampeonato : CampeonatoServiceProvider) {


    if(this.navParams.get("campeonato") != null){
       this.campeonato = this.navParams.get("campeonato");

       this.serviceCampeonato.listaClubesInscrito(this.campeonato).subscribe(retorno =>{
         this.clubesInscritos = retorno;
       })

    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClubeListaPage');
  }

}
