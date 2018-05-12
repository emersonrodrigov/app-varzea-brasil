import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {InvoiceService} from '../../providers/invoice-service-mock';
import {CheckoutPage} from '../checkout/checkout';


@Component({
    selector: 'page-invoices',
    templateUrl: 'invoices.html'
})
export class InvoicesPage {

    invoices: Array<any> = [];

    constructor(public navCtrl: NavController, public service: InvoiceService) {
        this.getInvoices();
        // console.log(this.messages);
    }

    itemTapped() {
      // console.log('itemTapped: ', message);
      // this.navCtrl.push(InvoiceDetailPage, invoice);
      this.navCtrl.push(CheckoutPage);
    }

    getInvoices() {
      this.service.getInvoices().then(data => this.invoices = data);
    }

}
