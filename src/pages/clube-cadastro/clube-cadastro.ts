import { MinhaContaPage } from './../minha-conta/minha-conta';
import { MessageServiceProvider } from './../../providers/message-service/message-service';
import { ClubeServiceProvider } from './../../providers/clube-service/clube-service';
import { SessionServiceProvider } from './../../providers/session-service/session-service';
import { COLECAO_FIRESTORE } from './../Util/constants';

import { ClubeJogoPage } from './../clube-jogo/clube-jogo';
import { FirestoreServiceProvider } from './../../providers/firestore-service/firestore-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Clube } from './../../entity/clube';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform, AlertController, LoadingController } from 'ionic-angular';
import cep from 'cep-promise';

/**
 * Generated class for the ClubeCadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-clube-cadastro',
  templateUrl: 'clube-cadastro.html',
})
export class ClubeCadastroPage {


  public time: Clube = new Clube();
  public formCadastro: FormGroup;
  public isEncontrouCep: boolean;
  public isMenu: boolean = false;
  public isLogin: boolean = false;
  public isMinhaConta: boolean = false;

  public mask:any = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]



  constructor(
    private navCtrl: NavController,
    public actionsheetCtrl: ActionSheetController,
    public platform: Platform,
    public fb: FormBuilder,
    public alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    public params: NavParams,
    public fss: FirestoreServiceProvider<Clube>,
      public serviceClube: ClubeServiceProvider,
    public serviceMessage: MessageServiceProvider,
    public serviceSession: SessionServiceProvider) {

    this.formCadastro = fb.group({
      nome: ['', Validators.required],
      dataFundacao: ['', Validators.required],
      categoria: ['', Validators.required],
      telefone1: [''],
      telefone2: [''],

      cep: [{ value: 'text' }, Validators.required],
      bairro: [{ value: 'text', disabled: true }, Validators.required],
      cidade: [{ value: 'text', disabled: true }, Validators.required],
      estado: [{ value: 'text', disabled: true }, Validators.required],
      regiao: ['', Validators.required]
    });

    this.isEncontrouCep = false;

    //se for alteracao
    if (params.get('clube') != null) {
      this.time = params.get('clube');

    }

     if (params.get('isMenu') != null) {
      this.isMenu = params.get('isMenu');
    }

    if(params.get('isLogin')){
      this.isLogin = params.get('isLogin');
    }

    if(params.get('isMinhaConta')){
      this.isMinhaConta = params.get('isMinhaConta');
    }

    if(this.isMenu || this.isMinhaConta){
      this.serviceSession.getDadosSessao(COLECAO_FIRESTORE.CLUBES).then((obj)=>{
          this.time = JSON.parse( obj);
         this.isEncontrouCep = true;
		  });
    }

  }


  proximaEtapa() {
    if (this.formCadastro.invalid) {
      this.alertCtrl.create({
        title: 'Aviso',
        subTitle: "Campos obrigatórios não informados",
        buttons: [
          {
            text: 'OK',

          }]
      }).present();

    } else {
      this.navCtrl.push(ClubeJogoPage, { time: this.time });


    }

  }

  public alterar() {
    console.log('Clube alterado', this.time)
    this.serviceClube.update(this.time.codigo, this.time);

    this.serviceMessage.showToastMessage('Salvo com sucesso',true);

    console.log('Dados do clube salvo na sessao', this.time);
    this.serviceSession.setDadosUsuarioLogado(this.time);

    console.log('Retorna para pagina anterior');
    this.navCtrl.pop();
    this.navCtrl.setRoot(MinhaContaPage);
  }


  buscarEndereco() {
    this.time.bairro = "";
    this.time.estado = "";
    this.time.cidade = "";
    this.isEncontrouCep = false;

    let loading = this.loadingCtrl.create({
      content: 'Buscando cep...'
    });



    if (this.time.cep != null && this.time.cep.length == 8) {
      loading.present();
      cep(this.time.cep)
        .then((cepRetorno) => {

          this.time.bairro = cepRetorno.neighborhood;
          this.time.estado = cepRetorno.state;
          this.time.cidade = cepRetorno.city;
          this.isEncontrouCep = true;
          loading.dismiss();

        }).catch((erro) => {
          loading.dismiss();
          this.alertCtrl.create({
            title: 'Aviso',
            subTitle: "Cep não encontrado.",
            buttons: [
              {
                text: 'OK'
              }]
          }).present();

        });
    }
  }

}