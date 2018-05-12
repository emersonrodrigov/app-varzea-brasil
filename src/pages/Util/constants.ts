export enum Funcionalidade {
    TIME = 1,
    CONFRONTOS = 2,
    CONVITE = 3,
    MENSAGENS_TIME = 4,
    MENSAGENS_JOGADOR = 5,
    ELENCO = 6,
    PRODUTOS = 7,
    PATROCINADORES = 8,
    TORCEDOMETRO = 9,
    ESCALACAO = 10,
    LOGIN = 11,
}

export enum DiaSemana {
    DOMINGO = 0,
    SEGUNDA = 1,
    TERCA = 2,
    QUARTA = 3,
    QUINTA = 4,
    SEXTA = 5,
    SABADO = 6
}

export enum StatusConvite {
    AGUARDANDO = 1,
    ACEITAR = 2,
    RECUSAR = 3,
    CANCELAR = 4
}

export enum StatusConfronto {
    NAO_REALIZADO = 1,
    ANDAMENTO= 2,
    REALIZADO = 3, 
    CANCELADO  = 4
}



export class COLECAO_FIRESTORE {
    public static CLUBES: string = "CLUBES";
    public static JOGADORES: string = "JOGADORES";
    public static CONFRONTOS: string = "CONFRONTOS";
    public static MENSAGENS_TIME: string = "MENSAGENS_TIME";
    public static CONVITES_ENVIADOS: string = "CONVITES_ENVIADOS";
    public static CONVITES_RECEBIDOS: string = "CONVITES_RECEBIDOS";
    public static MENSAGENS_JOGADOR: string = "MENSAGENS_JOGADOR";
    public static PRODUTOS: string = "MENSAGENS_JOGADOR";
    public static PATROCINADORES: string = "PATROCINADORES";
    public static TORCEDOMETRO: string = "TORCEDOMETRO";
    public static ESCALACAO: string = "ESCALACAO";
    public static USUARIOS: string = "USUARIOS";
    public static CAMPEONATOS: string = "CAMPEONATOS";
    public static CAMPOS: string = "CAMPOS";

}



export class Util {

    public static keyUsuario: string = "usuario";
    public static keyTime: string = "time";
    public static keyJogador: string = "jogador";
    public static keytorcedo: string = "torcedor";
    public static keyPerfil: string = "perfil";
    public static keyParceiro: string = "parceiro";
    public static keyPatrocinio: string = "patrocinio";


    public static PERFIL_TIME: string = "TIME";
    public static PERFIL_JOGADOR: string = "JOGADOR";
    public static PERFIL_PATROCINADOR: string = "PATROCINADOR";
    public static PERFIL_TORCEDOR: string = "TORCEDOR";
    public static PERFIL_PARCEIRO: string = "PARCEIRO";

    //public static URL_REST = "http://nameless-fortress-79518.herokuapp.com/";

    public static URL_REST = "http://localhost:8080/varzea-brasil/"

}

export class TipoAcesso {

    public static CLUBE: string = "CLUBE";
    public static JOGADOR: string = "JOGADOR";
    public static PATROCINADOR: string = "PATROCINADOR";
    public static PARCEIRO: string = "PARCEIRO";
    public static TORCEDOR: string = "TORCEDOR";

}

export class StatusCampeonato {

    public static ABERTO: string = "ABERTO";
    public static INICIADO: string = "INICIADO";
    public static FINALIZADO: string = "FINALIZADO"; 

}


export class Constast {

    public static STR_POPUP_CARREGANDANDO = "Carregando...";
    public static STR_ERRO_COMUNICACAO = "Ocorreu um erro na comunicação, Tente Novamente !";

    public static MSG_GRAVADO_SUCESSO = "Cadastrado";
    public static MSG_ALTERADO_SUCESSO = "Alterado";
    public static MSG_EXCLUIDO_SUCESSO = "Excluido";
    public static MSG_CONFIRMA_EXCLUSAO = "Confirma Exclusão";

}




export class Guid {
    static id(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx.png'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }


    static idPastaTime(nomeTime: string): string {



        var id = 'xxxxxxxx-xxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });

        return nomeTime + "-" + id;
    }

    static idFotoJogador(nomePastaTime: string): string {
        var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx.png'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });

        return nomePastaTime + "/Jogadores/" + id;
    }


}