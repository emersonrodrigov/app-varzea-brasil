import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {MessageService} from '../../providers/message-service-mock';
import {MessageDetailPage} from '../message-detail/message-detail';

@Component({
    selector: 'page-message-list',
    templateUrl: 'message-list.html'
})
export class MessageListPage {

    messages: Array<any> = [];

    constructor(public navCtrl: NavController, public service: MessageService) {
        this.getMessages();
        // console.log(this.messages);
    }

    itemTapped(message) {
        // console.log('itemTapped: ', message);
        message.read = true;
        this.navCtrl.push(MessageDetailPage, message);
    }

    deleteItem(message) {
        this.service.delMessage(message)
            .then(() => {
                this.getMessages();
                // console.log('deleteItem: ', this.messages)
            })
            .catch(error => alert(JSON.stringify(error)));
    }

    getMessages() {
        this.service.getMessages()
            .then(data => this.messages = data);
    }

}
