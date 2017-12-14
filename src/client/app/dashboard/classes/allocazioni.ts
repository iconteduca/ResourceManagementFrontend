export class Allocazioni {
    constructor(
        public progetto: string,
        public pm: string,
        public inizio: Date,
        public fine: Date,
        public cliente: string,
        public risorse: Array<string>,
        public note: string,
    ) { };
}

