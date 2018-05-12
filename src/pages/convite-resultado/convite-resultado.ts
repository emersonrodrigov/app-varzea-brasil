import { Confronto } from './../../entity/confronto';
import { ConfrontoServiceProvider } from './../../providers/confronto-service/confronto-service';
import { ConfrontoListaPage } from './../confronto-lista/confronto-lista';
import { ConviteRecebidoPage } from './../convite-recebido/convite-recebido';
import { ConviteEnviadoPage } from './../convite-enviado/convite-enviado';
import { NavController } from 'ionic-angular';

import { MessageServiceProvider } from './../../providers/message-service/message-service';
import { LoadingServiceProvider } from './../../providers/loading-service/loading-service';
import { COLECAO_FIRESTORE, StatusConvite } from './../Util/constants';
import { SessionServiceProvider } from './../../providers/session-service/session-service';
import { ConviteServiceProvider } from './../../providers/convite-service/convite-service';
import { ClubeServiceProvider } from './../../providers/clube-service/clube-service';
import { Clube } from './../../entity/clube';
import { AlertController } from 'ionic-angular';
import { Convite } from './../../entity/convite';
import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

/**
 * Generated class for the ConviteResultadoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-convite-resultado',
  templateUrl: 'convite-resultado.html',
})
export class ConviteResultadoPage {


  ionViewDidLoad() {
    console.log('ionViewDidLoad ConviteResultadoPage');
  }

  convite: Convite;
  listaTimes: Clube[] = new Array();
  listaTimesFull: Clube[] = new Array();

  listaConvitesRecebidos: Clube[] = new Array();
  listaConvitesEnviados: Clube[] = new Array();

  isConviteEnviado: boolean;
  isConviteRecebido: boolean;
  isConfrontoMarcado: boolean;
  filtro:String;

  clube: Clube;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public params: NavParams,
    public serviceClube: ClubeServiceProvider,
    public serviceConvite: ConviteServiceProvider,
    public serviceSession: SessionServiceProvider,
    public serviceLoading: LoadingServiceProvider,
    public serviceMessage: MessageServiceProvider,
    public serviceConfronto: ConfrontoServiceProvider) {

    this.isConviteEnviado = false;
    this.isConviteRecebido = false;

    // PEGAR DADOS DA PESQUISA
    this.convite = params.get('convite');


    serviceSession.getDadosSessao(COLECAO_FIRESTORE.CLUBES).then((obj) => {
      this.clube = JSON.parse(obj);

      this.carregarDados();
    });

  }





  public carregarDados() {

    console.log(JSON.stringify(this.convite));

    this.serviceLoading.show();
    this.serviceClube.listaTimesDisponiveis(this.clube, this.convite).subscribe(data => {
      this.listaTimes = data;
      this.listaTimesFull = data;
      this.serviceLoading.hide();
      console.log('[Times listados] ', data);
      this.montarResultado(this.clube);

    }, erro => {
      this.serviceLoading.hide();
      console.log('[Times disponiveis] - Ocorreu um erro ao listar os times ', erro)
    })
  }




  public convidar(clubeConvidado: Clube, index: number) {




    let confirm = this.alertCtrl.create({
      title: "Deseja realmente convidar o time?",
      message: "Time: ".concat(clubeConvidado.nome),
      buttons: [{
        text: "Sim",
        handler: () => {

          // dados referente ao controle do convite
          this.clube.dataPartidaConvite = this.convite.dataPartida;
          clubeConvidado.dataPartidaConvite = this.convite.dataPartida;

          clubeConvidado.statusConvite = StatusConvite.AGUARDANDO.toString();
          this.clube.statusConvite = StatusConvite.AGUARDANDO.toString();
          if (this.clube.flgMandante == 1) {

            this.clube.flgMandanteConvite = "1"; // clube convite  

            //clube logado mandante procura por times visitante
            clubeConvidado.flgMandanteConvite = "2";
          } else if (this.clube.flgMandante == 2) {

            this.clube.flgMandanteConvite == "2"; // clube convite
            // se clube logado visitante procura por mandante
            clubeConvidado.flgMandanteConvite = "1";
          }


          this.serviceConvite.enviarConvite(this.clube, clubeConvidado);





          this.listaTimes.splice(index, 1);

          this.serviceMessage.showToastMessage('Convite enviado com sucesso. Verificar status do convite no Menu (Convites Enviados)', true, 5000);

          console.log('[ConviteResultadoPage] - convite aceito.');
        }
      },
      {
        text: 'Não',
        handler: () => {
          console.log('[ConviteResultadoPage] - convite não aceito.');
        }
      }]
    });

    confirm.present();
  }


  private removeDuplicidadeConvite(lstClubes: Clube[]) {
    lstClubes.forEach((clubeTemp, index) => {

      for (var index = 0; index < this.listaTimes.length; index++) {
        if (clubeTemp.codigo === this.listaTimes[index].codigo) {
          this.listaTimes.splice(index, 1);
        }

      }

    });
  }

  private removeDuplicidadeConfronto(lstConfrontos: Confronto[]) {
    lstConfrontos.forEach((confronto, indexMain) => {

      for (var index = 0; index < this.listaTimes.length; index++) {
        if (confronto.clubeMandante.codigo === this.listaTimes[index].codigo
          || confronto.clubeVisitante.codigo === this.listaTimes[index].codigo) {

          this.listaTimes.splice(index, 1)

        }

      }
    }
    )


  }

  private montarResultado(clubeLogado: Clube) {

    // carregar convites recebidos 
    //this.serviceLoading.show();
    this.serviceConvite.listarConvitesRecebidosPorDataConvite(this.clube, this.convite.dataPartida).subscribe(data => {
      this.listaConvitesRecebidos = data;
      if (data && data.length > 0) {
        this.isConviteRecebido = true;
      }


      this.removeDuplicidadeConvite(this.listaConvitesRecebidos);

      // this.serviceLoading.hide();
      console.log('[ConviteResultadoPage] - lista de convites recebidos.', data);
    }, erro => {
      this.serviceLoading.hide();
      console.log('[ConviteResultadoPage] - Ocorreu um erro ao listar os convites recebidos', erro);
    })

    // VERIFICA SE TEM CONVITES ENVIADO NESSA DATA
    this.serviceConvite.listarConvitesEnviadosPorDataConvite(this.clube, this.convite.dataPartida).subscribe(data => {
      this.listaConvitesEnviados = data;
      if (data && data.length > 0) {
        this.isConviteEnviado = true;
      }
      this.removeDuplicidadeConvite(this.listaConvitesEnviados);
      console.log('[ConviteResultadoPage] - lista de convites enviados.', data);
    }, erro => {
      console.log('[ConviteResultadoPage] - Ocorreu um erro ao listar os convites enviados', erro);
    })

    // VERIFICAR SE EXISTE CONFRONTOS DOS TIMES LISTADOS
    this.listaTimes.forEach(clube => {
      this.serviceConfronto.listaConfrontosPorData(clube, this.convite.dataPartida).subscribe(
        data => {

          console.log('[ConviteResultadoPage] - lista de confrontos do clube listados.', clube.nome, data);
          this.removeDuplicidadeConfronto(data);

        },
        erro => {
          console.log('[ConviteResultadoPage] - Ocorreu um erro ao carregar os confrontos.', erro);
        }

      )
    });

    // VERIRIFICA SE O CLUBE LOGADO TEM JOGADO NA DATA QUE ESTA PESQUISANDO O CONVITE 
    this.serviceConfronto.listaConfrontosPorData(this.clube, this.convite.dataPartida).subscribe(
      data => {
        console.log('[ConviteResultadoPage] - lista de confrontos do clube listados.', this.clube.nome, data);
        this.removeDuplicidadeConfronto(data);
      },
      erro => {
        console.log('[ConviteResultadoPage] - Ocorreu um erro ao carregar os confrontos.', erro);
      }

    )





  }


  menuEnviados() {
    this.navCtrl.setRoot(ConviteEnviadoPage);
  }

  menuRecebidos() {
    this.navCtrl.setRoot(ConviteRecebidoPage);
  }

  menuJogos() {
    this.navCtrl.setRoot(ConfrontoListaPage);
  }



  filterResultado(){
    this.listaTimes = this.listaTimesFull;
    this.listaTimes =  this.listaTimes.filter((item) => {
            return item.nome.toLowerCase().indexOf(this.filtro.toLowerCase()) > -1;
        });
  }

}
