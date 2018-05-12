import { UtilService } from './../util-service';
import { MessageServiceProvider } from './../message-service/message-service';
import { Campo } from './../../entity/campo';
import { Query } from './../../entity/query';
 

import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
 
 

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class FirestoreServiceProvider<T>   extends UtilService{


  itemCollection: AngularFirestoreCollection<T>;;
  items: Observable<T[]>;
  public idCurrent:string;



  constructor(public afAuth: AngularFireAuth, public afs: AngularFirestore,
  public serviceMessage: MessageServiceProvider) {

  super(afs);
    this.listAll('clubes').subscribe(data => {

      console.log(data)
    });

  }


  

  saveWithId<T>(nomeLista: string, dados: T, idDocument: string)  {
   this.afs.collection<T>(nomeLista).doc(idDocument).set(Object.assign({}, dados)).then((docSave) => {
      this.afs.collection<T>(nomeLista).doc(idDocument).update({
        codigo: idDocument
      }).then((ret) => {
        return ret;
      })
    }).catch(erro => {
      console.error(erro);
    });
  }

  save<T>(nomeLista: string, dados: T)  {

  
   this.afs.collection <T>(nomeLista).add(Object.assign({}, dados)).then((docSave) => {
    
        (<any>dados).codigo = docSave.id;

      this.afs.collection<T>(nomeLista).doc(docSave.id).update({
       codigo: docSave.id

      
      }).then((ret) => {
        return ret;
      })
      this.serviceMessage.showToastMessage('Salvo com sucesso', true);
    }).catch(erro => {
      console.error(erro);
    }),function(){ console.log('GGGGGG')};
  }

  update<T>(nomeLista: string, idDoc: string, dados: T) {

    this.afs.collection<T>(nomeLista).doc(idDoc).update(Object.assign({}, dados));
  }

  delete<T>(nomeLista: string, idDoc: string) {
    this.afs.collection<T>(nomeLista).doc(idDoc).delete();
  }

  deleteSubCollection<T>(nomeLista: string, idDocParent: string, nameListSub: string,
  idDocChild:string,) {
    this.afs.collection<T>(nomeLista).doc(idDocParent).
    collection<T>('nameListSub').doc('idDocChild').delete();
  }

  get<T>(nomeLista: string, idDoc: string): Observable<T> {
    return this.afs.collection<T>(nomeLista).doc<T>(idDoc).valueChanges();
    //return null;
  }

  listAll(nomeLista: string): Observable<any[]> {
    this.itemCollection = this.afs.collection<T>(nomeLista);

    this.items = this.itemCollection.valueChanges();

    return this.items;
  }


  listByQuery(nomeLista: string, querys: Query[], fieldOrderBy?: string): Observable<T[]> {

    this.itemCollection = this.afs.collection<T>(nomeLista, ref =>
          
          ref.where(querys[0].campo, querys[0].operador, querys[0].valor)
          .where(querys[1].campo, querys[1].operador, querys[1].valor)
          
      
    );
    this.items = this.itemCollection.valueChanges();

    return this.items;
  }


  listarCampos(nomeLista: string, campo:Campo): Observable<T[]> {

     return this.afs.collection<T>(nomeLista, ref =>
          
          ref//.where('nome', '>=', campo.nome) 
          //.where('nome', '<=',  campo.nome) 
          .where('tipo', '==', campo.tipo)
          
      
    ).valueChanges();
    
  }


  saveCampo(nomeLista: string, dados: Campo)  {

    var id = super.getGenerateID();
    dados.codigo = id;
   this.afs.collection <Campo>(nomeLista).add(Object.assign({}, dados)).then((docSave) => {
    
      console.log('[Campo] - Campo cadastrado com sucesso');
    
    }).catch(erro => {
      console.error(erro);
    }),function(){ console.log('GGGGGG')};
  }
}

