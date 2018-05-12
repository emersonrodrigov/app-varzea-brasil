import { Jogador } from './../../entity/jogador';
import { Clube } from './../../entity/clube';
export class User {
  email: string;
  password: string;
  uid: string;
  perfil: string;
  foto: string;
  codigo:string;
 

  clube:Clube[] =  new Array();
  jogador: Jogador[] =  new Array();
}