export class RisorseProgetti {
    constructor(

        public idProgetto: number,
        public descrizioneAttivita: string,
        public dataInizioAttivita: Date,
        public dataFineAttivita: Date,
        public percentualeImpiego: number,
        public idRisorsa?: number,
        public nomeRisorsa?: string,
        public tipoAttivita?: string,
        public note?: string,
        public dataInizio?: Date,
        public autore?: string,
    ) { };
}