import { NgModule } from '@angular/core';
import {TermSearchPipe} from './term-search'
import { FormataMoedaPipe } from './formata-moeda/formata-moeda';
import { SortPipe } from './sort/sort';
import { SearchPipe } from './search/search';

@NgModule({
  declarations: [
    TermSearchPipe,
    FormataMoedaPipe,
    SortPipe,
    SearchPipe,
  ],
  imports: [

  ],
  exports: [
    TermSearchPipe,
    FormataMoedaPipe,
    SortPipe,
    SearchPipe
  ]
})
export class PipesModule { }