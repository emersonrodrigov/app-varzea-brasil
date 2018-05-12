import { COLECAO_FIRESTORE } from './../../pages/Util/constants';
import { Jogador } from './../../entity/jogador';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { UtilService } from './../util-service';

import { Injectable } from '@angular/core';

/*
  Generated class for the JogadorServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class JogadorServiceProvider extends UtilService {

  itemCollection: AngularFirestoreCollection<Jogador>;;
  items: Observable<Jogador[]>;
  public idCurrent: string;
  public collectionName: string;

  constructor(public afs: AngularFirestore) {
    super(afs);

    this.collectionName = COLECAO_FIRESTORE.JOGADORES ;


  }


save(dados: Jogador) {
    var id = super.getGenerateID();
    dados.codigo = id;

   if (dados.posicao == 'Goleiro'){
         dados.ordem = 1;
    }else if (dados.posicao == 'Zagueiro' || dados.posicao == 'Fixo'){
         dados.ordem = 2;
    }else if (dados.posicao == 'Lateral' || dados.posicao == 'Ala'){
         dados.ordem = 3;
    }else if (dados.posicao == 'Volante'){
         dados.ordem = 4;
    }else if (dados.posicao == 'Meia'){
         dados.ordem = 5;
    }else if (dados.posicao == 'Atacante' || dados.posicao == 'Pivô'){
         dados.ordem = 6;
    }else if (dados.posicao == 'Técnico'){
         dados.ordem = 7;
    }


    this.afs.collection<Jogador>(this.collectionName).doc(id).set(Object.assign({},dados)).then((docSave) => {
      console.log('[Jogador] - salvo com sucesso');
    }).catch(erro => {
      console.log('[Jogador] - Ocorreu um erro ', erro);
    });
  }




  update(idDoc: string, dados: Jogador) {

    this.afs.collection<Jogador>(this.collectionName).doc(idDoc).update(Object.assign({}, dados));
    console.log('[Jogador] - alterado com sucesso');
  }

  delete(idDoc: string) {
    this.afs.collection<Jogador>(this.collectionName).doc(idDoc).delete();
    console.log('[Jogador] - deletado com sucesso');
  }

  deleteSubCollection(nomeLista: string, idDocParent: string, nameListSub: string,
    idDocChild: string, ) {
    // this.afs.collection<Clube>(nomeLista).doc(idDocParent).
    // collection<Clube>('nameListSub').doc('idDocChild').delete();
  }

  get(idDoc: string): Observable<Jogador> {
    return this.afs.collection<Jogador>(this.collectionName).doc<Jogador>(idDoc).valueChanges();

  }

  listAll(): Observable<Jogador[]> {
    this.itemCollection = this.afs.collection<Jogador>(this.collectionName);

    this.items = this.itemCollection.valueChanges();

    return this.items;
  }


  // listByQuery(clube:Clube): Observable<Clube[]> {

  //   this.itemCollection = this.afs.collection<Clube>(this.collectionName, ref =>
  //     ref.where('usuario', '==', clube.usuario)
  //   );
  //   this.items = this.itemCollection.valueChanges();

  //   return this.items;
  // }
  //
}