import { ConviteFiltroPage } from './../convite-filtro/convite-filtro'; 
import { LoadingServiceProvider } from './../../providers/loading-service/loading-service';
import { COLECAO_FIRESTORE } from './../Util/constants';
import { ConviteServiceProvider } from './../../providers/convite-service/convite-service';
import { SessionServiceProvider } from './../../providers/session-service/session-service';
import { Clube } from './../../entity/clube'; 
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-convite-enviado',
  templateUrl: 'convite-enviado.html',
})
export class ConviteEnviadoPage {

  listaClubesEnviados: Clube[] = new Array();
  isExisteConvite:boolean = false;
  clube: Clube;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public serviceSession: SessionServiceProvider,
    public serviceConvite: ConviteServiceProvider,
    public serviceLoading: LoadingServiceProvider) {

    serviceSession.getDadosSessao(COLECAO_FIRESTORE.CLUBES).then((obj) => {
      this.clube = JSON.parse(obj);
      this.carregarConvites(this.clube);
      
          
    });
 
    

  }





  carregarConvites(clube: Clube) {

    this.serviceLoading.show();
    this.serviceConvite.convitesEnviados(clube).subscribe(clubesConvitesEnviados => {
      this.listaClubesEnviados = clubesConvitesEnviados;
      if(this.listaClubesEnviados.length > 0){
          this.isExisteConvite=true;
      } 

      


      this.serviceLoading.hide();

      console.log('[ConviteEnviadoPage] - lista de convites enviados.', clubesConvitesEnviados)
    },erro =>{
        this.serviceLoading.hide();
         console.log('[ConviteEnviadoPage] - ocorreu um erro ao listar os convites enviados. ', erro)
    });

  }


  // cancela convites nao respondivos
  verificaConvitesNaoRespondido(){

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ConviteEnviadoPage');
  }

  marcarJogos(){
    this.navCtrl.setRoot(ConviteFiltroPage);
  }

}
