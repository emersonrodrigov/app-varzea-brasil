import { LoadingServiceProvider } from './../../providers/loading-service/loading-service';
import { HomeClubePage } from './../home-clube/home-clube';
import { Jogador } from './../../entity/jogador';
import { Torcedor } from './../../entity/torcedor';
import { UsuarioServiceProvider } from './../../providers/usuario-service/usuario-service';
import { TipoAcesso } from './../Util/constants';
import { ClubeCadastroPage } from './../clube-cadastro/clube-cadastro';
import { Clube } from './../../entity/clube';
import { SessionServiceProvider } from './../../providers/session-service/session-service';
import { ClubeServiceProvider } from './../../providers/clube-service/clube-service';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { User } from './../../providers/auth-service/user';
import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NavController, AlertController, ToastController, MenuController } from "ionic-angular";
import * as firebase from 'firebase';
// import {RegisterPage} from "../register/register";

@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html'
})
export class AuthPage implements OnInit {
  public onLoginForm: FormGroup;
  public onRegisterClubeForm: FormGroup;
  public onRegisterJogadorForm: FormGroup;
  public onRegisterTorcedorForm: FormGroup;
  auth: string = "login";
  user: User = new User();
  clube: Clube = new Clube();
  jogador: Jogador = new Jogador();
  tipoCadastro: string = "clube";
  torcedor: Torcedor = new Torcedor();
  observableClube;

  constructor(private _fb: FormBuilder, public nav: NavController,
    public forgotCtrl: AlertController, public menu: MenuController, public toastCtrl: ToastController,
    private authService: AuthServiceProvider,
    public serviceClube: ClubeServiceProvider,
    public serviceSession: SessionServiceProvider,
    public serviceUsuario: UsuarioServiceProvider,
    public serviceSessao: SessionServiceProvider,
    public serviceLoading: LoadingServiceProvider
  ) {


    this.menu.swipeEnable(false);
  }

  ngOnDestroy() {
    if (this.observableClube) {
      this.observableClube.unsubscribe();
    }
  }

  ngOnInit() {
    this.onLoginForm = this._fb.group({
      email: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])]
    });

    this.onRegisterClubeForm = this._fb.group({
      email: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])],
      nome: ['', Validators.compose([
        Validators.required
      ])]
    });

    this.onRegisterJogadorForm = this._fb.group({
      email: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])],
      nome: ['', Validators.compose([
        Validators.required
      ])]
    });

    this.onRegisterTorcedorForm = this._fb.group({
      email: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])],
      nome: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  //go to register page
  register() {

    if (this.tipoCadastro == 'clube') {
      this.registerClube();
    } else if (this.tipoCadastro == 'jogador') {
      this.registerJogador();
    } else if (this.tipoCadastro == 'torcedor') {
      this.registerTorcedor();
    }
  }


  private registerTorcedor() {
    let toast = this.toastCtrl.create({
      showCloseButton: true,
      cssClass: 'profiles-bg',
      message: 'Torcedor Cadastrado com sucesso.',
      duration: 4000,
      position: 'middle'
    });

    this.authService.createUser(this.user)
      .then((user: firebase.User) => {
        //user.sendEmailVerification();

        //this.time.usuario = this.time.usuario.toLowerCase();
        // this.serviceClube.save(this.time);
        this.user.uid = user.uid;
        this.user.password = 'xxxx';
        this.user.perfil = TipoAcesso.CLUBE;
        // this.user.clube.push(Object.assign({}, this.time))
        //this.serviceUsuario.save(this.user)

        //  this.serviceSessao.setDadosUsuarioLogado(this.time);


        toast.present();


        // navega para tela de cadastrar o clube
        this.nav.setRoot(HomeClubePage, { torcedor: this.torcedor });
      })
      .catch((error: any) => {
        if (error.code == 'auth/email-already-in-use') {
          toast.setMessage('O e-mail digitado já está em uso.');
        } else if (error.code == 'auth/invalid-email') {
          toast.setMessage('O e-mail digitado não é valido.');
        } else if (error.code == 'auth/operation-not-allowed') {
          toast.setMessage('Não está habilitado criar usuários.');
        } else if (error.code == 'auth/weak-password') {
          toast.setMessage('A senha digitada é muito fraca.');
        }
        toast.present();
      });
  }


  private registerJogador() {
    let toast = this.toastCtrl.create({
      showCloseButton: true,
      cssClass: 'profiles-bg',
      message: 'Jogador cadastrado com sucesso.',
      duration: 4000,
      position: 'middle'
    });

    this.authService.createUser(this.user)
      .then((user: firebase.User) => {
        //user.sendEmailVerification();

        //this.time.usuario = this.time.usuario.toLowerCase();
        // this.serviceClube.save(this.time);


        this.user.uid = user.uid;
        this.user.password = 'xxxx';
        this.user.perfil = TipoAcesso.CLUBE;
        // this.user.clube.push(Object.assign({}, this.time))
        //this.serviceUsuario.save(this.user)

        //  this.serviceSessao.setDadosUsuarioLogado(this.time);


        toast.present();




        // navega para tela de cadastrar o clube
        this.nav.setRoot(HomeClubePage, { jogador: this.jogador });
      })
      .catch((error: any) => {
        if (error.code == 'auth/email-already-in-use') {
          toast.setMessage('O e-mail digitado já está em uso.');
        } else if (error.code == 'auth/invalid-email') {
          toast.setMessage('O e-mail digitado não é valido.');
        } else if (error.code == 'auth/operation-not-allowed') {
          toast.setMessage('Não está habilitado criar usuários.');
        } else if (error.code == 'auth/weak-password') {
          toast.setMessage('A senha digitada é muito fraca.');
        }
        toast.present();
      }); 
  }

  private registerClube() {
    let toast = this.toastCtrl.create({
      showCloseButton: true,
      closeButtonText: 'OK',
      cssClass: 'profiles-bg',
      message: 'Time Cadastrado com sucesso. Insira as infomações do seu time.',
      duration: 4000,
      position: 'middle'
    });

    this.serviceLoading.show();
    this.authService.createUser(this.user)
      .then((user: firebase.User) => {
        //user.sendEmailVerification();

        this.user.uid = user.uid;
        this.user.password = 'xxxx';
        this.user.perfil = TipoAcesso.CLUBE;

        // dados do clube
        this.clube.usuario = this.user.email;
         this.serviceLoading.hide();
        toast.present();

        //grav o clube de forma temporaria
        this.serviceClube.save(this.clube);

        // navega para tela de cadastrar o clube
        this.nav.setRoot(ClubeCadastroPage, { clube: this.clube, isLogin: true });
      })
      .catch((error: any) => {
        if (error.code == 'auth/email-already-in-use') {
          toast.setMessage('O e-mail digitado já está em uso.');
        } else if (error.code == 'auth/invalid-email') {
          toast.setMessage('O e-mail digitado não é valido.');
        } else if (error.code == 'auth/operation-not-allowed') {
          toast.setMessage('Não está habilitado criar usuários.');
        } else if (error.code == 'auth/weak-password') {
          toast.setMessage('A senha digitada é muito fraca.');
        }
        toast.present();
        this.serviceLoading.hide();
      });
  }


  // proximaEtapa() {
  //   // SE SENHA FOR DIFERENTES
  //   if (this.time.password != this.confirmaSenha) {
  //     this.alertCtrl.create({
  //       title: 'Aviso',
  //       subTitle: "Senhas devem ser iguais !",
  //       buttons: [
  //         {
  //           text: 'OK'
  //         }]
  //     }).present();

  //   } else {
  //     //POPUP CARREGANDO
  //     // let carregando = this.loadingCtrl.create({
  //     //   content: 'Constast.STR_POPUP_CARREGANDANDO'
  //     // });

  //     // carregando.present();


  //     if (this.formCadastro.valid) {
  //       let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });

  //       this.user.email = this.time.usuario;
  //       this.user.password = this.time.password;

  //       this.authService.createUser(this.user)
  //         .then((user: firebase.User) => {
  //           //user.sendEmailVerification();

  //           this.time.usuario = this.time.usuario.toLowerCase();
  //           this.serviceClube.save(this.time);


  //           this.user.uid = user.uid;
  //           this.user.password = 'xxxx';
  //           this.user.perfil = TipoAcesso.CLUBE;
  //           this.user.clube.push(Object.assign({}, this.time))
  //           this.serviceUsuario.save(this.user)

  //           this.serviceSessao.setDadosUsuarioLogado(this.time);

  //           toast.setMessage('Clube cadastrado com sucesso.');
  //           toast.present();

  //           this.navCtrl.setRoot(HomePage);
  //         })
  //         .catch((error: any) => {
  //           if (error.code == 'auth/email-already-in-use') {
  //             toast.setMessage('O e-mail digitado já está em uso.');
  //           } else if (error.code == 'auth/invalid-email') {
  //             toast.setMessage('O e-mail digitado não é valido.');
  //           } else if (error.code == 'auth/operation-not-allowed') {
  //             toast.setMessage('Não está habilitado criar usuários.');
  //           } else if (error.code == 'auth/weak-password') {
  //             toast.setMessage('A senha digitada é muito fraca.');
  //           }
  //           toast.present();
  //         });
  //     }


  //   }
  // }


  // login and go to home page
  login() {
    if (this.onLoginForm.valid) {
      let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });

      this.serviceLoading.show();
      this.authService.signIn(this.user)
        .then((user: firebase.User) => {


          let clube: Clube = new Clube();
          clube.usuario = user.email;
          this.serviceSession.setDadosUsuarioLogado(clube);

          this.observableClube = this.serviceClube.findByEmail(clube).subscribe(ret => {
            clube = ret[0]
            if(!clube){
               this.nav.setRoot(ClubeCadastroPage, { clube: clube, isLogin: true });
               this.serviceLoading.hide();
            }else if (clube.isCadastroFinalizado) {
              this.nav.setRoot(HomeClubePage);
              this.serviceLoading.hide();
            } else {
              this.nav.setRoot(ClubeCadastroPage, { clube: clube, isLogin: true });
              this.serviceLoading.hide();
            }
          });


        })
        .catch((error: any) => {
          this.serviceLoading.hide();
          if (error.code == 'auth/user-disabled') {
            toast.setMessage('O usuario esta desativado.');
          } else if (error.code == 'auth/invalid-email') {
            toast.setMessage('O e-mail digitado não é valido.');
          } else if (error.code == 'auth/user-not-found') {
            toast.setMessage('usuário não encontrado');
          } else if (error.code == 'auth/wrong-password') {
            toast.setMessage('A senha digitada não é valida');
          }
          toast.present();
        });
    }
  }




  // esquece password
  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Esqueceu a senha?',
      message: "Informe seu email e receberá um link para gerar uma nova senha.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Enviar',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email was sended successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });

            this.authService.resetPassword(data.email)
              .then(() => {
                toast.setMessage('Solicitação foi enviada para o seu e-mail.')
                toast.present();

                //fechar a tela
                //this.nav.pop();
              })
              .catch((error: any) => {
                if (error.code == 'auth/invalid-email') {
                  toast.setMessage('O e-mail digitado não é valido.');
                } else if (error.code == 'auth/user-not-found') {
                  toast.setMessage('O usuário não foi encontrado.');
                }

                toast.present();
              });

          }
        }
      ]
    });
    forgot.present();
  }


  clearForms() {

    this.onRegisterClubeForm.reset();
    this.onRegisterJogadorForm.reset();
    this.onRegisterTorcedorForm.reset();
    this.onLoginForm.reset();
  }
}
