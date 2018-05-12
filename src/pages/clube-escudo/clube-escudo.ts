import { MessageServiceProvider } from './../../providers/message-service/message-service';
import { HomeClubePage } from './../home-clube/home-clube';
import { StorageServiceProvider } from './../../providers/storage-service/storage-service';
import { User } from './../../providers/auth-service/user';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { ToastController } from 'ionic-angular';
import { ClubeServiceProvider } from './../../providers/clube-service/clube-service';
import { SessionServiceProvider } from './../../providers/session-service/session-service';
import { Guid, TipoAcesso, Constast, COLECAO_FIRESTORE } from './../Util/constants';

//import { ClubeAcessoPage } from './../clube-acesso/clube-acesso';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Clube } from './../../entity/clube';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform, ModalController, LoadingController, AlertController } from 'ionic-angular';

import { Camera } from '@ionic-native/camera';
import firebase from 'firebase';
/**
 * Generated class for the ClubeEscudoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-clube-escudo',
  templateUrl: 'clube-escudo.html',
})
export class ClubeEscudoPage {

  public time: Clube = new Clube();
  public formCadastro: FormGroup;

  public storageRef = firebase.storage().ref();

  public confirmaSenha: string;
  user: User = new User();
  isMinhaConta: boolean = false;




  constructor(
    private navCtrl: NavController,
    public actionsheetCtrl: ActionSheetController,
    public platform: Platform,
    public fb: FormBuilder,
    public params: NavParams,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private camera: Camera,
    public serviceSessao: SessionServiceProvider,
    public serviceClube: ClubeServiceProvider,
    public serviceMessage: MessageServiceProvider,
    public toastCtrl: ToastController,
    public storage: StorageServiceProvider,
    public authService: AuthServiceProvider,


  ) {


    //se for alteracao
    if (params.get('time') != null) {
      this.time = params.get('time');


      if (this.time.imgEscudo != '' && this.time.imgEscudo != null) {
        this.time.imgEscudo = 'assets/img/Logo-App-2.png';
      }

    }
    this.time.imgEscudo = 'assets/img/Logo-App-2.png';
    this.time.imgMascote = 'assets/img/mascote-varzea-brasil.png';


    if (this.time.pastaTime == '' || this.time.pastaTime == null) {
      this.time.pastaTime = Guid.idPastaTime(this.time.nome);
    }



    this.isMinhaConta = params.get('isMinhaConta');

    if (this.isMinhaConta) {

      serviceSessao.getDadosSessao(COLECAO_FIRESTORE.CLUBES).then((obj) => {
        this.time = JSON.parse(obj);
      });
    }



  }





  proximaEtapa() {

    //POPUP CARREGANDO
    // let carregando = this.loadingCtrl.create({
    //   content: 'Constast.STR_POPUP_CARREGANDANDO'
    // });

    // carregando.present();


    if (this.time.codigo) {


      this.user.email = this.time.usuario;
      this.user.password = this.time.password;


      this.time.isCadastroFinalizado = true;

      this.serviceClube.update(this.time.codigo, this.time);

      this.serviceSessao.setDadosUsuarioLogado(this.time);

      this.serviceMessage.showToastMessage('Salvo com sucesso.', true)

      if(this.isMinhaConta){
          this.navCtrl.pop();
      }else{
        this.navCtrl.setRoot(HomeClubePage);
      }
      


    } else {
 
      this.user.email = this.time.usuario;
      this.user.password = this.time.password;

      this.time.isCadastroFinalizado = true;
      this.serviceClube.save(this.time);

      this.user.perfil = TipoAcesso.CLUBE;
      this.user.clube.push(Object.assign({}, this.time))
      // this.serviceUsuario.save(this.user)

      this.serviceSessao.setDadosUsuarioLogado(this.time);

       this.serviceMessage.showToastMessage('Clube cadastrado com sucesso.', true)
       
      this.navCtrl.setRoot(HomeClubePage);

    }




  }




  menuFoto(isFoto: boolean) {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Escudo Do Time',
      buttons: [
        {
          text: 'Escolher Escudo',
          icon: !this.platform.is('ios') ? '' : '',
          handler: () => {
            this.selecionarFoto(this.camera.PictureSourceType.PHOTOLIBRARY, isFoto);
          }
        },
        {
          text: 'Tirar Foto Escudo',
          icon: !this.platform.is('ios') ? '' : '',
          handler: () => {
            this.selecionarFoto(this.camera.PictureSourceType.CAMERA, isFoto);

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


  public selecionarFoto(tipo: number, isFoto: boolean) {
    //POPUP CARREGANDO
    let carregando = this.loadingCtrl.create({
      content: Constast.STR_POPUP_CARREGANDANDO
    });


    this.camera.getPicture({
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: tipo,
      targetWidth: 150,
      targetHeight: 150,
      allowEdit: true,
      encodingType: this.camera.EncodingType.PNG

    }).then((imageData) => {
      carregando.present();
      if (isFoto) {
        this.storage.uploadImagem(imageData, '/times/' + this.time.pastaTime + '/', 'escudo.png').then((savedPicture) => {
          this.time.imgEscudo = savedPicture.downloadURL;
          carregando.dismiss();
        });
      } else {
        this.storage.uploadImagem(imageData, '/times/' + this.time.pastaTime + '/', 'mascote.png').then((savedPicture) => {
          this.time.imgMascote = savedPicture.downloadURL;
          carregando.dismiss();
        });
      }
    }, (err) => {
      let alert = this.alertCtrl.create({
        title: Constast.STR_ERRO_COMUNICACAO,
        buttons: ['OK']
      });
      alert.present();
      carregando.dismiss();
    });
  }

}
