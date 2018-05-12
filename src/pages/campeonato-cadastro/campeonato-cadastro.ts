import { CampeonatoDetalhePage } from './../campeonato-detalhe/campeonato-detalhe';
import { StorageServiceProvider } from './../../providers/storage-service/storage-service';
import {StatusCampeonato } from './../Util/constants';
import { LoadingServiceProvider } from './../../providers/loading-service/loading-service';
import { Camera } from '@ionic-native/camera';
import { FormGroup } from '@angular/forms';
import { MessageServiceProvider } from './../../providers/message-service/message-service';
import { CampeonatoServiceProvider } from './../../providers/campeonato-service/campeonato-service';
import { Campeonato } from './../../entity/campeonato';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ActionSheetController } from 'ionic-angular';

/**
 * Generated class for the CampeonatoCadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-campeonato-cadastro',
  templateUrl: 'campeonato-cadastro.html',
})
export class CampeonatoCadastroPage {

  public form: FormGroup;
  campeonato:Campeonato = new Campeonato();
  public tentativaSubmit: boolean = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public platform: Platform,
              private camera: Camera,
              public storage: StorageServiceProvider,
              public actionsheetCtrl: ActionSheetController,
              public serviceCampeonato : CampeonatoServiceProvider,
              public serviceMessage : MessageServiceProvider,
              public serviceLoading: LoadingServiceProvider) {

    if (this.campeonato.codigo == '' ) {
      this.campeonato.idPastaStorage = serviceCampeonato.getGenerateID();
      this.campeonato.imgCampeonato = 'https://firebasestorage.googleapis.com/v0/b/teste-foot.appspot.com/o/app%2Fbanner_campeonato_01.jpg?alt=media&token=14c93a46-a067-4f2a-b64c-9eae34fdee43';
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CampeonatoCadastroPage');
  }
 

 cadastrar(){

// if (this.formCadastro.invalid) {
//       this.tentativaSubmit = true;
//       return;
//     }
 

    if (this.campeonato.codigo) {

      this.serviceCampeonato.update(this.campeonato.codigo,this.campeonato);
      this.serviceMessage.showToastSucessUpdate();
      this.navCtrl.pop();

    } else {

      this.tentativaSubmit = false;
      this.campeonato.status = StatusCampeonato.ABERTO;
      this.serviceCampeonato.save(this.campeonato); 
      this.campeonato.codigo = '';
      //this.jogador.imgFoto = 'assets/img/contato-padrao.jpg';
      this.serviceMessage.showToastSucessSave();
    }

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
      targetWidth: 300,
      targetHeight: 150,
      allowEdit: true,
      encodingType: this.camera.EncodingType.PNG

    }).then((imageData) => {
      this.serviceLoading.show();
      
      this.storage.uploadImagem(imageData, '/campeonatos/', this.campeonato.codigo+'.png').then((savedPicture) => {
        this.campeonato.imgCampeonato = savedPicture.downloadURL;
        this.serviceLoading.hide();
      });
    }, (err) => {
      this.serviceLoading.hide();
      console.log(err);
    });
  }

  visualizarAnuncio(){
    this.navCtrl.push(CampeonatoDetalhePage, {campeonato:this.campeonato});
  }
 
  menuFoto() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Banner Campeonato',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Escolher Banner',
          icon: !this.platform.is('ios') ? '' : '',
          handler: () => {
            this.selecionarFoto(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Tirar Foto (Banner)',
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



}
