import { Clube } from './../../entity/clube';
import { UtilService } from './../util-service';
import { COLECAO_FIRESTORE } from './../../pages/Util/constants';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Campeonato } from './../../entity/campeonato';
import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';

/*
  Generated class for the CampeonatoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CampeonatoServiceProvider extends UtilService {

  itemCollection: AngularFirestoreCollection<Campeonato>;;
  items: Observable<Campeonato[]>;

  itemCollectionClube: AngularFirestoreCollection<Clube>;;
  itemsClube: Observable<Clube[]>;

  public idCurrent: string;
  public collectionName: string;

  constructor(public afs: AngularFirestore) {
    super(afs);

    this.collectionName = COLECAO_FIRESTORE.CAMPEONATOS;


  }


  save(dados: Campeonato) {
    var id = super.getGenerateID();
    dados.codigo = id;

    this.afs.collection<Campeonato>(this.collectionName).doc(id).set(Object.assign({}, dados)).then((docSave) => {
      console.log('[Campeonato] - salvo com sucesso');
    }).catch(erro => {
      console.log('[Campeonato] - Ocorreu um erro ', erro);
    });
  }

  addClube(campeonato: Campeonato, clubePartipante: Clube) {


    this.afs.collection<Clube>(this.collectionName).doc(campeonato.codigo).collection(COLECAO_FIRESTORE.CLUBES)
      .doc(clubePartipante.codigo).set(Object.assign({}, clubePartipante)).then((clubeSave) => {
        console.log('[Clube] - Inscricao efetuada com sucesso');
      }).catch(erro => {
        console.log('[Clube] - Ocorreu um erro ', erro);
      });
  }




  update(idDoc: string, dados: Campeonato) {

    this.afs.collection<Campeonato>(this.collectionName).doc(idDoc).update(Object.assign({}, dados));
    console.log('[Campeonato] - alterado com sucesso');
  }

  delete(idDoc: string) {
    this.afs.collection<Campeonato>(this.collectionName).doc(idDoc).delete();
    console.log('[Campeonato] - deletado com sucesso');
  }

  deleteSubCollection(nomeLista: string, idDocParent: string, nameListSub: string,
    idDocChild: string, ) {
    // this.afs.collection<Clube>(nomeLista).doc(idDocParent).
    // collection<Clube>('nameListSub').doc('idDocChild').delete();
  }

  get(idDoc: string): Observable<Campeonato> {
    return this.afs.collection<Campeonato>(this.collectionName).doc<Campeonato>(idDoc).valueChanges();

  }


  listaClubesInscrito(campeonato: Campeonato): Observable<Clube[]> {

    this.itemCollectionClube = this.afs.collection(this.collectionName).doc(campeonato.codigo).collection(COLECAO_FIRESTORE.CLUBES);
    this.itemsClube = this.itemCollectionClube.valueChanges();
    return this.itemsClube;

  }

  listAll(): Observable<Campeonato[]> {
    this.itemCollection = this.afs.collection<Campeonato>(this.collectionName, ref=> 
      ref.orderBy('nome','asc')
    );

    this.items = this.itemCollection.valueChanges();

    return this.items;
  }

}
