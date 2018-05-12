import { ClubeEscudoPage } from './../clube-escudo/clube-escudo';
import { ClubeJogoPage } from './../clube-jogo/clube-jogo';
import { COLECAO_FIRESTORE } from './../Util/constants';
import { Clube } from './../../entity/clube';
import { SessionServiceProvider } from './../../providers/session-service/session-service';
import { ClubeServiceProvider } from './../../providers/clube-service/clube-service';
import { ClubeCadastroPage } from './../clube-cadastro/clube-cadastro';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MinhaContaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-minha-conta',
  templateUrl: 'minha-conta.html',
})
export class MinhaContaPage {
  clube:Clube;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public serviceClube: ClubeServiceProvider,  public serviceSession: SessionServiceProvider) {


      serviceSession.getDadosSessao(COLECAO_FIRESTORE.CLUBES).then((obj)=>{
        this.clube = JSON.parse( obj);
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MinhaContaPage');
  }


  public dadosClube(){
    this.navCtrl.push(ClubeCadastroPage, {clube:this.clube, isMinhaConta: true});
  }

   public dadosPartida(){
    this.navCtrl.push(ClubeJogoPage, {clube:this.clube, isMinhaConta: true});
  }

   public dadosEscudo(){
    this.navCtrl.push(ClubeEscudoPage, {clube:this.clube, isMinhaConta: true});
  }

}
