import { ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class MessageServiceProvider {

  constructor(public toastCtrl: ToastController) {

  }




  showToastSucessDelete() {
    let toast = this.toastCtrl.create({
      message: 'Excluido com sucesso.',
      duration: 2000,
      position: 'middle'
    });

    toast.present(toast);
  }

  showToastSucessUpdate() {
    let toast = this.toastCtrl.create({
      message: 'Alterado com sucesso.',
      cssClass: 'profiles-bg',
      duration: 2000,
      position: 'middle'
    });

    toast.present(toast);
  }


    showToastAceitarConvite() {
    let toast = this.toastCtrl.create({
      message: 'Convite aceito com sucesso.',
      cssClass: 'profiles-bg',
      duration: 3000,
      position: 'middle'
    });

    toast.present(toast);
  }

  showToastRecusarConvite() {
    let toast = this.toastCtrl.create({
      message: 'Convite recusado com sucesso.',
      cssClass: 'profiles-bg',
      duration: 3000,
      position: 'middle'
    });

    toast.present(toast);
  }



    showToastSucessSave() {
      let toast = this.toastCtrl.create({
        message: 'Incluido com sucesso.',
        duration: 2000,
        position: 'middle'
      });

      toast.present(toast);
  }

 

  showToastMessage(msg: string, showButton?: boolean, duration?:number) {
    let toast = this.toastCtrl.create({
      cssClass: 'profiles-bg',
      message: msg,
      showCloseButton: showButton? showButton:false,
      duration: duration?duration:4000,
      position: 'middle',
      closeButtonText: 'OK'
    });

    toast.present(toast);
  }

}
