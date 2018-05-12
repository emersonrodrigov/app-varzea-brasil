import { Convite } from './../../entity/convite';

import { AlertController } from 'ionic-angular';
import { Jogador } from './../../entity/jogador';

import { COLECAO_FIRESTORE } from './../../pages/Util/constants';
import { UtilService } from './../util-service';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Clube } from './../../entity/clube';
import { Injectable } from '@angular/core';


@Injectable()
export class ClubeServiceProvider extends UtilService {

  itemCollection: AngularFirestoreCollection<Clube>;;
  items: Observable<Clube[]>;

  itemCollectionJogador: AngularFirestoreCollection<Jogador>;;
  itemsJogadores: Observable<Jogador[]>;

  public idCurrent: string;
  public collectionName: string;

  constructor(public afs: AngularFirestore,
    public alertCtrl: AlertController) {
    super(afs);

    this.collectionName = COLECAO_FIRESTORE.CLUBES;

  }


  deleteJogadorClube(clube: Clube, jogador: Jogador) {
    this.afs.collection<Clube>(this.collectionName).doc(clube.codigo).
      collection(COLECAO_FIRESTORE.JOGADORES).doc(jogador.codigo).delete();
    console.log('[Jogador - Clube] - deletado com sucesso');
  }

  updateJogadorClube(clube: Clube, jogador: Jogador) {

    this.afs.collection<Clube>(this.collectionName).doc(clube.codigo).
      collection(COLECAO_FIRESTORE.JOGADORES).doc(jogador.codigo).update(Object.assign({}, jogador));
    console.log('[Jogador - Clube] - alterado com sucesso');
  }

  saveJogadorClube(clube: Clube, jogador: Jogador) {

    jogador.codigo = super.getGenerateID();

    if (jogador.posicao == 'Goleiro'){
         jogador.ordem = 1;
    }else if (jogador.posicao == 'Zagueiro' || jogador.posicao == 'Fixo'){
         jogador.ordem = 2;
    }else if (jogador.posicao == 'Lateral' || jogador.posicao == 'Ala'){
         jogador.ordem = 3;
    }else if (jogador.posicao == 'Volante'){
         jogador.ordem = 4;
    }else if (jogador.posicao == 'Meia'){
         jogador.ordem = 5;
    }else if (jogador.posicao == 'Atacante' || jogador.posicao == 'Pivô'){
         jogador.ordem = 6;
    }else if (jogador.posicao == 'Técnico'){
         jogador.ordem = 7;
    }

    this.afs.collection<Clube>(this.collectionName).doc(clube.codigo).collection(COLECAO_FIRESTORE.JOGADORES)
      .doc(jogador.codigo).set(Object.assign({}, jogador)).then((jogadorSave) => {
        console.log('[Jogador - Clube] - salvo com sucesso');

        // let alert = this.alertCtrl.create({
        //   title: Constast.MSG_GRAVADO_SUCESSO,
        //   buttons: ['OK']
        // });
        // alert.present();

      }).catch(erro => {
        console.log('[Jogador - Clube] - Ocorreu um erro ', erro);
      });
  }

  save(dados: Clube) {
    var id = super.getGenerateID();
    dados.codigo = id;

    this.afs.collection<Clube>(this.collectionName).doc(id).set(Object.assign({}, dados)).then((docSave) => {
      console.log('[Clube] - salvo com sucesso');
    }).catch(erro => {
      console.log('[Clube] - Ocorreu um erro ', erro);
    });
  }





  update(idDoc: string, dados: Clube) {

    this.afs.collection<Clube>(this.collectionName).doc(idDoc).update(Object.assign({}, dados));
    console.log('[Clube] - alterado com sucesso');
  }

  delete(idDoc: string) {
    this.afs.collection<Clube>(this.collectionName).doc(idDoc).delete();
    console.log('[Clube] - deletado com sucesso');
  }

  deleteDocSubCollection(idDocParent: string, nameListSub: string,
    idDocChild: string, ) {



    this.afs.doc('CLUBES/${idDocParent}/jogadores/${idDocChild}').delete();
  }

  get(idDoc: string): Observable<Clube> {
    return this.afs.collection<Clube>(this.collectionName).doc<Clube>(idDoc).valueChanges();

  }

  listAll(): Observable<Clube[]> {
    this.itemCollection = this.afs.collection<Clube>(this.collectionName);

    this.items = this.itemCollection.valueChanges();

    return this.items;
  }

  listJogadoresClube(clube: Clube): Observable<Jogador[]> {

    this.itemCollectionJogador = this.afs.collection(this.collectionName).doc(clube.codigo)
                .collection(COLECAO_FIRESTORE.JOGADORES, ref =>
                  ref.orderBy('ordem', 'asc')
                );
    this.itemsJogadores = this.itemCollectionJogador.valueChanges();
    return this.itemsJogadores;

  }


  findByEmail(clube: Clube): Observable<Clube[]> {

    this.itemCollection = this.afs.collection<Clube>(this.collectionName, ref =>
      ref.where('usuario', '==', clube.usuario)
    );
    this.items = this.itemCollection.valueChanges();


    return this.items;
  }
  

  listaTimesDisponiveis(clubeLogado: Clube, convite: Convite){

   

    if(clubeLogado.flgMandante == 1){
        //clube logado mandante procura por times visitante
        convite.isMandante = "2";
    }else if(clubeLogado.flgMandante == 2){

      // se clube logado visitante procura por mandante
      convite.isMandante = "1";
    }

     
    this.itemCollection = this.afs.collection<Clube>(this.collectionName, ref =>
         ref.where('flgMandante', '==', convite.isMandante)
                  .where('diaJogo', '==', clubeLogado.diaJogo)
                  .where('regiao', '==', clubeLogado.regiao)
                  .where('tipo', '==', clubeLogado.tipo)
                  .where('categoria', '==', clubeLogado.categoria)
                 // .where('horaInicioJogo','>=', convite.horaInicio? convite.horaInicio : '' )
    

    );
    this.items = this.itemCollection.valueChanges();


    return this.items;
  }


}
