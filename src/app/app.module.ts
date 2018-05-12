import { SearchPipe } from './../pipes/search/search';
import { TermSearchPipe } from './../pipes/term-search';
import { SortPipe } from './../pipes/sort/sort';
import { FormataMoedaDirective } from './../directives/formata-moeda/formata-moeda';
import { ConfrontoAvaliacaoPage } from './../pages/confronto-avaliacao/confronto-avaliacao';
import { JogadorArtilhariaPage } from './../pages/jogador-artilharia/jogador-artilharia';
import { MinhaContaPage } from './../pages/minha-conta/minha-conta';
import { Calendar } from '@ionic-native/calendar';
import { HomeTorcedorPage } from './../pages/home-torcedor/home-torcedor';
import { HomeJogadorPage } from './../pages/home-jogador/home-jogador';
import { HomeClubePage } from './../pages/home-clube/home-clube';
import { LojaCadastroPage } from './../pages/loja-cadastro/loja-cadastro';
import { LojaDetalhePage } from './../pages/loja-detalhe/loja-detalhe';
import { LojaListaPage } from './../pages/loja-lista/loja-lista';
import { TorcedomentroPage } from './../pages/torcedomentro/torcedomentro';
import { ConfrontoDetalhePage } from './../pages/confronto-detalhe/confronto-detalhe';
import { ConfrontoListaPage } from './../pages/confronto-lista/confronto-lista';
import { ConviteEnviadoPage } from './../pages/convite-enviado/convite-enviado';
import { ClubeListaPage } from './../pages/clube-lista/clube-lista';
import { CampeonatoListaPage } from './../pages/campeonato-lista/campeonato-lista';
import { CampeonatoDetalhePage } from './../pages/campeonato-detalhe/campeonato-detalhe';
import { CampeonatoCadastroPage } from './../pages/campeonato-cadastro/campeonato-cadastro';
import { ConviteRecebidoPage } from './../pages/convite-recebido/convite-recebido';
import { ConviteResultadoPage } from './../pages/convite-resultado/convite-resultado';
import { ConviteFiltroPage } from './../pages/convite-filtro/convite-filtro';
import { JogadorListaPage } from './../pages/jogador-lista/jogador-lista';
import { JogadorCadastroPage } from './../pages/jogador-cadastro/jogador-cadastro';
import { CampoModalPage } from './../pages/campo-modal/campo-modal';
import { ClubeJogoPage } from './../pages/clube-jogo/clube-jogo';
import { ClubeEscudoPage } from './../pages/clube-escudo/clube-escudo';
import { ClubeCadastroPage } from './../pages/clube-cadastro/clube-cadastro';
import { MessageServiceProvider } from './../providers/message-service/message-service';
import { CampeonatoServiceProvider } from './../providers/campeonato-service/campeonato-service'; 
import { SessionServiceProvider } from './../providers/session-service/session-service';
import { UsuarioServiceProvider } from './../providers/usuario-service/usuario-service';
import { JogadorServiceProvider } from './../providers/jogador-service/jogador-service';
import { ClubeServiceProvider } from './../providers/clube-service/clube-service';
import { DatabaseServiceProvider } from './../providers/database-service/database-service';
import { StorageServiceProvider } from './../providers/storage-service/storage-service';
import { FirestoreServiceProvider } from './../providers/firestore-service/firestore-service';
import { AuthServiceProvider } from './../providers/auth-service/auth-service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { AuthPage } from '../pages/auth/auth';
import { InitialPage } from '../pages/initial/initial';
import { HomePage } from '../pages/home/home';
import { MyAccountPage } from '../pages/my-account/my-account';
import { SettingsPage } from '../pages/settings/settings';
import { PropertyListPage } from '../pages/property-list/property-list';
import { PropertyFilterPage } from '../pages/property-filter/property-filter';
import { PropertyDetailPage } from '../pages/property-detail/property-detail';
import { BrokerListPage } from '../pages/broker-list/broker-list';
import { BrokerDetailPage } from '../pages/broker-detail/broker-detail';
import { PreApprovedPage } from '../pages/pre-approved/pre-approved';
import { FavoriteListPage } from '../pages/favorite-list/favorite-list';
import { AboutPage } from '../pages/about/about';
import { SupportPage } from '../pages/support/support';
import { NotificationsPage } from '../pages/notifications/notifications';
import { MessageListPage } from '../pages/message-list/message-list';
import { MessageDetailPage } from '../pages/message-detail/message-detail';
import { YourPropertyPage } from '../pages/your-property/your-property';
import { ChatDetailPage } from '../pages/chat-detail/chat-detail';
import { InvoicesPage } from '../pages/invoices/invoices';
import { CheckoutPage } from '../pages/checkout/checkout';

// import { PipesModule } from '../pipes/pipes.module';
 
import { MessageService } from "../providers/message-service-mock";
import { PropertyService } from "../providers/property-service-mock";
import { BrokerService } from "../providers/broker-service-mock";
import { InvoiceService } from "../providers/invoice-service-mock";
import { ChatService } from "../providers/chat-service-mock";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule,AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore'; 

import { Camera } from '@ionic-native/camera';
import { ConviteServiceProvider } from '../providers/convite-service/convite-service';
import { TorcedometroServiceProvider } from '../providers/torcedometro-service/torcedometro-service';
import { ProdutoServiceProvider } from '../providers/produto-service/produto-service';
import { EscalacaoServiceProvider } from '../providers/escalacao-service/escalacao-service';
import { ConfrontoServiceProvider } from '../providers/confronto-service/confronto-service';
import { LoadingServiceProvider } from '../providers/loading-service/loading-service';
import {LocalNotifications} from "@ionic-native/local-notifications";
import {Ionic2MaskDirective} from "ionic2-mask-directive";

import { Screenshot } from '@ionic-native/screenshot';
import { FCM } from '@ionic-native/fcm'; 
import { TextMaskModule } from 'angular2-text-mask';
// import { Pro } from '@ionic/pro';
// import {  Injector } from '@angular/core'; 
import { BrMaskerModule } from 'brmasker-ionic-3';
import { CalendarModule } from 'ionic2-calendar2';

const firebaseConfig = {
  apiKey: "AIzaSyAr5HqoQ-zNjfLKFyMc9yh9nTx6CCUFtLg",
  authDomain: "teste-foot.firebaseapp.com",
  databaseURL: "https://teste-foot.firebaseio.com",
  projectId: "teste-foot",
  storageBucket: "teste-foot.appspot.com",
  messagingSenderId: "70097691524"
};

// Pro.init('621e54a1', {
//   appVersion: 'APP_VERSION'
// })

// @Injectable()
// export class MyErrorHandler implements ErrorHandler {
//   ionicErrorHandler: IonicErrorHandler;

//   constructor(injector: Injector) {
//     try {
//       this.ionicErrorHandler = injector.get(IonicErrorHandler);
//     } catch(e) {
//       // Unable to get the IonicErrorHandler provider, ensure
//       // IonicErrorHandler has been added to the providers list below
//     }
//   }

//   handleError(err: any): void {
//     Pro.monitoring.handleNewError(err);
//     // Remove this if you want to disable Ionic's auto exception handling
//     // in development mode.
//     this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
//   }
// }


@NgModule({
  declarations: [
    MyApp,
     Ionic2MaskDirective,
    AuthPage,
    InitialPage,
    HomePage,
    MyAccountPage, 
    SettingsPage,
    AboutPage,
    SupportPage,
    PropertyListPage,
    PropertyFilterPage,
    PropertyDetailPage,
    FavoriteListPage,
    BrokerListPage,
    BrokerDetailPage,
    PreApprovedPage,
    NotificationsPage,
    MessageListPage,
    MessageDetailPage,
    YourPropertyPage,
    ChatDetailPage,
    InvoicesPage,
    CheckoutPage,

    // NOVAS PAGINAS
    //clube
    ClubeCadastroPage,
    ClubeEscudoPage,
    ClubeJogoPage,
    ClubeListaPage,

    // campo
    CampoModalPage,


    // jogador
    JogadorCadastroPage,
    JogadorListaPage,
    JogadorArtilhariaPage,

     //convite
    ConviteFiltroPage,
    ConviteResultadoPage,
    ConviteRecebidoPage,
    ConviteEnviadoPage,

    // campeonato
    CampeonatoCadastroPage,
    CampeonatoDetalhePage,
    CampeonatoListaPage,

    //confroto
    ConfrontoListaPage,
    ConfrontoDetalhePage,
    ConfrontoAvaliacaoPage,

    // torcedometro
    TorcedomentroPage,

    //loja
    LojaListaPage,
    LojaDetalhePage,
    LojaCadastroPage,

     //home
    HomeClubePage,
    HomeJogadorPage,
    HomeTorcedorPage ,
    
    //Minha Conta 
    MinhaContaPage ,


    //PIPES
    SortPipe,
    TermSearchPipe,
    SearchPipe 

  ],
  imports: [ 
    CalendarModule,
    BrMaskerModule,
    TextMaskModule, 
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {

  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado' ],
   
    // monthNames: ['janeiro', 'fevereiro', 'mar\u00e7o', ... ],
    // monthShortNames: ['jan', 'fev', 'mar', ... ],
    // dayNames: ['domingo', 'segunda-feira', 'ter\u00e7a-feira', ... ],
    // dayShortNames: ['dom', 'seg', 'ter', ... ],

      locationStrategy: 'path',
      // mode: 'md', --> uncomment in case you'll do an Web App (PWA) build.
      //scrollPadding: false,
      backButtonText: ' ',
      scrollAssist: false, 
      autoFocusAssist: false

      
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    IonicStorageModule.forRoot({
      name: '__ionPropertyDB',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    //PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AuthPage,
    InitialPage,
    HomePage,
    MyAccountPage,
    SettingsPage,
    AboutPage,
    SupportPage,
    PropertyListPage,
    PropertyFilterPage,
    PropertyDetailPage,
    FavoriteListPage,
    BrokerListPage,
    BrokerDetailPage,
    PreApprovedPage,
    NotificationsPage,
    MessageListPage,
    MessageDetailPage,
    YourPropertyPage,
    ChatDetailPage,
    InvoicesPage,
    CheckoutPage,

    //clube
    ClubeCadastroPage,
    ClubeEscudoPage,
    ClubeJogoPage,
    ClubeListaPage,

    // campo
    CampoModalPage,

    // jogador
    JogadorCadastroPage,
    JogadorListaPage,
    JogadorArtilhariaPage,

    //convite
    ConviteFiltroPage,
    ConviteResultadoPage,
    ConviteRecebidoPage,
    ConviteEnviadoPage,

    // campeonato
    CampeonatoCadastroPage,
    CampeonatoDetalhePage,
    CampeonatoListaPage,

     //confroto
    ConfrontoListaPage,
    ConfrontoDetalhePage,
    ConfrontoAvaliacaoPage,

    // torcedometro
    TorcedomentroPage,

    //loja
    LojaListaPage,
    LojaDetalhePage,
    LojaCadastroPage,

    //home
    HomeClubePage,
    HomeJogadorPage,
    HomeTorcedorPage,
    
    //Minha Conta 
    MinhaContaPage 

  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    PropertyService,
    BrokerService,
    MessageService,
    InvoiceService,
    ChatService,
      IonicErrorHandler,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthServiceProvider,
    AngularFireAuth, 
    FirestoreServiceProvider,
    StorageServiceProvider,
    DatabaseServiceProvider ,
    Camera,
    ClubeServiceProvider,
    JogadorServiceProvider,
    UsuarioServiceProvider,
    SessionServiceProvider,
    LoadingServiceProvider,
    CampeonatoServiceProvider,
    MessageServiceProvider,
    ConviteServiceProvider,
    TorcedometroServiceProvider,
    ProdutoServiceProvider,
    EscalacaoServiceProvider,
    ConfrontoServiceProvider,
    LoadingServiceProvider,
    LocalNotifications,
    Calendar,
    FormataMoedaDirective,
    FCM,
    Screenshot
  ]
})
export class AppModule { }
