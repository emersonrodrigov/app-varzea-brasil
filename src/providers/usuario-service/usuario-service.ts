import { COLECAO_FIRESTORE } from './../../pages/Util/constants';
import { UtilService } from './../util-service';
import { User } from './../auth-service/user';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreCollection,AngularFirestore } from 'angularfire2/firestore'; 
import { Injectable } from '@angular/core';

@Injectable()
export class UsuarioServiceProvider extends UtilService {

  itemCollection: AngularFirestoreCollection<User>;;
  items: Observable<User[]>;
  public idCurrent: string;
  public collectionName: string;

  constructor(public afs: AngularFirestore) {
    super(afs);

    this.collectionName = COLECAO_FIRESTORE.USUARIOS;


  }



 save(dados: User) {
    var id = super.getGenerateID();
    dados.codigo = id;

    this.afs.collection<User>(this.collectionName).doc(id).set(Object.assign({},dados)).then((docSave) => {
      console.log('[User] - salvo com sucesso');
    }).catch(erro => {
      console.log('[User] - Ocorreu um erro ', erro);
    });
  }



  update(idDoc: string, dados: User) {

    this.afs.collection<User>(this.collectionName).doc(idDoc).update(Object.assign({}, dados));
    console.log('[User] - alterado com sucesso');
  }

  delete(idDoc: string) {
    this.afs.collection<User>(this.collectionName).doc(idDoc).delete();
    console.log('[User] - deletado com sucesso');
  }

  deleteSubCollection(nomeLista: string, idDocParent: string, nameListSub: string,
    idDocChild: string, ) {
    // this.afs.collection<Clube>(nomeLista).doc(idDocParent).
    // collection<Clube>('nameListSub').doc('idDocChild').delete();
  }

  get(idDoc: string): Observable<User> {
    return this.afs.collection<User>(this.collectionName).doc<User>(idDoc).valueChanges();

  }

  listAll(): Observable<User[]> {
    this.itemCollection = this.afs.collection<User>(this.collectionName);

    this.items = this.itemCollection.valueChanges();

    return this.items;
  }


}
