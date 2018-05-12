import { JogadorListaPage } from './../jogador-lista/jogador-lista';
import { JogadorEstatistica } from './../../entity/jogador-estatistica';
import { ConfrontoServiceProvider } from './../../providers/confronto-service/confronto-service';
import { Clube } from './../../entity/clube';
import { Jogador } from './../../entity/jogador';
import { LoadingServiceProvider } from './../../providers/loading-service/loading-service';
import { SessionServiceProvider } from './../../providers/session-service/session-service';
import { ClubeServiceProvider } from './../../providers/clube-service/clube-service';
import { JogadorServiceProvider } from './../../providers/jogador-service/jogador-service';
import { Component,Input } from '@angular/core';
import { IonicPage, NavController, ActionSheetController, AlertController, Platform, NavParams  } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-jogador-artilharia',
  templateUrl: 'jogador-artilharia.html',
})
export class JogadorArtilhariaPage {


  listaJogadores: Jogador[];
  jogador: Jogador = new Jogador();
  clube: Clube;
  listaArtilhariaTemp:JogadorEstatistica[] = new Array();
  isOrdenou:boolean = false;
  // listaArtilharia:JogadorEstatistica[] = new Array();
 

  observableConfronto;

  isCadastroJogadores: boolean = true;
  isCadastroJogadoresCompleto: boolean = true;
  

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public platform: Platform,
    public actionsheetCtrl: ActionSheetController,
    public serviceJogador: JogadorServiceProvider,
    public serviceClube : ClubeServiceProvider,
    public serviceSession : SessionServiceProvider, 
    public serviceLoading : LoadingServiceProvider,
    public serviceConfronto: ConfrontoServiceProvider,
    public navParams: NavParams,
   // private imageLoaderConfig: ImageLoaderConfig 
  ) {


        this.clube = navParams.get('clube');

        this.listar();
  
  }

  descending: boolean = false;
  order: number = 1;
  column: string = 'gols';

  @Input()
  set ready(isReady: boolean) {
    if (isReady)this.sort();
  }

sort(){
    this.descending = !this.descending;
    this.order = this.descending ? 1 : -1;
  }
callBackOrdenar(last:boolean) {
  if(last && !this.isOrdenou) {
    this.sort()
    this.isOrdenou = true;
    };
}

    public listar() {
      // this.serviceLoading.show();
      this.serviceClube.listJogadoresClube(this.clube).subscribe((jogadores )=> {
        this.listaJogadores =jogadores;
        // this.serviceLoading.hide();
        let qtdJogadores = this.listaJogadores.length;
        if(qtdJogadores <= 0){
          this.isCadastroJogadores = false;
        }else if(qtdJogadores < 11){
          this.isCadastroJogadoresCompleto=false;
        }

        this.contagemGols();

        this.sort()

        console.log('[JogadorArtilhariaPage] - lista de jogadores carregada' );
      });
    }; 


    public contagemGols(){
        this.serviceLoading.show();
    this.observableConfronto = this.serviceConfronto.listaConfrontos(this.clube,true).subscribe(listaConfrontos => {
      
      // lista os jogadores para pegar os gols de cada jogador
      this.listaJogadores.forEach((jogador:Jogador)=>{
           
            let dadosJogador: JogadorEstatistica = new JogadorEstatistica();
            dadosJogador.jogador=jogador;
            
            let gols:number = 0;
           // let data:string ='';
          
          listaConfrontos.forEach(confronto => {
              if(confronto.realizado){
                  confronto.clubeMandante.jogadores.forEach(jogadorConfronto => {
                      if(jogador.codigo == jogadorConfronto.codigo){
                        if(jogadorConfronto.dadosPartida.gol > 0){
                            gols = gols + parseInt(jogadorConfronto.dadosPartida.gol);
                            dadosJogador.confronto.push(confronto);
                            
                        }
                      }
                  });
                }
          });
          
          if(gols > 0){
              dadosJogador.gols = gols;
              this.listaArtilhariaTemp.push(dadosJogador);
          }

      })
      
      console.log('Listagem de Artilheiros' , this.listaArtilhariaTemp);
      this.serviceLoading.hide();
      
    }, erro => {
      this.serviceLoading.hide();
      console.log('[JogadorArtilhariaPage ]- ocorreu um erro ao listar os confrontos.', erro);
    });
    }
 

  ionViewDidLoad() {
    console.log('[JogadorArtilhariaPage] - ionViewDidLoad ');
  }

  ngOnDestroy() {
    if (this.observableConfronto) {
      this.observableConfronto.unsubscribe();
    }
  }


  acessarElenco(){
    this.navCtrl.setRoot(JogadorListaPage);
  }

}
