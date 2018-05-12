import { Utils } from './../Util/Utils';
import { Clube } from './../../entity/clube';
import { ConfrontoServiceProvider } from './../../providers/confronto-service/confronto-service';
import { LoadingServiceProvider } from './../../providers/loading-service/loading-service';
import { SessionServiceProvider } from './../../providers/session-service/session-service';
import { ClubeServiceProvider } from './../../providers/clube-service/clube-service';
import { Confronto } from './../../entity/confronto';
import { ConfrontoDetalhePage } from './../confronto-detalhe/confronto-detalhe';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ConfrontoAvaliacaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confronto-avaliacao',
  templateUrl: 'confronto-avaliacao.html',
})
export class ConfrontoAvaliacaoPage {


  public listaConfrontos: Confronto[] = new Array();
  public clube: Clube;
  public isExisteConfirmacaoPendente:boolean = false;
  observableConfronto;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public serviceConfronto: ConfrontoServiceProvider,
    public serviceLoading: LoadingServiceProvider,
    public serviceSession: SessionServiceProvider,
    public serviceClube: ClubeServiceProvider) {

    this.clube = navParams.get('clube');

    this.carregaConfrontos();

  }

  ionViewDidLoad() {
    console.log('[ConfrontoListaPage] - ionViewDidLoad  ');
  }

  carregaConfrontos() {

    this.serviceLoading.show();
    this.observableConfronto = this.serviceConfronto.listaConfrontos(this.clube, true).subscribe(lista => {
      this.listaConfrontos = lista;
      

      this.listaConfrontos.forEach(confronto=>{
          if(confronto.realizado && !this.verificaConfirmacaoPlacar(confronto)){
            this.isExisteConfirmacaoPendente = true;
            return ;
          }
      });

      
      this.verificaConfrontoRealizado();
      
      this.serviceLoading.hide();
      console.log('[ConfrontoListaPage ]- lista de confrontos.', lista);
    }, erro => {
      this.serviceLoading.hide();
      console.log('[ConfrontoListaPage ]- ocorreu um erro ao listar os confrontos.', erro);
    })
  }




  public  verificaConfirmacaoPlacar(confronto:Confronto):boolean{
         
          if(this.clube.codigo == confronto.clubeMandante.codigo){
              return confronto.confirmaResultMandante;
          }

          if(this.clube.codigo == confronto.clubeVisitante.codigo){
              if(confronto.confirmaResultVisitante){
                
                return confronto.confirmaResultVisitante;
              }
          }
  }

  verificaConfrontoRealizado() {
    this.listaConfrontos.forEach(
      item => {


        let dataPartida: Date = Utils.getDateFirestore(item.data);

        let horaFimPartida: string = item.horarioFim;

        let horaAtual: string = Utils.getHoraAtual();

        let dataAtual = Utils.getDateAtual();


        if ((dataPartida.getTime() < dataAtual.getTime())
          || (dataPartida.getTime() == dataAtual.getTime()
            && horaFimPartida <= horaAtual)) {

          console.log("[ConfrontoListaPag]- Existem confrontos já realizados, data partida", dataPartida.toDateString());
          
          item.realizado = true;
          
          this.serviceConfronto.updateConfrontoClube(item.clubeMandante, item);
          console.log("[ConfrontoListaPag]- atualiza confronto(mandante) para realizado", item);
          
          this.serviceConfronto.updateConfrontoClube(item.clubeVisitante, item);
          console.log("[ConfrontoListaPag]- atualiza confronto(visitante) para realizado", item);
        }
      }
    )
  }

  public detalheConfronto(confrontoSelecionado: Confronto) {

    this.navCtrl.push(ConfrontoDetalhePage, { confronto: confrontoSelecionado, clube: this.clube });

  }

  ngOnDestroy() {
    if (this.observableConfronto) {
      this.observableConfronto.unsubscribe();
    }
  }

}
