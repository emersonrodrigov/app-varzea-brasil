
import { Injectable } from '@angular/core';
import firebase from 'firebase';

/*
  Generated class for the StorageServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageServiceProvider {
 
constructor() {}



public profilePictureRef: any;
    public guestPicture: string;


    uploadImagem(_imageBlob:string, pasta:string, nomeFile:string):any {
        this.profilePictureRef = firebase.storage().ref(pasta);
      return this.profilePictureRef.child(nomeFile).putString(_imageBlob, 'base64', {contentType: 'image/png'});      
  
    } 



}
