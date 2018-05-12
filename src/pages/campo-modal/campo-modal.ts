import { FormGroup, FormBuilder, Validators } from '@angular/forms';  
import { SessionServiceProvider } from './../../providers/session-service/session-service';
import { LoadingServiceProvider } from './../../providers/loading-service/loading-service';
import { FirestoreServiceProvider } from './../../providers/firestore-service/firestore-service';
import { Clube } from './../../entity/clube';
import { Campo } from './../../entity/campo';
import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-campo-modal',
  templateUrl: 'campo-modal.html',
})
export class CampoModalPage {

  listaCampos: Campo[];
  listaCamposTemp: Campo[];
  time: Clube;
  campo:Campo = new Campo();
  habilitarCadastro:boolean = false;

   public formCadastro: FormGroup;


  constructor(public fsp: FirestoreServiceProvider<Campo>,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController,
    public params: NavParams,
    public fb: FormBuilder,
    public serviceLoading: LoadingServiceProvider,
    public serviceSession: SessionServiceProvider) {



        this.formCadastro = this.fb.group({

        nome: ['',  Validators.required],
        endereco: ['', Validators.required],
        regiao: ['', Validators.required],
        referencia: [''],
        tipo: ['']
        
      });

    //se for alteracao
    if (params.get('time') != null) {
      this.time = params.get('time');
    }

 this.carregarCampos()

   
  }


  habilitarNovoCadastro(){
    this.formCadastro.reset();
    this.campo = new Campo();
    this.habilitarCadastro = true;

  }
  


  save(){
      this.campo.tipo = this.time.tipo.toString();

      this.fsp.saveCampo('campos',this.campo);
      console.log('campos gravado', this.campo);
      this.filtrarLocais(this.campo.nome);

  }

  carregarCampos() {



    let campo:Campo = new Campo();
    campo.tipo = this.time.tipo.toString();
   // campo.nome = filtro;


    this.serviceLoading.show();
    this.fsp.listarCampos('campos', campo).subscribe(res => {

      this.listaCampos = res;
      //this.listaCamposTemp = res;
      //this.serviceSession.addValueSession(COLECAO_FIRESTORE.CAMPOS, res);

      this.serviceLoading.hide(); 

      // caso faca um cadastro de um novo campo.. exibo na lista para selecionar o novo cadstro
      if(this.campo.nome){
        this.filtrarLocais(this.campo.nome)
      }


      console.log(res);
    }, erro => {
      console.log("[CampoModalPage] - Ocorreu um erro ao listar os campos", erro)
      this.serviceLoading.hide();
    });

  }




  public selecionarCampos(campo: Campo) {
    this.viewCtrl.dismiss(campo); //Send back the form object when closeModal is called
  }

  getItems(ev) {
    this.filtrarLocais(ev.target.value);
  }

  filtrarLocais(valor:string){
        // 
    if(valor){
          this.listaCamposTemp = this.listaCampos;
        
          // set val to the value of the ev target
          var val = valor;

          // if the value is an empty string don't filter the items
          if (val && val.trim() != '') {
            this.habilitarCadastro=false;
            this.listaCamposTemp = this.listaCamposTemp.filter((item) => {
              return (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1  || item.endereco.toLowerCase().indexOf(val.toLowerCase()) > -1 ) ;
            })
          }
    }else{
       this.listaCamposTemp =new Array();
    }
  }

  fechar() {
    this.viewCtrl.dismiss();
  }


}
