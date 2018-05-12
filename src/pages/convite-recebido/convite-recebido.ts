import { Utils } from './../Util/Utils';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { ConviteFiltroPage } from './../convite-filtro/convite-filtro';
import { AlertController, Platform } from 'ionic-angular';
import { LoadingServiceProvider } from './../../providers/loading-service/loading-service';

import { Confronto } from './../../entity/confronto';
import { MessageServiceProvider } from './../../providers/message-service/message-service';
import { ConfrontoServiceProvider } from './../../providers/confronto-service/confronto-service';
import { ConviteServiceProvider } from './../../providers/convite-service/convite-service';
import { Clube } from './../../entity/clube';
import { COLECAO_FIRESTORE, StatusConvite } from './../Util/constants';
import { SessionServiceProvider } from './../../providers/session-service/session-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ConviteRecebidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-convite-recebido',
  templateUrl: 'convite-recebido.html',
})
export class ConviteRecebidoPage {

  listaConvitesRecebidos: Clube[] = new Array();
  listaConvitesEnviados: Clube[] = new Array();
  clubeLogado: Clube;
  observableConvite;
  isExisteConvite: boolean = false;


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
        public serviceSession: SessionServiceProvider,
        public serviceConvite: ConviteServiceProvider,
        public serviceConfronto: ConfrontoServiceProvider,
        public serviceMessage: MessageServiceProvider,
        public serviceLoading: LoadingServiceProvider,
        public localNotifications: LocalNotifications,
        public platform: Platform) {

        this.listaConvitesEnviados = new Array();

        serviceSession.getDadosSessao(COLECAO_FIRESTORE.CLUBES).then((obj) => {
        this.clubeLogado = JSON.parse(obj);

        this.carregarConvites(this.clubeLogado);
    });


  }



  carregarConvites(clubeSessao: Clube) {
    this.serviceLoading.show();
    this.serviceConvite.convitesRecebidos(clubeSessao).subscribe(convitesRecebidos => {
      this.listaConvitesRecebidos = convitesRecebidos;

      // this.localNotifications.schedule({
      //       text: 'Seu clube recebeu um convite de confronto, acessa o menu convites recebidos.',
      //       at: new Date(new Date().getTime() + 3600),
      //       led: 'FF0000',
      //       data: {origem: 'conviteRecebe'} 
      // });

      // this.localNotifications.on('click', (notification,state)=>{
      //    let json =  JSON.parse(notification.data);

      //    if(json.origem == 'conviteRecebe'){
      //      this.navCtrl.push(ConviteRecebidoPage);
      //    }
      // })

        this.isExisteConvite = false;
        this.listaConvitesRecebidos.forEach((item) => {



            if (item.statusConvite == StatusConvite.AGUARDANDO.toString()) {
              this.isExisteConvite = true;

              // verifica se existe convite expirado, convite sem resposta apos a data limite (data do convite)
              // esses convites serao cancelados
              let dataConvite = Utils.getDateFirestore(item.dataPartidaConvite);
              let dataAtual =  new Date();

              if(dataConvite.getTime >= dataAtual.getTime){
                  // convite será cancelado
                  this.alteraStatusConvite(item, StatusConvite.CANCELAR, 'Cancelado por falta de resposta.');
              }

            }
      })

      this.carregaDadosConvitesEnviados();
      console.log('[ConviteRecebidoPage] - lista de convites recebidos.', convitesRecebidos);
      this.serviceLoading.hide();
    }, erro => {
      console.log('[ConviteRecebidoPage] - ocorreu um erro ao listar os convites recebidos. ', erro);
      this.serviceLoading.hide();
    }
    )

  }


  carregaDadosConvitesEnviados() {

    this.listaConvitesRecebidos.forEach(element => {

      // carrega todos os convites enviado,  de um determinado clube 
      // exemplo vasco -> convida -> palmeiras
      // palmeiras recebe o convite recebido de vasco
      // neste ponto eu busco os convites enviados pelo vasco, para atualizar 
      // os convites de acordo a necessidade
      this.serviceConvite.getConviteEnviado(element, element.codigoConvite)
        .subscribe(
        ret => {
                if(ret){
                  console.log('Convite Enviados: ' + ret.codigoConvite + '-' + ret.nome, ret);
                  let conviteEnviadoExiste = this.listaConvitesEnviados.find(item => item.codigoConvite == ret.codigoConvite);
                  //so adiciona na lista caso nao exista.
                  if (!conviteEnviadoExiste) {
                    this.listaConvitesEnviados.push(ret)
                  }
                }
              }
        );


    });
  }


  aceitarConfronto(clubeConviteRecebido: Clube) {
    let confirm = this.alertCtrl.create({
      title: "Deseja realmente aceitar o confronto?",
      //message : 

      buttons: [{
        text: "Sim",
        handler: () => {



          this.listaConvitesEnviados.forEach(clubeConviteEnviado => {
            if (clubeConviteEnviado.codigoConvite == clubeConviteRecebido.codigoConvite) {


              // this.serviceLoading.show();
              //this.serviceConvite.getConviteEnviado(clubeConviteRecebido, clubeConviteRecebido.codigoConvite).subscribe(clubeConviteEnviado => {
              let confronto: Confronto = new Confronto();

              // se o mande for o clube que recebeu o convite
              if (clubeConviteRecebido.flgMandanteConvite && clubeConviteRecebido.flgMandanteConvite == "1") {
                confronto.campo = clubeConviteRecebido.campo;
                confronto.clubeMandante = Object.assign({}, clubeConviteRecebido);;
                confronto.clubeVisitante = Object.assign({}, clubeConviteEnviado);
                confronto.data = clubeConviteRecebido.dataPartidaConvite;
                confronto.horarioInicio = clubeConviteRecebido.horaInicioJogo;
                confronto.horarioFim = clubeConviteRecebido.horaFimJogo;
              }

              // se o mandante for o clube que enviou o convite
              if (clubeConviteEnviado.flgMandanteConvite && clubeConviteEnviado.flgMandanteConvite == "1") {
                confronto.campo = clubeConviteEnviado.campo;
                confronto.clubeMandante = Object.assign({}, clubeConviteEnviado);
                confronto.clubeVisitante = Object.assign({}, clubeConviteRecebido);
                confronto.data = clubeConviteEnviado.dataPartidaConvite;
                confronto.horarioInicio = clubeConviteEnviado.horaInicioJogo;
                confronto.horarioFim = clubeConviteEnviado.horaFimJogo;
              }

              confronto.realizado = false;
              confronto.resultadoMandante = 0;
              confronto.resultadoVisitante = 0;

              // salvar confronto no clube que recebeu o convite
              this.serviceConfronto.saveConfrontoClube(this.clubeLogado, confronto);

              // salvar o confronto no clube que enviou o convite
              this.serviceConfronto.saveConfrontoClube(clubeConviteRecebido, confronto);

              this.serviceMessage.showToastMessage("Convite aceito com sucesso. Jogo já agendado !!", true, 5000);


              this.alteraStatusConvite(clubeConviteRecebido, StatusConvite.ACEITAR);

              this.alterarStatusParaRecusado(clubeConviteRecebido);

              console.log('[ConviteRecebidoPage] - convite aceito.', confronto);
              return;
            }
          })

        }
      },
      {
        text: 'Não',
        handler: () => {
          console.log('[ConviteRecebidoPage] - confronto não aceito.');
        }
      }]
    });
    confirm.present();
  }

  recusarConfronto(clubeConviteRecebido: Clube) {

    let confirm = this.alertCtrl.create({
      title: "Deseja realmente recusar o confronto?",
      //message : 

      buttons: [{
        text: "Sim",
        handler: () => {


          this.alteraStatusConvite(clubeConviteRecebido, StatusConvite.RECUSAR);

          // this.serviceLoading.hide();
          this.serviceMessage.showToastMessage("Convite recusado com sucesso.");
        }
      },
      {
        text: 'Não',
        handler: () => {
          console.log('[ConviteRecebidoPage] - confronto não aceito.');
        }
      }]
    });
    confirm.present();

  }



  alteraStatusConvite(clubeConviteRecebido: Clube, statusConvite: StatusConvite, msgMotivo?: string) {
    this.listaConvitesEnviados.forEach(
      item => {
        if (item.codigoConvite == clubeConviteRecebido.codigoConvite) {
          item.statusConvite = statusConvite.toString();
          this.serviceConvite.alterarConviteEnviado(clubeConviteRecebido, item, item.codigoConvite);
        }
      }
    )

    this.listaConvitesRecebidos.forEach(
      item => {
        if (item.codigoConvite == clubeConviteRecebido.codigoConvite) {
          //altero o status do time que RECEBEU O CONVITE
          item.statusConvite = statusConvite.toString();
          this.serviceConvite.alterarConviteRecebido(this.clubeLogado, item, item.codigoConvite);
        }
      }
    )

  }

  // altera convites da mesma data do convite aceito para cancelado e o motivo 
  // motivo do cancelamento = 'Jogo Marcado com Clube XX'
  alterarStatusParaRecusado(clubeConviteAceito: Clube) {

    this.observableConvite = this.serviceConvite.convitesEnviadosPorStatusDataConvite(clubeConviteAceito, StatusConvite.AGUARDANDO.toString())
      .subscribe(res => {

        res.forEach(conviteLido => {

          // altera os status do demais convites enviado para cancelado, apos o primerio convite aceito naquela data.
          conviteLido.motivoCancelamento = 'Jogo foi marcado com o time ' + clubeConviteAceito.nome;
          conviteLido.statusConvite = StatusConvite.CANCELAR.toString();
          this.serviceConvite.alterarConviteEnviado(clubeConviteAceito, conviteLido, conviteLido.codigoConvite);
          console.log('[ConviteRecebidoPage] - convite enviado cancelado, motivo: já foi aceito um confronto com outro time', conviteLido)


          this.serviceConvite.alterarStatusConviteRecebido(conviteLido, conviteLido.codigoConvite, StatusConvite.CANCELAR.toString(),
            'Clube já marcou jogo com outro time');
          console.log('[ConviteRecebidoPage] - convite recebido cancelado, motivo: já foi aceito um confronto com outro time', conviteLido)
        });
      }
      );
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ConviteRecebidoPage');
  }
  ngOnDestroy() {
    if (this.observableConvite) {
      this.observableConvite.unsubscribe();
    }
  }

  marcarJogos() {
    this.navCtrl.setRoot(ConviteFiltroPage);
  }
}
