import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ProdutoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProdutoServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ProdutoServiceProvider Provider');
  }

}
