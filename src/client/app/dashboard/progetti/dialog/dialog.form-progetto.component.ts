import { ModalDirective } from 'ng2-bootstrap/components/modal/modal.component';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ProgettiService } from '../progetti.service';
import { Progetti } from '../../classes/progetti';
import { Referenti } from '../../classes/referenti';
import { ProgettiComponent } from '../progetti.component';


@Component({
    selector: 'dialog-progetto-cmp',
    template: `<div bsModal #progettoModal="bs-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" (notify)='onNotifyProgetto($event)'>
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
                    <form (ngSubmit)="onSubmit()" #progettoForm="ngForm">
                        <div class="row">
                            <div class="col-8">
                                <div class="form-group">
                                    <label for="progetto" class="col-2 col-form-label">ID Progetto</label>
                                    <div class="col-8">
                                        <input [(ngModel)]="model.idprogetto" class="form-control" type="text" id="id" name="id" readonly>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="progetto" class="col-2 col-form-label">Nome Progetto</label>
                                    <div class="col-8">
                                        <input [(ngModel)]="model.nome_progetto" class="form-control" type="text" id="progetto" name="progetto" required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="pm" class="col-2 col-form-label">Project Manager</label>
                                    <div class="col-8">
                                        <input class="form-control" [(ngModel)]="model.referente" type="text" id="pm" name="pm" required disabled>
                                    </div>
                                </div>
                                <div class="form-group ">
                                    <label for="inizio" class="col-2 col-form-label">Data Inizio Progetto</label>
                                    <div class="col-10">
                                        <input class="form-control" [(ngModel)]="model.data_avvio_progetto" (change)='checkDateInizio(model.dataAvvioProgetto)' type="date" id="inizio" name="dataAvvioProgetto" required>
                                    </div>
                                    <span>{{dateInizioErrMessage}}</span>
                                </div>
                                <div class="form-group">
                                    <label for="fine" class="col-2 col-form-label">Data Fine Progetto</label>
                                    <div class="col-10">
                                        <input class="form-control" [(ngModel)]="model.data_chiusura_progetto" (change)='checkDateFine(model.dataAvvioProgetto,model.dataChiusuraProgetto)' type="date" id="fine" name="dataChiusuraProgetto" required>
                                    </div>
                                    <span>{{dateFineErrMessage}}</span>
                                </div>
                                <div class="form-group">
                                    <label for="cliente" class="col-2 col-form-label">Cliente</label>
                                    <div class="col-8">
                                        <input class="form-control" [(ngModel)]="model.cliente_desc" type="text" id="cliente" name="cliente" required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="note" class="col-2 col-form-label">Note</label>
                                    <div class="col-8">
                                        <input class="form-control" [(ngModel)]="model.note" type="text" id="note" name="note">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-primary" [disabled]="!progettoForm.form.valid">Salva</button>
                            <button type="cancel" class="btn btn-primary" (click)="cancel()">Annulla</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>`,

})

export class DialogFormProgettoComponent {


    @ViewChild('progettoModal') public progettoModal: ModalDirective;
    @Input() childTitle: string;
    @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() outputEvent: EventEmitter<any> = new EventEmitter<any>();
    constructor(private _progettiService: ProgettiService) { };

    dateInizioErrMessage: string = "";
    dateFineErrMessage: string = "";
    sessionStorage = window.sessionStorage;
    referente = sessionStorage.getItem("nomeRef") + " " +sessionStorage.getItem("cognomeRef");
    submitted = false;
    model = new Progetti(null, '', this.referente, null, new Date(), new Date(), new Date, '');
    value: any;
    chiamante: ProgettiComponent;

    show(chiamante:ProgettiComponent) {
        this.chiamante = chiamante;
        this.progettoModal.show();        
    }

    showForUpdate(selectedDocument: any) {
        let idprogetto = selectedDocument.idprogetto;
        let nome_progetto = selectedDocument.nomeProgetto;
        let referente = selectedDocument.referente;
        let idReferente = selectedDocument.idRef;
        let data_avvio_progetto = selectedDocument.dataAvvioProgetto;
        let data_chiusura_progetto = selectedDocument.dataChiusuraProgetto;
        let data_inizio: any;//selectedDocument.nomeProgetto;
        let datdata_fine: any;//selectedDocument.nomeProgetto;
        let autore = '';//selectedDocument.nomeProgetto;
        let autore_modifica = '';//selectedDocument.autore;
        let cliente_desc = selectedDocument.clienteDesc;        
        let risorse: any;//selectedDocument.nomeProgetto;
        let note = selectedDocument.note;  
        let progetto = new  Progetti(idprogetto, nome_progetto,referente, idReferente,data_avvio_progetto,
            data_chiusura_progetto, data_inizio, autore, autore_modifica, cliente_desc, datdata_fine, risorse, note);
        this.model = progetto;      
        this.progettoModal.show();
    }

    onSubmit() {
        console.log(this.model);
        
        let nome : string = this.sessionStorage.getItem('nomeRef');
        let cognome : string =  this.sessionStorage.getItem('cognomeRef');
        this.model.autore = nome + cognome;
        this.model.idReferente = +this.sessionStorage.getItem("idRef");
        if(this.model.idprogetto == null){
            this._progettiService.saveProgetto(this.model)
                .subscribe(data => {
                    alert('ok');
                }, error => {
                    console.log(error);
                });
        } else {
            this._progettiService.updateProgetto(this.model)
            .subscribe(data => {
                
            }, error => {
                console.log(error);
            });
        }
        this.submitted = true;
        this.progettoModal.hide();
        this.model = new Progetti(null, '', '', null, new Date(), new Date(), new Date, '');
        this.chiamante.refresh();
        this.outputEvent.emit(this.value);
         
    }


    cancel() {
        this.model = new Progetti(null, '', '', null, new Date(), new Date(), new Date, '');
        this.progettoModal.hide();
    }

    // TODO: Remove this when we're done
    get diagnostic() { return JSON.stringify('ciao'); }


    onNotifyProgetto(newProgetto: boolean): void {
    }


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


}