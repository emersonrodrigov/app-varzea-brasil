import { Confronto } from './../../entity/confronto';
import { ConfrontoServiceProvider } from './../../providers/confronto-service/confronto-service';
import { ClubeJogoPage } from './../clube-jogo/clube-jogo';
import { COLECAO_FIRESTORE } from './../Util/constants';
import { SessionServiceProvider } from './../../providers/session-service/session-service';
import { ConviteResultadoPage } from './../convite-resultado/convite-resultado';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Clube } from './../../entity/clube';
import { Convite } from './../../entity/convite';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, ActionSheetController } from 'ionic-angular';
import { Utils } from './../Util/Utils';
import { LocalNotifications } from '@ionic-native/local-notifications';
@IonicPage()
@Component({
  selector: 'page-convite-filtro',
  templateUrl: 'convite-filtro.html',
})
export class ConviteFiltroPage {

  public formCadastro: FormGroup;
  public convite: Convite = new Convite();
  public listaTime: Clube[] = new Array();
  public dataAtual: Date = new Date()
  public anoMaximo: number;
  public anoMinimo: number;
  public dataPartida: string;
  public clube: Clube;
  public listaConfrontos: Confronto[] = new Array();

  public isFlagValidaDiaSemana: boolean;
  public isValidaData: boolean;
  public isJogoMarcado: boolean;

  date: any;
  daysInThisMonth: any;
  daysInLastMonth: any;
  daysInNextMonth: any;
  monthNames: string[];
  currentMonth: any;
  currentYear: any;
  currentDate: any;


  dateLessThan(from: string, to: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let f = group.controls[from];
      let t = group.controls[to];
      if (f.value > t.value) {
        return {
          dates: "Date from should be less than Date to"
        };
      }
      return {};
    }
  }

  constructor(public navCtrl: NavController,
    public platform: Platform,
    public actionsheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public fb: FormBuilder,
    public serviceSession: SessionServiceProvider,
    public serviceConfronto: ConfrontoServiceProvider,
    public localNotifications: LocalNotifications ) {

    this.anoMaximo = this.dataAtual.getFullYear() + 1;
    this.anoMinimo = this.dataAtual.getFullYear();

    serviceSession.getDadosSessao(COLECAO_FIRESTORE.CLUBES).then((obj) => {
      this.clube = JSON.parse(obj);
      console.log('dados do clube logado', this.clube)

      this.serviceConfronto.listaConfrontos(this.clube, false).subscribe(
        data => {
          this.listaConfrontos = data;
          console.log('[ConviteFiltroPage] - lista de confrontos do clube.', this.clube.nome, data);
        },
        erro => {
          console.log('[ConviteFiltroPage] - Ocorreu um erro ao carregar os confrontos.', erro);
        }
      )

      this.montaValidate();

    });

    this.formCadastro = fb.group({
      dataPartida: [{ value: '10/10/2018' }, Validators.required],
      horaInicio: ['00:00', Validators.required],
      isMandante: [{ value: 'number' }]
    });


    serviceSession.getDadosSessao(COLECAO_FIRESTORE.CLUBES).then((obj) => {
      this.clube = JSON.parse(obj);

      this.carregaCalendario();

    });



  }

  carregaCalendario() {
    this.date = new Date();
    this.monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    this.getDaysOfMonth();
    //this.loadEventThisMonth();
  }

  public montaValidate() {

    if (this.clube.flgMandante == 3) {
      this.formCadastro = this.fb.group({
        dataPartida: ['', Validators.required],
        horaInicio: ['', Validators.required],
        isMandante: [{ value: 'number' }]
      });

    } else {
      this.formCadastro = this.fb.group({
        dataPartida: ['', Validators.required],
        horaInicio: [''],
        isMandante: [{ value: 'number' }]
      });
    }
  }

  public alterarDadosClube() {

    this.navCtrl.push(ClubeJogoPage, { origemConfronto: true });

  }

  public pesquisar() {



    this.navCtrl.push(ConviteResultadoPage, { convite: this.convite });

  }


  public validarCriterio() {
    if (this.convite.dataPartida) {

      this.isFlagValidaDiaSemana = false;
      this.isValidaData = false;


      let diaSemana: number = Utils.getDiaSemana(this.convite.dataPartida);


      if (diaSemana == new Number(this.clube.diaJogo)) {
        this.isFlagValidaDiaSemana = true;
      }

      if (new Date(this.convite.dataPartida).getTime() > new Date().getTime()) {
        this.isValidaData = true;
      }
    }
  }



  public getDiaSemana() {

    this.validarCriterio();

    this.verificaConfronto();
  }


  private verificaConfronto() {
    this.isJogoMarcado = false;
    this.listaConfrontos.forEach(confronto => {
      if (confronto.data === this.convite.dataPartida) {
        this.isJogoMarcado = true;
      }
    })
  }





  selecioneData(day) {

    if(!this.checkDiaConfronto(day) && !this.checkDiaAnterior(day)  && this.checkDiasDisponiveis(day)){
    // this.convite.dataPartida = new Date(this.date.getFullYear(), this.date.getMonth() ,  day);
    this.formCadastro.get('dataPartida').setValue(new Date(this.date.getFullYear(), this.date.getMonth(), day).toISOString().slice(0, 10));
    this.getDiaSemana();
  }


  }


  checkDiasDisponiveis(day) { 

    let dataAtual: Date = new Date();
    dataAtual.setFullYear(this.date.getFullYear(), this.date.getMonth(), day);


    let diaSemanda: string = dataAtual.getDay().toString();


    if (this.clube.diaJogo) {
      if (diaSemanda === this.clube.diaJogo) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  checkDiaAnterior(day) {
    let dataCorrente: Date = new Date();
    dataCorrente.setFullYear(this.date.getFullYear(), this.date.getMonth(), day);
 
    let dataAtual:Date = new Date();
    let isExist :boolean = false;
 
      if (dataAtual.toISOString().slice(0, 10) >  dataCorrente.toISOString().slice(0, 10)) {
       isExist= true
      }
    return isExist;
  }


  checkDiaConfronto(day):boolean{

    let dataAtual: Date = new Date();
    dataAtual.setFullYear(this.date.getFullYear(), this.date.getMonth(), day);

    let isExist :boolean = false;

    this.listaConfrontos.forEach(confronto => {
      if (confronto.data.toString() === dataAtual.toISOString().slice(0, 10)) {
       isExist= true
      }
    })

    return isExist;

  }

  getDaysOfMonth() {
    this.daysInThisMonth = new Array();
    this.daysInLastMonth = new Array();
    this.daysInNextMonth = new Array();

    this.currentMonth = this.monthNames[this.date.getMonth()];

    this.currentYear = this.date.getFullYear();

    if (this.date.getMonth() === new Date().getMonth()) {
      this.currentDate = new Date().getDate();
    } else {
      this.currentDate = 999;
    }

    var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();

    var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
    for (var j = prevNumOfDays - (firstDayThisMonth - 1); j <= prevNumOfDays; j++) {
      this.daysInLastMonth.push(j);
    }

    var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
    for (var k = 0; k < thisNumOfDays; k++) {
      this.daysInThisMonth.push(k + 1);
    }

    var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDay();
    var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0).getDate();
    for (var n= 0;  n < (6 - lastDayThisMonth); n++) {
      this.daysInNextMonth.push(n + 1);
    }
    var totalDays = this.daysInLastMonth.length + this.daysInThisMonth.length + this.daysInNextMonth.length;
    if (totalDays < 36) {
      for (var i = (7 - lastDayThisMonth); i < ((7 - lastDayThisMonth) + 7); i++) {
        this.daysInNextMonth.push(i);
      }
    }
  }


  goToLastMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
    this.getDaysOfMonth();
  }

  goToNextMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
    this.getDaysOfMonth();
  }
}
