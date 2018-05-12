import { LoadingServiceProvider } from './../../providers/loading-service/loading-service';
import { SessionServiceProvider } from './../../providers/session-service/session-service';
import { ClubeServiceProvider } from './../../providers/clube-service/clube-service';
import { JogadorServiceProvider } from './../../providers/jogador-service/jogador-service';
import { Clube } from './../../entity/clube';
import { COLECAO_FIRESTORE } from './../Util/constants';
import { JogadorCadastroPage } from './../jogador-cadastro/jogador-cadastro'; 
import { FormBuilder } from '@angular/forms';
import { Jogador } from './../../entity/jogador';
import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, Platform, ActionSheetController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

//import { ImageLoaderConfig } from 'ionic-image-loader';

/**
 * Generated class for the JogadorListaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-jogador-lista',
  templateUrl: 'jogador-lista.html',
})
export class JogadorListaPage {


  listaJogadores: Jogador[];
  jogador: Jogador = new Jogador();
  clube: Clube;


  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public platform: Platform,
    public actionsheetCtrl: ActionSheetController,
    fb: FormBuilder,
    public serviceJogador: JogadorServiceProvider,
    public serviceClube : ClubeServiceProvider,
    public serviceSession : SessionServiceProvider, 
    public storageIonic: Storage,
    public serviceLoading : LoadingServiceProvider,
   // private imageLoaderConfig: ImageLoaderConfig 
  ) {

   // this.jogador.dadosPartida = new JogadorPartidaImp();
// disable spinners by default, you can add [spinner]="true" to a specific component instance later on to override this
    //imageLoaderConfig.enableSpinner(true);

      serviceSession.getDadosSessao(COLECAO_FIRESTORE.CLUBES).then((obj)=>{
        this.clube = JSON.parse( obj);

        this.listar();
      });


  
  }



  public remover(jogador: Jogador, index: number) {
    let alert = this.alertCtrl.create({
      title: 'Deseja remover o jogador ?',

      buttons: [
        {
          text: 'Sim',
          handler: data => {
            
            //this.serviceJogador.delete(codigoJogador);

            //this.serviceClube.deleteDocSubCollection(this.clube.codigo, 'jogadores',codigoJogador)

            this.listaJogadores.splice(index, 1); 

            this.serviceClube.deleteJogadorClube(this.clube, jogador);

          }
        },
        {
          text: 'Não',
          handler: data => {
            console.log('Jogador não será removido');
          }
        }
      ]
    });
    alert.present(); 

  }

    public listar() {
    //this.serviceLoading.startLoading();
      this.serviceClube.listJogadoresClube(this.clube).subscribe((jogadores )=> {
        this.listaJogadores =jogadores;
        //this.serviceLoading.stopLoading();
        console.log('[Jogador] - lista de jogadores carregada' );
      });
    }; 

  public cadatrar(jogador: Jogador) {
    this.navCtrl.push(JogadorCadastroPage,  {clube: this.clube});
  }

  public abrirAlteracao(jogador: Jogador) {
    this.navCtrl.push(JogadorCadastroPage, { jogadoSelecionado: jogador , clube: this.clube});
  }

  // ionViewWillEnter() {
  //   this.listar();
  // }
 

  ionViewWillEnter(){
      //this.serviceLoading.startLoading();
  }

}
