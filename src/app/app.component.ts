import { Pro } from '@ionic/pro';
import { JogadorArtilhariaPage } from './../pages/jogador-artilharia/jogador-artilharia';
import { ConfrontoAvaliacaoPage } from './../pages/confronto-avaliacao/confronto-avaliacao';
import { MinhaContaPage } from './../pages/minha-conta/minha-conta';
import { Torcedor } from './../entity/torcedor';
import { Jogador } from './../entity/jogador';
import { HomeClubePage } from './../pages/home-clube/home-clube';

import { AuthServiceProvider } from './../providers/auth-service/auth-service';
import { COLECAO_FIRESTORE } from './../pages/Util/constants';
import { Clube } from './../entity/clube';
import { SessionServiceProvider } from './../providers/session-service/session-service';
import { LojaListaPage } from './../pages/loja-lista/loja-lista';
import { TorcedomentroPage } from './../pages/torcedomentro/torcedomentro';
import { ConfrontoListaPage } from './../pages/confronto-lista/confronto-lista';
import { ConviteEnviadoPage } from './../pages/convite-enviado/convite-enviado';
import { ConviteRecebidoPage } from './../pages/convite-recebido/convite-recebido';
import { CampeonatoListaPage } from './../pages/campeonato-lista/campeonato-lista';
import { ConviteFiltroPage } from './../pages/convite-filtro/convite-filtro';
import { JogadorListaPage } from './../pages/jogador-lista/jogador-lista';
import { ClubeCadastroPage } from './../pages/clube-cadastro/clube-cadastro';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthPage } from '../pages/auth/auth';
import { InitialPage } from '../pages/initial/initial';
import { MyAccountPage } from '../pages/my-account/my-account';
import { PropertyListPage } from '../pages/property-list/property-list';
import { BrokerListPage } from '../pages/broker-list/broker-list';
import { FavoriteListPage } from '../pages/favorite-list/favorite-list';
import { AboutPage } from '../pages/about/about';
import { SupportPage } from '../pages/support/support';
import { PreApprovedPage } from '../pages/pre-approved/pre-approved';
import { MessageListPage } from '../pages/message-list/message-list';
import { YourPropertyPage } from '../pages/your-property/your-property';
import { InvoicesPage } from '../pages/invoices/invoices'; 
 
export interface MenuItem {
	title: string;
	component: any;
	icon: string;
}

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;

	rootPage: any = AuthPage;

	homeItem: any;

	campeonatoItem: any;

	initialItem: any;

	messagesItem: any;

	invoicesItem: any;

	appMenuItems: Array<MenuItem>;

	yourPropertyMenuItems: Array<MenuItem>;

	accountMenuItems: Array<MenuItem>;

	helpMenuItems: Array<MenuItem>;

	convitesMenuItems: Array<MenuItem>;

	timeMenuItems: Array<MenuItem>;

	public clube: Clube;

	public jogador: Jogador;

	public torcedor: Torcedor;

	escudoClube: string;
	nomeClube: string;
	tipoAcesso: string;
	isMandante: number;
	observableSessao;

	constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
		public serviceSession: SessionServiceProvider, public serviceAuth: AuthServiceProvider) {

		this.observableSessao = this.serviceSession.getDadosSessao(COLECAO_FIRESTORE.CLUBES).then((obj) => {
			this.clube = JSON.parse(obj);
			if (obj) {
				this.nav.setRoot(HomeClubePage, { isMenu: true });
			}
		});


		this.initializeApp();


		this.homeItem = { component: HomeClubePage };
		this.campeonatoItem = { component: CampeonatoListaPage };
		this.initialItem = { component: InitialPage };
		this.messagesItem = { component: MessageListPage };
		this.invoicesItem = { component: InvoicesPage };

		this.timeMenuItems = [
			{ title: 'Elenco', component: JogadorListaPage, icon: 'md-people' },
			{ title: 'Jogos', component: ConfrontoListaPage, icon: 'md-clipboard' },
			{ title: 'Artilharia', component: JogadorArtilhariaPage, icon: 'md-football' },
			{ title: 'Confirmar Placar', component: ConfrontoAvaliacaoPage, icon: 'md-checkbox-outline' }
		]

		this.convitesMenuItems = [
			{ title: 'Encontrar Time', component: ConviteFiltroPage, icon: 'md-search' },
			{ title: 'Convites Recebidos', component: ConviteRecebidoPage, icon: 'md-cloud-download' },
			{ title: 'Convites Enviados', component: ConviteEnviadoPage, icon: 'md-cloud-upload' },
		]

		this.appMenuItems = [
			{ title: 'Campeonato', component: CampeonatoListaPage, icon: 'people' },
			// {title: 'Elenco', component: JogadorListaPage, icon: 'people'},
			// {title: 'Marcar Jogos', component: ConviteFiltroPage, icon: 'mail'},
			// {title: 'Jogos', component: ConfrontoListaPage, icon: 'mail'},

			// {title: 'Convites Recebidos', component: ConviteRecebidoPage, icon: 'cloud-download'},
			// {title: 'Convites Enviados', component: ConviteEnviadoPage, icon: 'cloud-upload'},

			{ title: 'Loja Virtual', component: LojaListaPage, icon: 'mail' },
			{ title: 'Escalação', component: ConviteFiltroPage, icon: 'mail' },
			{ title: 'Torcedometro', component: TorcedomentroPage, icon: 'mail' },
			{ title: 'Clube - temp', component: ClubeCadastroPage, icon: 'mail' },
			{ title: 'Properties', component: PropertyListPage, icon: 'home' },
			{ title: 'Brokers', component: BrokerListPage, icon: 'people' },
			{ title: 'Favorites', component: FavoriteListPage, icon: 'star' },
			{ title: 'Get Pre-Approved', component: PreApprovedPage, icon: 'checkmark-circle' },



			// {title: 'Clube', component: ClubeCadastroPage, icon: 'shirt'},
			// {title: 'Clube Jogo', component: ClubeJogoPage, icon: 'shirt'},
		];

		this.yourPropertyMenuItems = [
			{ title: 'Rent Out', component: YourPropertyPage, icon: 'clipboard' },
			{ title: 'Sell', component: YourPropertyPage, icon: 'cash' },
			{ title: 'Lease', component: YourPropertyPage, icon: 'grid' }
		];


		this.accountMenuItems = [
			{ title: 'Acessar', component: AuthPage, icon: 'log-in' },
			{ title: 'Minha Conta', component: MyAccountPage, icon: 'contact' },
			{ title: 'Sair', component: InitialPage, icon: 'log-out' },
		];

		this.helpMenuItems = [
			{ title: 'About', component: AboutPage, icon: 'information-circle' },
			{ title: 'Support', component: SupportPage, icon: 'call' },
		];




	}

	initializeApp() {
		this.platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			this.statusBar.hide();
			this.splashScreen.hide();
				
		});

	}

	openPage(page) {

		this.observableSessao = this.serviceSession.getDadosSessao(COLECAO_FIRESTORE.CLUBES).then((obj) => {
			this.clube = JSON.parse(obj);
			if (obj) {
				// Reset the content nav to have just this page
				// we wouldn't want the back button to show in this scenario
				this.nav.setRoot(page.component, { isMenu: true, clube: this.clube });

			} else {
				this.nav.setRoot(AuthPage);
			}
		}, (erro) => {
			this.nav.setRoot(AuthPage);
		});


	}

	ngOnDestroy() {
		if (this.observableSessao) {
			this.observableSessao.unsubscribe();
		}
	}


	public carregarDados() {
		this.observableSessao = this.serviceSession.getDadosSessao(COLECAO_FIRESTORE.CLUBES).then((obj) => {
			this.clube = JSON.parse(obj);


			this.escudoClube = this.clube.imgEscudo;
			this.nomeClube = this.clube.nome;
			this.tipoAcesso = "1";
			this.isMandante = this.clube.flgMandante;


		});
	}

	public editarConta() {
		this.nav.setRoot(MinhaContaPage, { isMenu: true });
	}

	public logout() {

		this.serviceSession.removeDadosUsuarioLogado();
		this.serviceAuth.signOutFirebase();
		this.nav.setRoot(AuthPage);
	}


}
