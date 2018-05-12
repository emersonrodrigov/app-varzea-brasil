import { LocalNotifications } from '@ionic-native/local-notifications';
import { Confronto } from './../../entity/confronto';
import { ConviteFiltroPage } from './../convite-filtro/convite-filtro';
import { ConviteEnviadoPage } from './../convite-enviado/convite-enviado';
import { ConviteRecebidoPage } from './../convite-recebido/convite-recebido';
import { ConfrontoListaPage } from './../confronto-lista/confronto-lista';
import { JogadorListaPage } from './../jogador-lista/jogador-lista';
import { Jogador } from './../../entity/jogador';
import { Clube } from './../../entity/clube';
import { COLECAO_FIRESTORE , StatusConvite} from './../Util/constants';
import { ConviteServiceProvider } from './../../providers/convite-service/convite-service';
import { ConfrontoServiceProvider } from './../../providers/confronto-service/confronto-service';
import { ClubeServiceProvider } from './../../providers/clube-service/clube-service';
import { MessageServiceProvider } from './../../providers/message-service/message-service';
import { SessionServiceProvider } from './../../providers/session-service/session-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Screenshot } from '@ionic-native/screenshot';
/**
 * Generated class for the HomeClubePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-clube',
  templateUrl: 'home-clube.html',
})
export class HomeClubePage {

  public  clube:Clube;
  public  listaConvitesRecebidos: Clube[] = new Array();
  public  listaConvitesEnviados: Clube[] = new Array();
  public  listaJogadores: Jogador[] = new Array();
  public  listaConfrontos: Confronto[] = new Array(); 

  constructor(
                public navCtrl: NavController, 
                public navParams: NavParams,
                public serviceSession: SessionServiceProvider,
                public serviceMessage: MessageServiceProvider,
                public serviceClube: ClubeServiceProvider,
                public serviceConfronto: ConfrontoServiceProvider, 
                public serviceConvite: ConviteServiceProvider,
                public localNotifications: LocalNotifications,
                public platform: Platform,
                private screenshot: Screenshot) {

//  console.log('ENTROU1')
//               this.localNotification.requestPermission().then(
               
//                 (permission) => {
                  
//                     console.log('ENTROU')
//                     // Create the notification
//                     this.localNotification.create('My Title', {
//                       tag: 'message1',
//                       body: 'My body',
//                       icon: 'assets/icon/favicon.ico'
//                     });

                 
//                 }
//               );

      serviceSession.getDadosSessao(COLECAO_FIRESTORE.CLUBES).then((obj)=>{
        this.clube = JSON.parse( obj);

        this.carregarJogadores();
        this.carregarConvitesRecebidos(this.clube);
        this.carregarConfrontos(); 
      });

  }

screen: any;
  state: boolean = false;
  
 reset() {
    var self = this;
    setTimeout(function(){ 
      self.state = false;
    }, 1000);
  }
  public screenShot() {
    this.screenshot.save('jpg', 80, 'myscreenshot.jpg').then(res => {
      this.screen = res.filePath;
      this.state = true;
      this.reset();
    });
  }

  public screenShotURI() {
    this.screenshot.URI(80).then(res => {
      this.screen = res.URI;
      this.state = true;
      this.reset();
    });
  }

  public carregarJogadores() {
   //this.serviceLoading.startLoading();
    this.serviceClube.listJogadoresClube(this.clube).subscribe((jogadores )=> {
      this.listaJogadores =jogadores;
       //this.serviceLoading.stopLoading();
      console.log('[HomeClubePage] - lista de jogadores carregada' );
    }); 
  }; 

  public carregarConvitesRecebidos(clubeSessao: Clube) {
    this.serviceConvite.convitesRecebidosPorStatus(clubeSessao, StatusConvite.AGUARDANDO.toString()).subscribe(convitesRecebidos => {
      this.listaConvitesRecebidos = convitesRecebidos;

      console.log('[HomeClubePage] - lista de convites recebidos.', convitesRecebidos);
    }, erro => {
      console.log('[HomeClubePage] - ocorreu um erro ao listar os convites recebidos. ', erro);
      //this.serviceLoading.hide();
    }
    )
  }



  public carregarConfrontos(){
    this.serviceConfronto.listaConfrontos(this.clube, false).subscribe(lista => {
      this.listaConfrontos = lista;
      console.log('[HomeClubePage ]- lista de confrontos.', lista);
    }, erro => {
      console.log('[HomeClubePage ]- ocorreu um erro ao listar os confrontos.', erro);
    })
  }

  ionViewDidLoad() {
    console.log('[HomeClubePage] - ionViewDidLoad ');
  }


  acesseElenco(){
      this.navCtrl.setRoot(JogadorListaPage);
  }

  public acesseJogos(){
      this.navCtrl.setRoot(ConfrontoListaPage);
  }

  acesseConvitesRecebidos(){
       this.navCtrl.setRoot(ConviteRecebidoPage);
  }

  acesseConvitesEnviado(){
      this.navCtrl.setRoot(ConviteEnviadoPage);
  }

  acesseMarcarJogos(){
    // Schedule a single notification

      this.navCtrl.setRoot(ConviteFiltroPage);
  }

}
