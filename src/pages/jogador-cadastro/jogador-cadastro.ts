import { MessageServiceProvider } from './../../providers/message-service/message-service';
import { LoadingServiceProvider } from './../../providers/loading-service/loading-service';
import { JogadorServiceProvider } from './../../providers/jogador-service/jogador-service';
import { ClubeServiceProvider } from './../../providers/clube-service/clube-service';
import { SessionServiceProvider } from './../../providers/session-service/session-service';

import { Clube } from './../../entity/clube';
import { Storage } from '@ionic/storage';
import {  COLECAO_FIRESTORE, Guid } from './../Util/constants';
import { JogadorListaPage } from './../jogador-lista/jogador-lista'; 
import { StorageServiceProvider } from './../../providers/storage-service/storage-service';
import { Jogador } from './../../entity/jogador';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ActionSheetController, AlertController } from 'ionic-angular';


import { Camera } from '@ionic-native/camera';
/**
 * Generated class for the JogadorCadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-jogador-cadastro',
  templateUrl: 'jogador-cadastro.html',
})
export class JogadorCadastroPage {


  public formCadastro: FormGroup;
  public jogador = new Jogador();

  public tentativaSubmit: boolean = false;
  public clube: Clube;
  public tipoClube:string;
  public isFutsal: boolean;
  public isCampo: boolean;
  public isSociety: boolean;




  images: Array<{ src: String }>;


  constructor(public navCtrl: NavController,
    public platform: Platform,
    public actionsheetCtrl: ActionSheetController,
    fb: FormBuilder,
    public alertCtrl: AlertController,
    public storage: StorageServiceProvider,
    public params: NavParams,
   // public loadingCtrl: LoadingController,
    public storageIonic: Storage,
    //  public loginService : LoginService,
    private camera: Camera,
    public serviceSession: SessionServiceProvider,
    public serviceClube: ClubeServiceProvider,
    public serviceJogador: JogadorServiceProvider,
    public serviceLoading: LoadingServiceProvider,
    public serviceMessage : MessageServiceProvider
  ) {


    this.formCadastro = fb.group({
      nome: ['', Validators.required],
      posicao: ['', Validators.required],
      camisa: [{ value: 'number' }],

    });

    // reset form 
    this.formCadastro.reset();

    // imagem padrão
    this.jogador.imgFoto = 'assets/img/contato-padrao.jpg';

    //se for alteracao
    if (params.get('jogadoSelecionado') != null) {
      this.jogador = params.get('jogadoSelecionado');
    }

    if(params.get('clube') != null){
        this.clube = params.get('clube');

        this.validaTipoClube()
       
    }else{
      serviceSession.getDadosSessao(COLECAO_FIRESTORE.CLUBES).then((obj) => {
        this.clube = JSON.parse(obj);

this.validaTipoClube();

      });
    }



  } 


  private validaTipoClube(){
     this.isCampo = false;
        this.isSociety = false;
        this.isFutsal = false;
        
        if(this.clube.tipo == 1){
          this.isCampo = true;
        }
         if(this.clube.tipo == 2){
          this.isFutsal= true;
        }
         if(this.clube.tipo == 3){
          this.isSociety = true;
        }
  }

  public voltar() {
    this.navCtrl.push(JogadorListaPage);
  }

  public selecionarFoto(tipo: number) {
    // let carregando = this.loadingCtrl.create({
    //   content: Constast.STR_POPUP_CARREGANDANDO
    // });

    // carregando.present();

  

    this.camera.getPicture({
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: tipo,
      targetWidth: 150,
      targetHeight: 150,
      allowEdit: true,
      encodingType: this.camera.EncodingType.PNG

    }).then((imageData) => {
      this.serviceLoading.show();
      
      this.storage.uploadImagem(imageData, '/clube/', Guid.idFotoJogador(this.clube.pastaTime)).then((savedPicture) => {
        this.jogador.imgFoto = savedPicture.downloadURL;
        this.serviceLoading.hide();
      });
    }, (err) => {
      this.serviceLoading.hide();
      console.log(err);
    });
  }


  menuFoto() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Foto do Jogador',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Escolher Foto',
          icon: !this.platform.is('ios') ? '' : '',
          handler: () => {
            this.selecionarFoto(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Tirar Foto',
          icon: !this.platform.is('ios') ? '' : '',
          handler: () => {
            this.selecionarFoto(this.camera.PictureSourceType.CAMERA);

          }
        },
        {
          text: 'Cancelar',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  cadastrar() {


    if(!this.jogador.camisa){
      this.jogador.camisa = '';

    }

    if (this.jogador.codigo) {

    
      this.serviceClube.updateJogadorClube(this.clube, this.jogador);
      this.serviceMessage.showToastMessage('Alterado com sucesso.',false ,3000);
      this.navCtrl.pop();

    } else {
 

      this.tentativaSubmit = false;

      this.serviceClube.saveJogadorClube(this.clube,this.jogador)
      this.formCadastro.reset();
      this.jogador.codigo = '';
      this.jogador.imgFoto = 'assets/img/contato-padrao.jpg';
      this.serviceMessage.showToastMessage('Incluido com sucesso.',false ,3000)

    }


  }
} 