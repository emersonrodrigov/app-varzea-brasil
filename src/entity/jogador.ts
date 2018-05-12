import { Clube } from './clube';
export class Jogador {

    public codigo: string;
    public nome: string;
    public apelido: string;
    public imgFoto: string;
    public email: string;
    public telefone1: string;
    public telefone2: string;
    //public usuario : Usuario  = new Usuario();
    public senha: string;
    public camisa: string;
    public posicao: string;
    public time : Clube[] = new Array(); 
    public codigoAcesso: string;
    public isAcesso: string;
    public isLogin : boolean =  false; 
    public ordem:number;

   
// public dadosPartida = Object.assign({},new JogadorPartidaImp());
    dadosPartida = {
        cartaoAmarelo: "",
    cartaoVermelho: "",
    confirmaPresenca: "",
    motivoAusencia: "",
    isTitular: "",
    isMelhorJogador: "",
    pontuacaoPartida: "",
    gol: ""
}; 
    
}