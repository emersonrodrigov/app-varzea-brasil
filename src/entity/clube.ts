import { Jogador } from './jogador';
import { Campo } from './campo';


export class Clube{

    // dados do time
    public codigo: string='';
    public nome: string='';
	public dataFundacao : Date;

	// Endereco
	public cep : string='';
	public endereco : string='';
	public bairro : string=''; // novo
	public cidade : string=''; // novo
	public estado : string=''; // novo 
	public regiao : string=''; // novo
	public categoria : string='';

	 
 
	public imgEscudo: string='';
	public imgMascote : string='';
  

	public flgVerCaixa : number;
	public flgVerMensalidade : number;
	public flgVerArtilharia: number;

	public telefone1 : string='';
	public telefone2 : string='';
	public cor : string='';

	// mandnnte / visitante / mandante ou visitante
	public flgMandante : number;
	// colocar um enum (campo / futsal/society)
	public tipo : number;
	// no lugar campo horario
	public horaInicioJogo : string='';

	public horaFimJogo : string='';

	public diaJogo :  string='';

	public usuario : string='';

	public password : string='';

	public idCampo : string='';

	//public campo : Campo[] = new Array();

	public campo: any = Object.assign({}, new Campo()); 

	public pastaTime : string='';;

	public jogadores: Jogador[] = new Array();


	public isCadastroFinalizado:boolean  = false;

	public isDoisQuadro: boolean = false;

	public valorAmistoso:string = '';

	public valorFestival: string = '';



	/**dados de controle de convite **/

	//data que foi feito o convite
	public dataPartidaConvite : Date ;
	
	//codigo identificado do convite
	public codigoConvite : string = "";

	//flag para saber se é mandante ou visitante no momento do convite
	// 1- mandante 2-visitantes
	public flgMandanteConvite:string="";

	// status do convite
	// 2 - aceitar / 3 - recusar / 4 - cancelar / 1 - aguardando
	public statusConvite: string="";


	public motivoCancelamento: string = "";


}