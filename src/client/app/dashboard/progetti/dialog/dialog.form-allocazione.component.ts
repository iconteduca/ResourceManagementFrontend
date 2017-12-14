import { ModalDirective } from 'ng2-bootstrap/components/modal/modal.component';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { RisorseService } from '../../risorse/risorse.service';
import { ProgettiService } from '../progetti.service';
import { RisorseOption } from '../../classes/risorseOption';
import { RisorseProgetti } from '../../classes/risorseprogetti';
import { Observable } from 'rxjs/Observable';
import { ProgettiComponent } from '../progetti.component';
import { RisorseProgettiModelView } from '../../classes/risorseprogettiModelView';


@Component({
    selector: 'dialog-allocazione-cmp',
    template: `<div bsModal #allocazioneModal="bs-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
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
                    <form (ngSubmit)="onSubmit()" #allocazioneForm="ngForm">
                        <div class="row">
                            <div class="col-8">
                                <div class="form-group">
                                    <label for="idRisorsa" class="col-2 col-form-label">Nome Risorsa</label>
                                    <div class="col-8">
                                        <input class="form-control" type="text" [(ngModel)]="model.name" name="name" list="risorse-list" placeholder="es. Asselti Maria" (change)='selectRisora($event.target.value)' required>
                                        <datalist id="risorse-list">
                                                <option *ngFor="let risorsa of risorse" [ngValue]="risorsa">{{risorsa.nomeRisorsa}}</option>
                                        </datalist>
                                    </div> 
                                </div>
                                <div class="form-group">
                                    <label for="descrizioneAttivita" class="col-2 col-form-label">Descrizione Attività</label>
                                    <div class="col-8">
                                        <input class="form-control" type="text" [(ngModel)]="model.descrizioneAttivita" id="descrizioneAttivita" name="descrizioneAttivita" required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="percentualeImpiego" class="col-2 col-form-label">Percentuale allocazione</label>
                                    <div class="input-group col-8">
                                        <input class="form-control" type="number" [(ngModel)]="model.percentAllocation" id="percentAllocation" min="0" max="100" name="percentAllocation" required>
                                        <span class="input-group-addon">%</span>
                                    </div>
                                </div>
                                <div class="form-group ">
                                    <label for="dataInizioAttivita" class="col-2 col-form-label">Data Inizio Allocazione</label>
                                    <div class="col-10">
                                        <input class="form-control" type="date" [(ngModel)]="model.start" (change)='checkDateInizio(model.start)'  id="start" name="start" required>
                                    </div>
                                       <span>{{dateInizioErrMessage}}</span>
                                </div>
                                <div class="form-group ">
                                    <label for="dataFineAttivita" class="col-2 col-form-label">Data Fine Allocazione</label>
                                    <div class="col-10">
                                        <input class="form-control" type="date" [(ngModel)]="model.end" (change)='checkDateFine(model.start,model.end)' id="end" name="end" required>
                                    </div>
                                    <span>{{dateFineErrMessage}}</span>
                                </div>
                                <div class="form-group">
                                    <label for="note" class="col-2 col-form-label">Note</label>
                                    <div class="col-8">
                                        <input class="form-control" type="text" [(ngModel)]="model.note" id="note" name="note">
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
                                  
                            <input type="hidden" [(ngModel)]="model.idRisorsa" id="idRisorsa" name="idRisorsa" [value]="model.idRisorsa"> 
                            <button type="submit" class="btn btn-primary" [disabled]="!allocazioneForm.form.valid" data-dismiss="allocazioneModal">Salva</button>
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

export class DialogFormAllocazioneComponent {
    body: string;

    @ViewChild('allocazioneModal') public allocazioneModal: ModalDirective;
    @Input() childTitle: string;
    @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() idProgetto: number;
    @Input() risorse: Observable<RisorseOption[]>;
    errMessage: string;
    dateInizioErrMessage: string;
    dateFineErrMessage: string;
    serverResponse: any;
    chiamante: ProgettiComponent;
    idRisorsa: number;

    constructor(private _progettiService: ProgettiService) { };


    show(chiamante:ProgettiComponent) {
        this.chiamante = chiamante;
        this.allocazioneModal.show();
    }

    submitted = false;

    model = new RisorseProgettiModelView(null, null, null, null, null, null, null);

    cancel() {

        this.model = new RisorseProgettiModelView(null, null, null, null, null, null, null);
        this.allocazioneModal.hide();
    }

    selectRisora(risorsa: string) {
        let arr = this.risorse;
        for(var ii=0;ii < arr.length; ii++){
           if(arr[ii].nomeRisorsa == risorsa){
               this.model.idRisorsa = arr[ii].idRisorsa;
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
        let nominativo = this.model.nomeRisorsa
        this.model.idProgetto = this.idProgetto;
       
        if(this.model.idRisorsa != null){
            //this.model.idRisorsa = this.idRisorsa;
            this._progettiService.insertRisorsaProgetto(this.model)
                .subscribe(data => {
                    this.submitted = true;
                    this.chiamante.refresh();
                    this.allocazioneModal.hide();
                    /*this.serverResponse = JSON.parse(JSON.stringify(data));
                    this.body = this.serverResponse['_body']
                    if (this.body === '0') {
                        this.errMessage = "Allocata la risorsa correttamente"
                    }    
                    else if (this.serverResponse['_body'] === '1') {
                        this.esito = 0;
                        this.errMessage = "Impossibile allocare la risorse per il periodo indicato, verificare percentuale allocazione"
                    } */   
                }, error => {
                    //this.errMessage = "Impossibile allocare la risorse per il periodo indicato, verificare percentuale allocazione"
                    alert(this.errMessage);
                })
            console.log(this.serverResponse);
           /* this.submitted = true;
            this.chiamante.refresh();
            this.allocazioneModal.hide();*/  
            
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



}


