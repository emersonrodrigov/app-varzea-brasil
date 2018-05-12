import { ClubeListaPage } from './../clube-lista/clube-lista';
import { MessageServiceProvider } from './../../providers/message-service/message-service';
import { SessionServiceProvider } from './../../providers/session-service/session-service';
import { COLECAO_FIRESTORE } from './../Util/constants';
import { CampeonatoDetalhePage } from './../campeonato-detalhe/campeonato-detalhe';
import { CampeonatoServiceProvider } from './../../providers/campeonato-service/campeonato-service';
import { Clube } from './../../entity/clube';
import { Campeonato } from './../../entity/campeonato';
import { CampeonatoCadastroPage } from './../campeonato-cadastro/campeonato-cadastro';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CampeonatoListaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-campeonato-lista',
  templateUrl: 'campeonato-lista.html',
})
export class CampeonatoListaPage {

  aba: string = "aberto";
  listaCampeonatosAbertos: Campeonato[];
  listaCampeonatosAndamento: Campeonato[];
  listaCampeonatosFinalizado: Campeonato[];

  listaCarregada : Campeonato[];

  camp: Campeonato = new Campeonato();
  clube: Clube;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public serviceCampeonato: CampeonatoServiceProvider,
    public serviceSession: SessionServiceProvider,
    public serviceMessage : MessageServiceProvider
    ) {

  this.listar();

    serviceSession.getDadosSessao(COLECAO_FIRESTORE.CLUBES).then((obj) => {
      this.clube = JSON.parse(obj);
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CampeonatoListaPage');
  }


listar(){
    this.serviceCampeonato.listAll().subscribe(campAberto => {
      this.listaCampeonatosAbertos = campAberto;
      this.listaCarregada = campAberto;
    });
}


  public cadastrar() {
    this.navCtrl.push(CampeonatoCadastroPage);
  }

  visualizarAnuncio(selecionado: Campeonato) {
    this.navCtrl.push(CampeonatoDetalhePage, { campeonato: selecionado , detalhe : true});
  }

  participarCampeonato(campeonatoPart: Campeonato) {
    this.serviceCampeonato.addClube(campeonatoPart, this.clube);
    this.serviceMessage.showToastMessage('Entrar em contato com os organizadores para efetuar pagamento da inscrição')
  }

  verClubesInscritos(campeonatoPart: Campeonato){
    this.navCtrl.push(ClubeListaPage, {campeonato: campeonatoPart});
  } 


  getItems(ev: any) {
    //carregar itens
    this.listaCampeonatosAbertos = this.listaCarregada;

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.listaCampeonatosAbertos = this.listaCampeonatosAbertos.filter((item) => {
        return (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
