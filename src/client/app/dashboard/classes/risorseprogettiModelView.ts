export class RisorseProgettiModelView {
    constructor(

        public id: string,
        public idProgetto: number,
        public descrizioneAttivita: string,
        public start: Date,
        public end: Date,
        public percentAllocation: number,
        public name: string,
        public idRisorsa?: number,
        public nomeRisorsa?: string,
        public cognomeRisorsa?: string,
        public tipoAttivita?: string,
        public note?: string,
        public dataInizio?: Date,
        public autore?: string

    ) { };
}