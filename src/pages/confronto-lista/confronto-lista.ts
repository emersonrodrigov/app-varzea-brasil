import { Utils } from './../Util/Utils';
import { ConfrontoDetalhePage } from './../confronto-detalhe/confronto-detalhe';
import { Clube } from './../../entity/clube';
import { LoadingServiceProvider } from './../../providers/loading-service/loading-service';
import { COLECAO_FIRESTORE } from './../Util/constants';
import { SessionServiceProvider } from './../../providers/session-service/session-service';
import { ClubeServiceProvider } from './../../providers/clube-service/clube-service';
import { ConfrontoServiceProvider } from './../../providers/confronto-service/confronto-service';
import { Confronto } from './../../entity/confronto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ConfrontoListaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confronto-lista',
  templateUrl: 'confronto-lista.html',
})
export class ConfrontoListaPage {

  public listaConfrontos: Confronto[] = new Array();
  public listaConfrontosRealizados: Confronto[] = new Array();
  public clube: Clube;
  public tipoJogo: string = "proximos";
  observableConfronto;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public serviceConfronto: ConfrontoServiceProvider,
    public serviceLoading: LoadingServiceProvider,
    public serviceSession: SessionServiceProvider,
    public serviceClube: ClubeServiceProvider) {

    serviceSession.getDadosSessao(COLECAO_FIRESTORE.CLUBES).then((obj) => {
      this.clube = JSON.parse(obj);

      this.carregaConfrontos();
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfrontoListaPage');
  }

  

  carregaConfrontos() {

    this.serviceLoading.show();
    this.observableConfronto = this.serviceConfronto.listaConfrontos(this.clube,false).subscribe(lista => {
      
      this.listaConfrontos = lista;
      
      this.verificaConfrontoRealizado();
      
      this.serviceLoading.hide();
      
      console.log('[ConfrontoListaPage ]- lista de confrontos.', lista);
    }, erro => {
      this.serviceLoading.hide();
      console.log('[ConfrontoListaPage ]- ocorreu um erro ao listar os confrontos.', erro);
    });

   
  }
  

  carregaRealizados(){
    this.serviceLoading.show();
    this.observableConfronto = this.serviceConfronto.listaConfrontos(this.clube,true).subscribe(lista => {
      
      this.listaConfrontosRealizados = lista;
      
      
      this.serviceLoading.hide();
      
      console.log('[ConfrontoListaPage ]- lista de confrontos realizados.', lista);
    }, erro => {
      this.serviceLoading.hide();
      console.log('[ConfrontoListaPage ]- ocorreu um erro ao listar os confrontos realizados.', erro);
    });
  }

  verificaConfrontoRealizado(){

      this.listaConfrontos.forEach(
        item=> {

          
          let dataPartida:Date = Utils.getDateFirestore(item.data);

          let horaFimPartida: string = item.horarioFim ;

          let horaAtual: string =Utils.getHoraAtual();

          let dataAtual = Utils.getDateAtual(); 
           

            if((dataPartida.getTime() < dataAtual.getTime())
                  || (dataPartida.getTime()== dataAtual.getTime()
                        && horaFimPartida <= horaAtual) ){
                              
               console.log("[ConfrontoListaPag]- Existem confrontos já realizados, data partida" ,  dataPartida.toDateString());
               item.realizado = true;
               this.serviceConfronto.updateConfrontoClube(item.clubeMandante,item);
               console.log("[ConfrontoListaPag]- atualiza confronto(mandante) para realizado", item);
               this.serviceConfronto.updateConfrontoClube(item.clubeVisitante,item);
               console.log("[ConfrontoListaPag]- atualiza confronto(visitante) para realizado", item);
            } 
          }
      )

      this.ngOnDestroy()
  }   


ngOnDestroy() {
    if (this.observableConfronto) {
      this.observableConfronto.unsubscribe();
    }
  }
  public detalheConfronto(confrontoSelecionado:Confronto){

      this.navCtrl.push(ConfrontoDetalhePage, {confronto:confrontoSelecionado, clube:this.clube});

  }
}
