import { Referenti } from "./index";

export class Utenti {
    
    constructor(       
        public username:string,
        public password:string,
        public id?: number,
        public nome?: string,
        public cognome?: string,
        public id_service_line? : number,
        public type? : string,
        public id_referente?: number
    ) { };
}