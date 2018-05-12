

import { COLECAO_FIRESTORE } from './../../pages/Util/constants';
import { Clube } from './../../entity/clube';
import { ClubeServiceProvider } from './../clube-service/clube-service';
import { UsuarioServiceProvider } from './../usuario-service/usuario-service'; 
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
/*
  Generated class for the SessionServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SessionServiceProvider {

  constructor(public serviceUsuario : UsuarioServiceProvider,
              public serviceClube : ClubeServiceProvider,
              public storage: Storage) {
  }


  setDadosUsuarioLogado(clube:Clube){

   this.serviceClube.findByEmail(clube).subscribe((res: Clube[]) => {
      

      clube = res[0];
      
      this.storage.set(COLECAO_FIRESTORE.CLUBES, JSON.stringify(clube))
      .then( ret => {
          console.log('[SessionService] - dados armazenado sessao');
      } )
        ;
    }); 
  }


  getDadosSessao(keyStorage:string) : Promise<any>{

     return  this.storage.get(keyStorage);

}

  removeDadosUsuarioLogado(){
    this.storage.remove(COLECAO_FIRESTORE.CLUBES);
  }

  addValueSession(key:string, dados:any){
      this.storage.set(COLECAO_FIRESTORE.CLUBES, JSON.stringify(dados))
  }

  getValueSession(key:string){
    return  this.storage.get(key);
  }
}
