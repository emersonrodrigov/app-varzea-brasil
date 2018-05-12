import { Utils } from './../Util/Utils';
import { Clube } from './../../entity/clube';
import { SessionServiceProvider } from './../../providers/session-service/session-service';

import { ConfrontoServiceProvider } from './../../providers/confronto-service/confronto-service';
import { ClubeServiceProvider } from './../../providers/clube-service/clube-service';
import { MessageServiceProvider } from './../../providers/message-service/message-service';
import { LoadingServiceProvider } from './../../providers/loading-service/loading-service';
import { Confronto } from './../../entity/confronto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform } from 'ionic-angular';

/**
 * Generated class for the ConfrontoDetalhePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confronto-detalhe',
  templateUrl: 'confronto-detalhe.html',
})
export class ConfrontoDetalhePage {



  public confrontoSelecionado: Confronto;
  public clube: Clube;
  observableClube;
  public dataExpiraConfronto:Date;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public serviceLoading: LoadingServiceProvider,
    public serviceMessage: MessageServiceProvider,
    public serviceClube: ClubeServiceProvider,
    public serviceSession: SessionServiceProvider,
    public serviceConfronto: ConfrontoServiceProvider,
    public actionsheetCtrl: ActionSheetController,
    public platform: Platform) {

    this.confrontoSelecionado = navParams.get("confronto");

    this.clube = navParams.get('clube');


    //se o jogo ja realizado , selecionar jogador para informar gols / cartoes / melhor na partida
    if (this.confrontoSelecionado.realizado) {
      this.carregarDadosConfronto();
    }


   this.dataExpiraConfronto =  Utils.getDateFirestore(this.confrontoSelecionado.data);
   this.dataExpiraConfronto.setDate(this.dataExpiraConfronto.getDate()+5);

  console.log(this.dataExpiraConfronto);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfrontoDetalhePage');
  }


  reverPlacar() {
    this.confrontoSelecionado.confirmaResultMandante = false;
    this.confrontoSelecionado.confirmaResultVisitante = false;



    if (this.clube.codigo == this.confrontoSelecionado.clubeMandante.codigo) {

      this.confrontoSelecionado.clubeMandante.jogadores.forEach((element, index) => {
        this.limparDadosJogador(true, index)
      });

    } else if (this.clube.codigo == this.confrontoSelecionado.clubeVisitante.codigo) {
      this.confrontoSelecionado.clubeVisitante.jogadores.forEach((element, index) => {
        this.limparDadosJogador(false, index)
      });
    }

    this.updateConfronto(this.confrontoSelecionado);


  }

  carregarDadosConfronto() {
    // if (!this.confrontoSelecionado.realizado) {
    if (this.confrontoSelecionado.clubeMandante.jogadores.length <= 0) {
      this.observableClube = this.serviceClube.listJogadoresClube(this.confrontoSelecionado.clubeMandante).subscribe(jogadores => {


        // atualiza lista de jogadores do clube mandante
        this.confrontoSelecionado.clubeMandante.jogadores = jogadores;
        console.log("[ControleDetalhePage] - carrega lista elenco.", jogadores);

        this.updateConfronto(this.confrontoSelecionado)
        console.log("[ControleDetalhePage] - atualiza lista de jogadores(mandante).", jogadores);
        //  this.serviceLoading.hide();
      }, erro => {
        //this.serviceLoading.hide();
        console.log("[ControleDetalhePage] - ocorreu um erro ao listar os jogadores.", erro)

      })
    }
    if (this.confrontoSelecionado.clubeVisitante.jogadores.length <= 0) {
      this.observableClube = this.serviceClube.listJogadoresClube(this.confrontoSelecionado.clubeVisitante).subscribe(jogadores => {


        this.confrontoSelecionado.clubeVisitante.jogadores = jogadores;
        console.log("[ControleDetalhePage] - lista elenco.", jogadores);

        this.updateConfronto(this.confrontoSelecionado)
        console.log("[ControleDetalhePage] - atualiza lista de jogadores(visitante).", jogadores);

        //  this.serviceLoading.hide();
      }, erro => {
        //this.serviceLoading.hide();
        console.log("[ControleDetalhePage] - ocorreu um erro ao listar os jogadores.", erro)

      })

    }


  }



  public verificaExpirouDateLimite(): Boolean {
   

        if(new Date().getTime() > this.dataExpiraConfronto.getTime()  ){
          return true;
        }

        return false;

       
  }


  public verificaPlacarIConfirmado(): Boolean {
    // mandante
    if (this.clube.codigo == this.confrontoSelecionado.clubeMandante.codigo) {
      if (this.confrontoSelecionado.confirmaResultMandante) {

         
        return true;

      }
    }
    //visitante
    if (this.clube.codigo == this.confrontoSelecionado.clubeVisitante.codigo) {
      if (this.confrontoSelecionado.confirmaResultVisitante) {
         
        return true;
      }
    }
    return false;
  }


  public openMenu(isMandante: boolean, index: number, clubeSelecionado: Clube) {

    // so consegue informar dados do jogador de seu time
    if (clubeSelecionado.codigo == this.clube.codigo) {

      // caso nao confirme o placar,  exibe mensagem para confirmar o placar.. 
      if (!this.verificaPlacarIConfirmado()) {
        this.serviceMessage.showToastMessage('Confirme o Resultado da Partida, antes de informar gols / cartões / melhor jogador.', true)
        console.log('[ControleDetalhePage] - Placar não informado, não é possivel informadas dados do jogador');
        return;
      }




      let actionSheet = this.actionsheetCtrl.create({
        title: 'INFORMAR',
        cssClass: 'action-sheets-basic-page',
        buttons: [

          {
            text: 'Gols',
            icon: 'football',
            handler: () => {




              if (isMandante) {

                if (this.verificaQuantidadeGols(isMandante) < this.confrontoSelecionado.resultadoMandante) {
                  let gol: number;

                  console.log(this.confrontoSelecionado.clubeMandante.jogadores[index].dadosPartida.gol);
                  if (this.confrontoSelecionado.clubeMandante.jogadores[index].dadosPartida.gol > "0") {
                    gol = Number(this.confrontoSelecionado.clubeMandante.jogadores[index].dadosPartida.gol) + 1
                  } else {
                    gol = 1
                  }

                  this.confrontoSelecionado.clubeMandante.jogadores[index].dadosPartida.gol = gol + "";
                  this.updateConfronto(this.confrontoSelecionado)
                } else {

                  this.serviceMessage.showToastMessage('Todos os gols da partida já foram informados!', true);
                }
              } else {
                if (this.verificaQuantidadeGols(isMandante) < this.confrontoSelecionado.resultadoVisitante) {
                  let gol: number;

                  console.log(this.confrontoSelecionado.clubeVisitante.jogadores[index].dadosPartida.gol);
                  if (this.confrontoSelecionado.clubeVisitante.jogadores[index].dadosPartida.gol > "0") {
                    gol = Number(this.confrontoSelecionado.clubeVisitante.jogadores[index].dadosPartida.gol) + 1
                  } else {
                    gol = 1
                  }

                  this.confrontoSelecionado.clubeVisitante.jogadores[index].dadosPartida.gol = gol + "";
                  this.updateConfronto(this.confrontoSelecionado)
                } else {
                  this.serviceMessage.showToastMessage('Todos os gols da partida já foram informados!', true);
                }
              }


            }
          },
          {
            text: 'Cartão Amarelo',
            icon: 'document',
            handler: () => {
              if (isMandante) {
                this.confrontoSelecionado.clubeMandante.jogadores[index].dadosPartida.cartaoAmarelo = "1";
                this.updateConfronto(this.confrontoSelecionado)
              } else {
                this.confrontoSelecionado.clubeVisitante.jogadores[index].dadosPartida.cartaoAmarelo = "1";
                this.updateConfronto(this.confrontoSelecionado)
              }
            }

          },
          {
            text: 'Cartão Vermelho',
            icon: 'document',
            handler: () => {
              if (isMandante) {
                this.confrontoSelecionado.clubeMandante.jogadores[index].dadosPartida.cartaoVermelho = "1";
                this.updateConfronto(this.confrontoSelecionado)
              } else {
                this.confrontoSelecionado.clubeVisitante.jogadores[index].dadosPartida.cartaoVermelho = "1";
                this.updateConfronto(this.confrontoSelecionado)
              }
            }
          },
          {
            text: 'Destaque da Partida',
            icon: 'medal',
            handler: () => {



              if (isMandante) {

                this.confrontoSelecionado.clubeMandante.jogadores.forEach((element, indexLst) => {
                  this.confrontoSelecionado.clubeMandante.jogadores[indexLst].dadosPartida.isMelhorJogador = "";
                });

                this.confrontoSelecionado.clubeMandante.jogadores[index].dadosPartida.isMelhorJogador = "true";
                this.updateConfronto(this.confrontoSelecionado)
              } else {
                this.confrontoSelecionado.clubeVisitante.jogadores.forEach((element, indexLst) => {
                  this.confrontoSelecionado.clubeVisitante.jogadores[indexLst].dadosPartida.isMelhorJogador = "";
                });

                this.confrontoSelecionado.clubeVisitante.jogadores[index].dadosPartida.isMelhorJogador = "true";
                this.updateConfronto(this.confrontoSelecionado)
              }



            }
          },
          {
            text: 'Limpar',


            handler: () => {
              this.limparDadosJogador(isMandante, index);
              // if (isMandante) {

              //   // this.confrontoSelecionado.clubeMandante.jogadores.forEach((dadosPartida, index) => {
              //     this.confrontoSelecionado.clubeMandante.jogadores[index].dadosPartida.isMelhorJogador = "";
              //     this.confrontoSelecionado.clubeMandante.jogadores[index].dadosPartida.cartaoAmarelo = "0";
              //     this.confrontoSelecionado.clubeMandante.jogadores[index].dadosPartida.cartaoVermelho = "0";
              //     this.confrontoSelecionado.clubeMandante.jogadores[index].dadosPartida.gol = "0";
              //   // });

              // } else {

              //   this.confrontoSelecionado.clubeVisitante.jogadores[index].dadosPartida.isMelhorJogador = "";
              //   this.confrontoSelecionado.clubeVisitante.jogadores[index].dadosPartida.cartaoAmarelo = "0";
              //   this.confrontoSelecionado.clubeVisitante.jogadores[index].dadosPartida.cartaoVermelho = "0";
              //   this.confrontoSelecionado.clubeVisitante.jogadores[index].dadosPartida.gol = "0";

              // }
              this.updateConfronto(this.confrontoSelecionado)

            }
          },
          {
            text: 'Cancelar',
            role: 'cancel', // will always sort to be on the bottom
            icon: !this.platform.is('ios') ? 'close' : null,
            handler: () => {

            }
          }
        ]
      });
      actionSheet.present();
    }
  }


  limparDadosJogador(isMandante: boolean, index: number) {
    if (isMandante) {

      // this.confrontoSelecionado.clubeMandante.jogadores.forEach((dadosPartida, index) => {
      this.confrontoSelecionado.clubeMandante.jogadores[index].dadosPartida.isMelhorJogador = "";
      this.confrontoSelecionado.clubeMandante.jogadores[index].dadosPartida.cartaoAmarelo = "0";
      this.confrontoSelecionado.clubeMandante.jogadores[index].dadosPartida.cartaoVermelho = "0";
      this.confrontoSelecionado.clubeMandante.jogadores[index].dadosPartida.gol = "0";
      // });

    } else {

      this.confrontoSelecionado.clubeVisitante.jogadores[index].dadosPartida.isMelhorJogador = "";
      this.confrontoSelecionado.clubeVisitante.jogadores[index].dadosPartida.cartaoAmarelo = "0";
      this.confrontoSelecionado.clubeVisitante.jogadores[index].dadosPartida.cartaoVermelho = "0";
      this.confrontoSelecionado.clubeVisitante.jogadores[index].dadosPartida.gol = "0";

    }
  }

  public confirmarPlacar() {

    if (this.confrontoSelecionado.clubeMandante.codigo == this.clube.codigo) {
      this.confrontoSelecionado.confirmaResultMandante = true;
    } else if (this.confrontoSelecionado.clubeVisitante.codigo == this.clube.codigo) {
      this.confrontoSelecionado.confirmaResultVisitante = true;
    }

    this.updateConfronto(this.confrontoSelecionado);

    this.serviceMessage.showToastMessage('Placar confirmado com sucesso.', true);

    console.log("[ControleDetalhePage] - Grava placar informado.", this.confrontoSelecionado.resultadoMandante, "X", this.confrontoSelecionado.resultadoVisitante)
  }

  private updateConfronto(confronto: Confronto) {

    // atualiza lista de confronto do time mandante
    this.serviceConfronto.updateConfrontoClube(confronto.clubeMandante, this.confrontoSelecionado);
    console.log("[ControleDetalhePage] - Atualiza dados clube mandante.")

    // atualiza lista de confornto do time visitante
    this.serviceConfronto.updateConfrontoClube(confronto.clubeVisitante, this.confrontoSelecionado);
    console.log("[ControleDetalhePage] - Atualiza dados clube visitante.")
  }

  ngOnDestroy() {
    if (this.observableClube) {
      this.observableClube.unsubscribe();
    }
  }

  verificaQuantidadeGols(isMandante: boolean): number {
    let quantidadeGols: number = 0;
    if (isMandante) {
      // verifica quantidade de gols time mandante

      this.confrontoSelecionado.clubeMandante.jogadores.forEach(jogador => {
        if (jogador.dadosPartida.gol) {
          quantidadeGols = quantidadeGols + parseInt(jogador.dadosPartida.gol);
        }
      });

    } else {
      // verifica quantidade de gols time visitante
      this.confrontoSelecionado.clubeVisitante.jogadores.forEach(jogador => {

        if (jogador.dadosPartida.gol) {
          quantidadeGols = quantidadeGols + parseInt(jogador.dadosPartida.gol);
        }
      });
    }

    return quantidadeGols;


  }
}
