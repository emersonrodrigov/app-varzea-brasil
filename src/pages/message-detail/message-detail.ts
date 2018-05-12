import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {MessageService} from '../../providers/message-service-mock';

@Component({
    selector: 'page-message-detail',
    templateUrl: 'message-detail.html'
})
export class MessageDetailPage {

	message: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public service: MessageService) {
    this.message = this.navParams.data;
  }

}
