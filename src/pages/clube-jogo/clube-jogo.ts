import { Utils } from './../Util/Utils';
import { MinhaContaPage } from './../minha-conta/minha-conta';
import { Campo } from './../../entity/campo';

import { ConviteFiltroPage } from './../convite-filtro/convite-filtro';
import { COLECAO_FIRESTORE } from './../Util/constants';
import { SessionServiceProvider } from './../../providers/session-service/session-service';
import { MessageServiceProvider } from './../../providers/message-service/message-service';
import { ClubeServiceProvider } from './../../providers/clube-service/clube-service';
import { CampoModalPage } from './../campo-modal/campo-modal';
import { ClubeEscudoPage } from './../clube-escudo/clube-escudo';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Clube } from './../../entity/clube';
import { Component } from '@angular/core';
import { IonicPage, NavController, ActionSheetController, Platform, NavParams, ModalController, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-clube-jogo',
  templateUrl: 'clube-jogo.html',
})
export class ClubeJogoPage {


  public time: Clube = new Clube();
  public formCadastro: FormGroup;
  public nomeCampo: string = '';
  public isOrigemConfronto: boolean = false;
  public isMenu: boolean = false;
  public isMinhaConta: boolean = false;


  constructor(
    private navCtrl: NavController,
    public actionsheetCtrl: ActionSheetController,
    public platform: Platform,
    public fb: FormBuilder,
    public params: NavParams,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public serviceClube: ClubeServiceProvider,
    public serviceMessage: MessageServiceProvider,
    public serviceSession: SessionServiceProvider
  ) {

    this.formCadastro = fb.group({
      //horaJogo: ['', Validators.required],
      campo: ['', Validators.required],
      diaSemana: ['', Validators.required],
      flgMandante: ['', Validators.required],
      tipo: ['', Validators.required],
      horaInicioJogo: ['', Validators.required],
      horaFimJogo: ['', Validators.required],
      valorAmistoso: ['', Validators.required],
      valorFestival: ['', Validators.required],
      doisQuadro: ['']
    });


    //se for alteracao
    if (params.get('time') != null) {
      this.time = params.get('time');
    }



    if (this.time.campo) {
      this.nomeCampo = this.time.campo.nome;
    }
    this.isMinhaConta = params.get('isMinhaConta');
    this.isOrigemConfronto = params.get('origemConfronto');
    if (this.isOrigemConfronto || this.isMinhaConta) {

      serviceSession.getDadosSessao(COLECAO_FIRESTORE.CLUBES).then((obj) => {
        this.time = JSON.parse(obj);
        this.nomeCampo = this.time.campo.nome;

      });
    }




    this.montaRequired()

  }




  proximaEtapa() {

    this.navCtrl.push(ClubeEscudoPage, { time: this.time });
  }


  presentModal() {

    if (this.time.tipo == null) {
      this.alertCtrl.create({
        title: 'Aviso',
        subTitle: "Seleciona modalidade antes da escolher campo !",
        buttons: [
          {
            text: 'OK'
          }]
      }).present();

      return;

    }

    let modal = this.modalCtrl.create(CampoModalPage, { time: this.time });
    modal.dismiss();
    modal.present();



    modal.onDidDismiss(data => { //This is a listener which wil get the data passed from modal when the modal's view controller is dismissed
      console.log("Data =>", data) //This will log the form entered by user in add modal.
      if (data != null) {
        this.time.campo = data;
        this.nomeCampo = this.time.campo.nome;
      }
    })
  }


  public onChangeModalidade() {
    // this.time._campo = new Campo();
  }

  public onChangeCampoSelecionado() {

    this.nomeCampo = '';
    this.time.campo = Object.assign({}, new Campo());

    this.montaRequired();

  }

  public alterar() {
    console.log('Clube alterado', this.time)
    this.serviceClube.update(this.time.codigo, this.time);

    this.serviceMessage.showToastMessage('Salvo com sucesso', true);

    console.log('Dados do clube salvo na sessao', this.time);
    this.serviceSession.setDadosUsuarioLogado(this.time);

    console.log('Retorna para pagina anterior');
    this.navCtrl.pop();
    if (this.isOrigemConfronto) {
      this.navCtrl.setRoot(ConviteFiltroPage);
    }

    if (this.isMinhaConta) {
      this.navCtrl.setRoot(MinhaContaPage);
    }
  }


  public montaRequired() {
    if (this.time.flgMandante == 2) {
      this.formCadastro = this.fb.group({

        diaSemana: [this.time.diaJogo, Validators.required],
        flgMandante: [this.time.flgMandante, Validators.required],
        tipo: [this.time.tipo, Validators.required],
        campo: [''],
        horaInicioJogo: [''],
        horaFimJogo: [''],
        valorAmistoso: ['',],
        valorFestival: ['', ],
        doisQuadro: ['']
      });
    } else {
      this.formCadastro = this.fb.group({
        campo: [this.nomeCampo, Validators.required],
        diaSemana: [this.time.diaJogo, Validators.required],
        flgMandante: [this.time.flgMandante, Validators.required],
        tipo: [this.time.tipo, Validators.required],
        horaInicioJogo: [this.time.horaInicioJogo, Validators.required],
        horaFimJogo: [this.time.horaFimJogo, Validators.required],
        valorAmistoso: ['', Validators.required],
        valorFestival: ['', Validators.required],
        doisQuadro: ['']
      });
    }
  }


  onChangeValorAmistoso(){
    this.time.valorAmistoso = Utils.formataValor(this.time.valorAmistoso);
  }

  onChangeValorFestival(){
    this.time.valorFestival = Utils.formataValor(this.time.valorFestival);
  }

 
}
