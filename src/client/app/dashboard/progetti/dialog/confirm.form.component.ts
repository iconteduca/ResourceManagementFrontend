import { ModalDirective } from 'ng2-bootstrap/components/modal/modal.component';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { RisorseService } from '../../risorse/risorse.service';
import { ProgettiService } from '../progetti.service';
import { RisorseOption } from '../../classes/risorseOption';
import { RisorseProgetti } from '../../classes/risorseprogetti';
import { Observable } from 'rxjs/Observable';
import { Progetti } from '../../classes/progetti';
import { ProgettiComponent } from '../progetti.component';


@Component({
    selector: 'confirm-form-cmp',
    template: 
    `<div bsModal #confirmModal="bs-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title pull-left">{{childTitle}}</h5>
                    <button type="button" class="close pull-right" (click)="cancel()" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="container">
                        <form (ngSubmit)="onSubmit()">
                            <div class="row">
                                <div class="col-8">
                                    <label class="col-2 col-form-label">{{msg}}</label>
                                </div>
                            </div>
                            <div class="modal-footer">                              
                                <button type="submit" class="btn btn-primary" data-dismiss="confirmModal">Conferma</button>
                                <button type="button" class="btn btn-primary" (click)="cancel()">Annulla</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
 `,

})

export class ConfirmFormComponent {
    body: string;


    @ViewChild('confirmModal') public confirmModal: ModalDirective;
    @Input() childTitle: string;
    @Input() msg: string;
    @Input() idProgetto: number;    
    @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();

    errMessage: string;
    serverResponse: any;
    submitted = false;
    chiamante: ProgettiComponent;

    constructor(private _progettiService: ProgettiService) { };


    show(chiamante: ProgettiComponent) {
        this.chiamante = chiamante;
        this.confirmModal.show();
    }

    

    cancel() {
        this.confirmModal.hide();
    }

    onSubmit() {

        let progetto = new  Progetti(this.idProgetto, null, null, null, null, null, null, null);
        this._progettiService.deleteProgetto(progetto).subscribe();
        this.submitted = true;
        this.chiamante.refresh();
        this.confirmModal.hide();
        
    };


}


