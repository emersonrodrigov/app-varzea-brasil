import { Clube } from './clube';



 
export class Convite{

    public codigo:string;
    public status: string;
    public dataPartida : Date;
    public horaInicio: string;
    public timeConvite: Clube = new Clube() ;
    public timeConvidado: Clube = new Clube();
   
    
    //1 -  mandante / 2 - visitante / 3 - mandante ou visitante
    public isMandante : string = "0";
    
    public ordenarPor: number = 0;
    public agruparPor: number = 0;
    
    public endereco : string;

    

}