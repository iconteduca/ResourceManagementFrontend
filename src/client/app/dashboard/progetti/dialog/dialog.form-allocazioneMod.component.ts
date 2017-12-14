import { ModalDirective } from 'ng2-bootstrap/components/modal/modal.component';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { RisorseService } from '../../risorse/risorse.service';
import { ProgettiService } from '../progetti.service';
import { RisorseProgettiModelView } from '../../classes/risorseprogettiModelView';
import { Observable } from 'rxjs/Observable';
import { ProgettiComponent } from '../progetti.component';


@Component({
    selector: 'dialog-allocazioneMod-cmp',
    template: `<div bsModal #allocazioneModModal="bs-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title pull-left">{{childTitle}}</h4>
                <button type="button" class="close pull-right" (click)="cancel()" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container">
                    <form (ngSubmit)="onSubmit()" #allocazioneModForm="ngForm">
                        <div class="row">
                            <div class="col-8">
                                <div class="form-group">
                                    <label for="idRisorsa" class="col-2 col-form-label">Nome Risorsa</label>
                                    <div class="col-8">
                                        <input class="form-control" type="text" [(ngModel)]="model.name" name="name" list="risorseToModify-list" placeholder="es. Asselti Maria" required (change)="selectRisora($event.target.value)">
                                        <datalist id="risorseToModify-list" >
                                                <option *ngFor="let risorsa of risorseToModify" [ngValue]="risorsa.id" >{{risorsa.name}}</option>
                                        </datalist>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="descrizioneAttivita" class="col-2 col-form-label">Descrizione Attività</label>
                                    <div class="col-8">
                                        <input class="form-control" type="text" [(ngModel)]="model.descrizioneAttivita" id="descrizioneAttivita" name="descrizioneAttivita" [value]="model.descrizioneAttivita" required >
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="percentualeImpiego" class="col-2 col-form-label">Percentuale allocazione</label>
                                    <div class="input-group col-8">
                                        <input class="form-control" type="number" [(ngModel)]="model.percentAllocation" id="percentAllocation" min="0" max="100" name="percentAllocation" [value]="model.percentAllocation" required>
                                        <span class="input-group-addon">%</span>
                                    </div>
                                </div>
                                <div class="form-group ">
                                    <label for="dataInizioAttivita" class="col-2 col-form-label">Data Inizio Allocazione</label>
                                    <div class="col-10">
                                        <input class="form-control" type="date" [(ngModel)]="model.start" (change)='checkDateInizio(model.start)'  id="start" name="start" [value]="model.start" required>
                                    </div>
                                       <span>{{dateInizioErrMessage}}</span>
                                </div>
                                <div class="form-group ">
                                    <label for="dataFineAttivita" class="col-2 col-form-label">Data Fine Allocazione</label>
                                    <div class="col-10">
                                        <input class="form-control" type="date" [(ngModel)]="model.end" (change)='checkDateFine(model.start,model.end)' id="end" name="end" [value]="model.end" required>
                                    </div>
                                    <span>{{dateFineErrMessage}}</span>
                                </div>
                                <div class="form-group">
                                    <label for="note" class="col-2 col-form-label">Note</label>
                                    <div class="col-8">
                                        <input class="form-control" type="text" [(ngModel)]="model.note" id="note" name="note" [value]="model.note">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer"><div class="row">
                                <div class="col-8">
                                    <div [ngClass]="checkAllocation()">
                                    <span>{{errMessage}}</span>
                                    </div>
                                </div>
                            </div>
                            <input type="hidden" [(ngModel)]="model.id" id="id" name="id" [value]="model.id">           
                            <button type="submit" class="btn btn-primary" data-dismiss="allocazioneModal">Salva</button>
                            <button type="input" class="btn btn-primary" data-dismiss="allocazioneModal" (click)="rimuoviRisorsaProgetto()">Rimuovi</button>
                            <button type="cancel" class="btn btn-primary" (click)="cancel()">Annulla</button>
                         </div>
                    </form>
                </div>
              
            </div>
        </div>
    </div>
</div>
 `,
})

export class DialogFormAllocazioneModComponent {

  

    @ViewChild('allocazioneModModal') public allocazioneModModal: ModalDirective;
    @Input() childTitle: string;
    @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() idProgetto: number;
    @Input() risorseToModify: Observable<RisorseProgettiModelView[]>;
    body: string;
    errMessage: string;
    dateInizioErrMessage: string;
    dateFineErrMessage: string;
    serverResponse: any;
    chiamante: ProgettiComponent;
    submitted = false;

    /*descrizioneAttivita: string;
    percentAllocation: string;
    start: string;
    end: string;
    note: string;
    id: string;*/
    
    model = new RisorseProgettiModelView(null, null, null, null, null, null, null);

    constructor(private _progettiService: ProgettiService) { };

    init(){
    }

    show(chiamante:ProgettiComponent) {
        this.init();
        this.chiamante = chiamante;
        this.allocazioneModModal.show();
    }

    cancel() {

        this.model = new RisorseProgettiModelView(null, null, null, null, null, null, null);
        this.allocazioneModModal.hide();
    }

    onSelect(idRisorsaProgetto: string) {
        //this.model = this.searchRisora(idRisorsaProgetto);
    }

    selectRisora(risorsa: string) {
        let arr = this.risorseToModify;
        for(var ii=0;ii < arr.length; ii++){
           if(arr[ii].name == risorsa){
               this.model = arr[ii];
               this.model.start = arr[ii].start.substring(0,10);
               this.model.end = arr[ii].end.substring(0,10);
               break;
           }
        }
        if(this.model.idRisorsa != null){
            this.errMessage = '';
        }else{
            this.errMessage = 'Attenzione risorsa non trovata.';
        }
    }

    onSubmit() {

        console.log(this.model);
        this.model.autore = "";
        let nominativo = this.model.name;
        this.model.idProgetto = this.idProgetto;
        if(this.model.idRisorsa != null){
            this._progettiService.updateRisorsaProgetto(this.model)
                .subscribe(data => {
                    this.serverResponse = JSON.parse(JSON.stringify(data));
                    this.body = this.serverResponse['_body']
                    if (this.body === '0')
                        this.errMessage = 'Allocazione effettuata con successo'
                    else if (this.serverResponse['_body'] === '1')
                        this.errMessage = "Impossibile allocare la risorse per il periodo indicato, verificare percentuale allocazione"
                }, error => {
                    console.log(JSON.stringify(error.json()));
                })
            console.log(this.serverResponse)
            this.submitted = true;
            this.chiamante.refresh();
            this.allocazioneModModal.hide();
        } else {
            this.errMessage = 'Attenzione risorsa non trovata.';
        }
    };

    checkDateFine(startDate: Date, endDate: Date): any {
        var curDate = new Date();
        if (new Date(startDate) < curDate) {
            this.dateFineErrMessage = 'La data fine progetto deve essere uguale o successiva alla data odierna.';
            return false;
        } else if (new Date(startDate) > new Date(endDate)) {
            this.dateFineErrMessage = 'La data fine progetto deve essere successiva rispetto alla data di inizio.';
            return false;
        } else {
            this.dateFineErrMessage = '';
            return false;
        }
    }

    checkDateInizio(startDate: Date, endDate: Date): any {
        var curDate = new Date();
        if (new Date(startDate) < curDate) {
            this.dateInizioErrMessage = 'La data inizio progetto deve essere uguale o successiva alla data odierna.';
            return false;
        } else {
            this.dateInizioErrMessage = '';
            return false;
        };
    }



    checkAllocation() {
        if (this.body === '1')
            return "alert alert-danger fade in"
        else
            return "success alert-success fade in"
    }

    rimuoviRisorsaProgetto(){
        let idRisorsaProgetto = this.model.id;
        this._progettiService.deleteRisorsaProgetto(+idRisorsaProgetto).subscribe();
        this.allocazioneModModal.hide();
    }

}


