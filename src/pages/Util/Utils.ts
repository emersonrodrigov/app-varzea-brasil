
import { DiaSemana } from './../Util/constants';

export class Utils {
    
        /*  

        */
     static getDiaSemana(data?:Date):number{

       let date:Date = new Date();
       date.setFullYear(parseInt(data.toString().split('-')[0]));
       date.setMonth(parseInt(data.toString().split('-')[1])-1)
       date.setDate(parseInt(data.toString().split('-')[2]));
                                             

          let dia:number=  date.getDay();
          
            if(dia==0){
                return DiaSemana.DOMINGO;
            }else if(dia==1){
                return DiaSemana.SEGUNDA;
            }else if(dia==2){
                return DiaSemana.TERCA;
            }else if(dia==3){
                return DiaSemana.QUARTA;
            }else if(dia==4){
                return DiaSemana.QUINTA;
            }else if(dia==5){
                return DiaSemana.SEXTA;
            }else if(dia==6){
                return DiaSemana.SABADO;
            }
    }


    static getCodDiaSemana(dia:string){
        if(dia.toUpperCase().indexOf('SEG')!= -1){
                return DiaSemana.SEGUNDA;
            }else if(dia.toUpperCase().indexOf('TER')!= -1){
                return DiaSemana.TERCA;
            }else if(dia.toUpperCase().indexOf('QUA')!= -1){
                return DiaSemana.QUARTA;
            }else if(dia.toUpperCase().indexOf('QUI')!= -1){
                return DiaSemana.QUINTA;
            }else if(dia.toUpperCase().indexOf('SEX')!= -1){
                return DiaSemana.SEXTA;
            }else if(dia.toUpperCase().indexOf('SAB')!= -1){
                return DiaSemana.SABADO;
            }else if(dia.toUpperCase().indexOf('DOM')!= -1){
                return DiaSemana.DOMINGO;
            }
    }


    static  getDateFirestore(data:Date):Date{
         let arrayDatePartida:string[] = new String(data).split("-");
        let dataConvertida:Date = new Date( Number(arrayDatePartida[0]), Number(arrayDatePartida[1])-1,Number(arrayDatePartida[2]))
        dataConvertida.setMinutes(0,0,0)
          dataConvertida.setHours(0,0,0)
        return dataConvertida;
    }

    static  getDateOfString(data:string):Date{
         let arrayDatePartida:string[] = new String(data).split("-");
        let dataConvertida:Date = new Date( Number(arrayDatePartida[0]), Number(arrayDatePartida[1])-1,Number(arrayDatePartida[2]))
        dataConvertida.setMinutes(0,0,0)
          dataConvertida.setHours(0,0,0)
        return dataConvertida;
    }

    static getDateAtual():Date{
        let dataAtual:Date =  new Date();
        dataAtual.setMinutes(0,0,0)
          dataAtual.setHours(0,0,0)

          return dataAtual;
    }

    static getHoraAtual():string{
        return new Date().toLocaleTimeString().substring(0,5)
    }
 

    public static n: any;
    public static len: any;

  static formataValor(v): string {
    if (v) {
      this.n = v[v.length - 1];
      if (isNaN(this.n)) {
        v = v.substring(0, v.length - 1);
        return v;
      }
      v = this.fixAmount(v);
      return v;
    }
  }

  static  fixAmount(a): string {
    let period = a.indexOf(".");
    if (period > -1) {
      a = a.substring(0, period) + a.substring(period + 1);
    }
    this.len = a.length;
    while (this.len < 3) {
      a = "0" + a;
      this.len = a.length;
    }
    a = a.substring(0, this.len - 2) + "." + a.substring(this.len - 2, this.len);
    while (a.length > 4 && (a[0] == '0')) {
      a = a.substring(1)
    }
    if (a[0] == ".") {
      a = "0" + a;
    }
    return (a);
  }



}