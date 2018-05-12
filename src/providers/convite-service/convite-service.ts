import { COLECAO_FIRESTORE } from './../../pages/Util/constants';
import { Clube } from './../../entity/clube';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AlertController } from 'ionic-angular';
import { UtilService } from './../util-service'; 
import { Injectable } from '@angular/core';

/*
  Generated class for the ConviteServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConviteServiceProvider extends UtilService {

   

  itemCollectionClube: AngularFirestoreCollection<Clube>;
  itemsClubes: Observable<Clube[]>;

  public idCurrent: string;
  public collectionNameClube: string;
  public collectionNameConviteEnv: string;
  public collectionNameConviteRec: string;


  constructor(public afs: AngularFirestore,
    public alertCtrl: AlertController) {
    super(afs);

    this.collectionNameClube = COLECAO_FIRESTORE.CLUBES;
    this.collectionNameConviteEnv = COLECAO_FIRESTORE.CONVITES_ENVIADOS;
    this.collectionNameConviteRec = COLECAO_FIRESTORE.CONVITES_RECEBIDOS;
    console.log('Hello ConviteServiceProvider Provider');


  }


  enviarConvite(clubeConvite: Clube, clubeConvidado: Clube) {
    // gravo convite(recebido) no clube convidado
    //convite.codigo = super.getGenerateID();

   // clubeConvidado.codigoConvite = super.getGenerateID();
   // clubeConvite.codigoConvite = super.getGenerateID();

    let idConfronto = super.getGenerateID(); 

    clubeConvite.codigoConvite = idConfronto;
    clubeConvidado.codigoConvite = idConfronto;

    this.afs.collection<Clube>(this.collectionNameClube)
      .doc(clubeConvidado.codigo).collection(COLECAO_FIRESTORE.CONVITES_RECEBIDOS)
      .doc(idConfronto).set(Object.assign({}, clubeConvite)).then((clubeQueConvidou) => {
        console.log('[Convite - Clube] - convite recebido com sucesso',clubeQueConvidou);

      }).catch(erro => {
        console.log('[Convite - Clube] - Ocorreu um erro no recebimento do convite ', erro);
      });




    // gravo o convite(enviad0) no clube que esta fazendo o convite.
    this.afs.collection<Clube>(this.collectionNameClube)
      .doc(clubeConvite.codigo).collection(COLECAO_FIRESTORE.CONVITES_ENVIADOS)
      .doc(idConfronto).set(Object.assign({}, clubeConvidado)).then((clubeConviteEnviado) => {
        console.log('[Convite - Clube] - convite enviado salvo com sucesso',clubeConviteEnviado);

      }).catch(erro => {
        console.log('[Convite - Clube] - Ocorreu um erro  ao salvar o convite enviado', erro);
        
      });
  }



  convitesRecebidos(clube: Clube): Observable<Clube[]> {

    this.itemCollectionClube = this.afs.collection(this.collectionNameClube).doc(clube.codigo).collection(this.collectionNameConviteRec,
    ref => 
     ref.orderBy('dataPartidaConvite','desc') );
    this.itemsClubes = this.itemCollectionClube.valueChanges();
    return this.itemsClubes;

  }

  convitesEnviados(clube: Clube): Observable<Clube[]> {
    this.itemCollectionClube = this.afs.collection(this.collectionNameClube).doc(clube.codigo).collection(this.collectionNameConviteEnv,
    ref => 
      ref.orderBy('dataPartidaConvite','desc')
      //.orderBy('statusConvite', 'asc')
      
      );
    
    this.itemsClubes = this.itemCollectionClube.valueChanges();
    return this.itemsClubes;

  }

  convitesRecebidosPorStatus(clube: Clube,status:String ): Observable<Clube[]> {

    this.itemCollectionClube = this.afs.collection(this.collectionNameClube).doc(clube.codigo).collection(this.collectionNameConviteRec,
      ref => 
        ref.where('statusConvite','==',status) 
        
      );
    this.itemsClubes = this.itemCollectionClube.valueChanges();
    return this.itemsClubes;

  }
convitesEnviadosPorStatus(clube: Clube, status:String  ): Observable<Clube[]> {
    this.itemCollectionClube = this.afs.collection(this.collectionNameClube).doc(clube.codigo).collection(this.collectionNameConviteEnv,
      ref => 
        ref.where('statusConvite','==',status)
         
      );
    this.itemsClubes = this.itemCollectionClube.valueChanges();
    return this.itemsClubes;

  }

   


   convitesRecebidosPorStatusDataConvite(clube: Clube,status:String ): Observable<Clube[]> {

    this.itemCollectionClube = this.afs.collection(this.collectionNameClube).doc(clube.codigo).collection(this.collectionNameConviteRec,
      ref => 
        ref.where('statusConvite','==',status) 
        .where('dataPartidaConvite', '==', clube.dataPartidaConvite)
      );
    this.itemsClubes = this.itemCollectionClube.valueChanges();
    return this.itemsClubes;

  }
  convitesEnviadosPorStatusDataConvite(clube: Clube, status:String  ): Observable<Clube[]> {
    this.itemCollectionClube = this.afs.collection(this.collectionNameClube).doc(clube.codigo).collection(this.collectionNameConviteEnv,
      ref => 
        ref.where('statusConvite','==',status)
        .where('dataPartidaConvite', '==', clube.dataPartidaConvite)
      );
    this.itemsClubes = this.itemCollectionClube.valueChanges();
    return this.itemsClubes;

  }

  

  listarConvitesRecebidosPorDataConvite(clube: Clube, dataConvite : Date): Observable<Clube[]> {
    this.itemCollectionClube = this.afs.collection(this.collectionNameClube)
      .doc(clube.codigo).collection(COLECAO_FIRESTORE.CONVITES_RECEBIDOS, ref =>
         ref.where('dataPartidaConvite', '==', dataConvite)
          .where('statusConvite', '==' , '1' )
    );
    this.itemsClubes = this.itemCollectionClube.valueChanges();
    return this.itemsClubes;
  }

  listarConvitesEnviadosPorDataConvite(clube: Clube, dataConvite : Date): Observable<Clube[]> {
    this.itemCollectionClube = this.afs.collection(this.collectionNameClube)
      .doc(clube.codigo).collection(COLECAO_FIRESTORE.CONVITES_ENVIADOS, ref =>
         ref.where('dataPartidaConvite', '==', dataConvite)
         .where('statusConvite', '==' , '1' )
    );
    this.itemsClubes = this.itemCollectionClube.valueChanges();
    return this.itemsClubes;
  }

   getConviteEnviado(clubeEnviado:Clube, idDoc: string): Observable<Clube> {


    return this.afs.collection<Clube>(COLECAO_FIRESTORE.CLUBES).doc<Clube>(clubeEnviado.codigo)
        .collection(COLECAO_FIRESTORE.CONVITES_ENVIADOS).doc<Clube>(idDoc).valueChanges();
  }

  getConviteRecebido(clubeRecebido:Clube, idDoc: string): Observable<Clube> {
     return this.afs.collection<Clube>(COLECAO_FIRESTORE.CLUBES).doc(clubeRecebido.codigo)
        .collection(COLECAO_FIRESTORE.CONVITES_RECEBIDOS).doc<Clube>(idDoc).valueChanges();
    
  }
 

   alterarConviteRecebido(clubePrincipal:Clube, clubeRecebido:Clube, idDoc: string) {

    this.afs.collection<Clube>(COLECAO_FIRESTORE.CLUBES).doc(clubePrincipal.codigo).
      collection(COLECAO_FIRESTORE.CONVITES_RECEBIDOS).doc(idDoc).update(Object.assign({}, clubeRecebido));
    console.log('[ConviteServiceProvider] - convite recebido alterado com sucesso');
  }


  alterarStatusConviteRecebido(clubePrincipal: Clube, idClubeConvite:string, status:string, motivoStatus?:string ){

      this.afs.collection<Clube>(COLECAO_FIRESTORE.CLUBES).doc(clubePrincipal.codigo).
      collection(COLECAO_FIRESTORE.CONVITES_RECEBIDOS).doc(idClubeConvite).update(
          {
            statusConvite: status,
            motivoCancelamento: motivoStatus
        }

      );
    console.log('[ConviteServiceProvider] - status do convite recebido alterado com sucesso');

  }

   alterarStatusConviteEnviado(clubePrincipal: Clube, idClubeConvite:string, status:string ){

      this.afs.collection<Clube>(COLECAO_FIRESTORE.CLUBES).doc(clubePrincipal.codigo).
      collection(COLECAO_FIRESTORE.CONVITES_RECEBIDOS).doc(idClubeConvite).update(
          {statusConvite: status}
      );
    console.log('[ConviteServiceProvider] - status do convite enviado alterado com sucesso');

  }


  

   alterarConviteEnviado(clubeLogado:Clube, clubeEnviado:Clube, idDoc: string) { 

    
    this.afs.collection<Clube>(COLECAO_FIRESTORE.CLUBES).doc(clubeLogado.codigo).
      collection(COLECAO_FIRESTORE.CONVITES_ENVIADOS).doc(idDoc).update(Object.assign({}, clubeEnviado));
    
    
    console.log('[ConviteServiceProvider] - convite recebido alterado com sucesso');
  }


}
