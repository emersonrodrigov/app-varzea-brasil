import { Clube } from './clube';

export class Confronto {


	// veirifa se sera necessario criar um objeto jogo
	public codigo: string = '';
	public data: Date;
	public horarioInicio: string = '';
	public horarioFim: string = '';
	// public campo: Campo = new Campo();



	// public dadosPartida = Object.assign({},new JogadorPartidaImp());
	campo = {
		codigo: '',
		nome: '',
		cep: '',
		endereco: '',
		bairro: '',
		cidade: '',
		estado: '',
		imgCampo: '',
		tipo: '', // tipo do campo (campo / futsal / society)
		latitude: '',
		longitude: ''
	};


	public resultadoMandante: number;
	public resultadoVisitante: number;
	public resultadoMandante2: number;
	public resultadoVisitante2: number;
	public realizado: boolean;
	public cancelado: boolean;
	// public jogo: Jogo;
	public clubeMandante: any = Object.assign({}, new Clube());
	public clubeVisitante: any = Object.assign({}, new Clube()); 


	public confirmaResultMandante = false;
	public confirmaResultVisitante = false;

	public confirmaAvaliacaotMandante = false;
	public confirmaAvaliacaoVisitante = false;

	constructor(){

	}



}