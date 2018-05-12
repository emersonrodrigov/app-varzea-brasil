import {Component} from "@angular/core";
import {NavController, ViewController} from "ionic-angular";

import {MessageListPage} from '../message-list/message-list'

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})

export class NotificationsPage {
  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {}

  close() {
    this.viewCtrl.dismiss();
  }

  messages () {
  	this.navCtrl.push(MessageListPage);
  }
}
