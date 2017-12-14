export class Progetti {
    
    constructor(
        public idprogetto: number,
        public nome_progetto: string,
        public referente: string,
        public idReferente: number,
        public data_avvio_progetto: Date,
        public data_chiusura_progetto: Date,
        public data_inizio:Date,
        public autore:string,
        public autore_modifica?:string,
        public cliente_desc?: string,
        public datdata_fine?:Date,
        public risorse?: Array<string>,
        public note?: string,
    ) { };
}