import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from './user';



/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  constructor(private angularFireAuth: AngularFireAuth) {
    console.log('Hello AuthServiceProvider Provider');
  }

  createUser(user: User) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  signOutFirebase() {
    return this.angularFireAuth.auth.signOut();
  } 

  resetPassword(email: string) {
    return this.angularFireAuth.auth.sendPasswordResetEmail(email);
  }

  signIn(user : User) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  // socialLogin(isLogin){
  // 	if (isLogin == "facebook"){
  //     this.loadingProvider.startLoading();

  //     let provider = new firebase.auth.FacebookAuthProvider();
  //       firebase.auth().signInWithRedirect(provider).then(() => {
  //         this.loadingProvider.startLoading();
  //           firebase.auth().getRedirectResult().then((result)=>{
  //             console.log('result',result);
  //             this.moveToHome(result.user);
  //             this.loadingProvider.stopLoading();
  //           }).catch(function(error){
  //             this.loadingProvider.stopLoading();
  //             alert(error.message);
  //             console.log('error',error);
  //           })
  //           this.loadingProvider.stopLoading();
  //       }).catch(function(error){
  //         this.loadingProvider.stopLoading();
  //         alert(error.message);
  //         console.log('error',error);
  //       })
  //       this.loadingProvider.stopLoading();
  // 	}else if(isLogin == "google"){
  //     this.loadingProvider.startLoading();
  //     let provider = new firebase.auth.GoogleAuthProvider();
  //       firebase.auth().signInWithRedirect(provider).then(() => {
  //         this.loadingProvider.startLoading();
  //           firebase.auth().getRedirectResult().then((result)=>{
  //             console.log('result',result);
  //             this.loadingProvider.stopLoading();
  //             this.moveToHome(result.user);
  //           }).catch(function(error){
  //             this.loadingProvider.stopLoading();
  //             alert(error.message);
  //             console.log('error',error);
  //           })
  //           this.loadingProvider.stopLoading();
  //       }).catch(function(error){
  //         this.loadingProvider.stopLoading();
  //         alert(error.message);
  //         console.log('error',error);
  //       })
  //       this.loadingProvider.stopLoading();
  // 	}else if(isLogin == "twitter"){
  // 		// this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider())
  //     // 	.then(res => {
  //     // 		 this.moveToHome(res);
  //     // 	})
  //     // 	.catch(err => console.log('err',err));
  // 	}else if(isLogin == "github"){
  // 		// this.afAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider())
  //     // 	.then(res => {
  //     // 		 this.moveToHome(res);
  //     // 	})
  //     // 	.catch(err => console.log('err',err));
  // 	}



}
