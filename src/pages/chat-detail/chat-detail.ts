import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ChatService } from '../../providers/chat-service-mock';

@Component({
    selector: 'page-chat-detail',
    templateUrl: 'chat-detail.html'
})
export class ChatDetailPage {

	message: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public service: ChatService) {
    this.message = this.navParams.data;
  }

}
