import { LoadingServiceProvider } from './../loading-service/loading-service';
import { Clube } from './../../entity/clube';
import { COLECAO_FIRESTORE } from './../../pages/Util/constants';
import { UtilService } from './../util-service';
import { AlertController } from 'ionic-angular';
import { Confronto } from './../../entity/confronto';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable'; 
import { Injectable } from '@angular/core';

/*
  Generated class for the ConfrontoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConfrontoServiceProvider extends UtilService {


  itemCollection: AngularFirestoreCollection<Confronto>;;
  items: Observable<Confronto[]>;

  itemCollectionConfronto: AngularFirestoreCollection<Confronto>;;
  itemsConfronto: Observable<Confronto[]>;

 
  public idCurrent: string;
  public collectionNameClube: string;
    public collectionNameConfronto: string;
 
 constructor(public afs: AngularFirestore,
    public alertCtrl: AlertController,
    public serviceLading : LoadingServiceProvider) {
    super(afs);

    this.collectionNameClube = COLECAO_FIRESTORE.CLUBES;
    this.collectionNameConfronto = COLECAO_FIRESTORE.CONFRONTOS;

  }


  saveConfrontoClube(clube:Clube, confronto : Confronto){

    if(!confronto.codigo){
      confronto.codigo = super.getGenerateID();
    }

    //  this.serviceLading.show();
      this.afs.collection<Clube>(this.collectionNameClube)
        .doc(clube.codigo).collection(this.collectionNameConfronto)
          .doc(confronto.codigo).set(Object.assign({}, confronto)).then(objSave =>{
           //this.serviceLading.hide();
            console.log('[ConfrontoServiceProvider] -  Confronto salvo com sucesso.');
          }).catch(erro => {
            //this.serviceLading.hide();
            console.log('[ConfrontoServiceProvider] - Ocorreu um erro. ', erro);
           });

  }


   deleteConfrontoClube(clube: Clube,  confronto : Confronto) {
    this.afs.collection<Clube>(this.collectionNameClube).doc(clube.codigo).
      collection(this.collectionNameConfronto).doc(confronto.codigo).delete();
    console.log('[ConfrontoServiceProvider] - cancelado com sucesso.');
  }


   updateConfrontoClube(clube: Clube,  confronto : Confronto) {
    this.afs.collection<Clube>(COLECAO_FIRESTORE.CLUBES).doc(clube.codigo).
      collection(COLECAO_FIRESTORE.CONFRONTOS).doc(confronto.codigo).update(Object.assign({}, confronto));
    console.log('[ConfrontoServiceProvider] - alterado com sucesso.');
  }



   listaConfrontos(clube: Clube, realizado: boolean, ): Observable<Confronto[]> {

    this.itemCollectionConfronto = this.afs.collection(COLECAO_FIRESTORE.CLUBES).
              doc(clube.codigo).collection(COLECAO_FIRESTORE.CONFRONTOS, ref =>
              ref.where('realizado','==', realizado)
              .orderBy('data','asc'));
    
    
    this.itemsConfronto = this.itemCollectionConfronto.valueChanges();

     console.log('[ConfrontoServiceProvider] - lista confrontos.');
    return this.itemsConfronto;

  }


    listaConfrontosPorData(clube: Clube ,dataPartida : Date): Observable<Confronto[]> {

        this.itemCollectionConfronto = this.afs.collection(COLECAO_FIRESTORE.CLUBES).
                  doc(clube.codigo).collection(COLECAO_FIRESTORE.CONFRONTOS, ref=>
                    ref.where('data','==',dataPartida)
                  );
        
        this.itemsConfronto = this.itemCollectionConfronto.valueChanges();

        console.log('[ConfrontoServiceProvider] - lista confrontos.');

    return this.itemsConfronto;

  }


}
