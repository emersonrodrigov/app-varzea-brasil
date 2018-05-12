import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {BrokerService} from '../../providers/broker-service-mock';
import {ChatDetailPage} from '../../pages/chat-detail/chat-detail';

@Component({
    selector: 'page-broker-detail',
    templateUrl: 'broker-detail.html'
})
export class BrokerDetailPage {

    broker: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public service: BrokerService) {
        this.broker = this.navParams.data;
        service.findById(this.broker.id).then(
            broker => this.broker = broker
        );
    }

  openChat(proptype) {
  	// console.log(proptype);
  	this.navCtrl.push(ChatDetailPage);
  }

}
