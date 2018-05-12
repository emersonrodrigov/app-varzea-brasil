import {Component} from "@angular/core";
import {NavController, LoadingController, ToastController} from "ionic-angular";

import {HomePage} from "../home/home";

@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html'
})
export class CheckoutPage {
  // trip data
  // public trip: any;
  // number of adults
  // public adults = 2;
  // date
  // public date = new Date();

  constructor(public nav: NavController, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
    // set sample data
    // this.trip = tripService.getItem(1);
  }

  // process send button
  send() {
    // send booking info
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    // show message
    let toast = this.toastCtrl.create({
      showCloseButton: true,
      cssClass: 'profile-bg',
      message: 'Bill paid with Success!',
      duration: 3000,
      position: 'bottom'
    });

    loader.present();

    setTimeout(() => {
      loader.dismiss();
      toast.present();
      // back to home page
      this.nav.setRoot(HomePage);
    }, 3000)
  }
}
