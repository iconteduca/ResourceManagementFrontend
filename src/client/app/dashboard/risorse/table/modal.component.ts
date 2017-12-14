import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';

import { ModalDirective } from 'ng2-bootstrap/components/modal/modal.component';

@Component({
	moduleId: module.id,
    selector: 'modal-component',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template:`<div bsModal #lgModal="bs-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" (click)="lgModal.hide()" aria-label="Close">
			                    <span aria-hidden="true">&times;</span>
			                </button>

            </div>

            <div class="modal-body">

                <div class="row">
                    <div class="col-md-4 col-md-offset-4">
                        <form class="form-horizontal" role="form">
                            <fieldset>

                                <!-- Form Name -->
                                <legend>Dettaglio Risorsa</legend>

                                <!-- Text input-->
                                <div class="form-group">
                                    <label class="col-sm-2 control-label" for="textinput">Nome:</label>
                                    <div class="col-sm-10">
                                        <div>{{risorsa.nome}}</div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label" for="textinput">Cognome:</label>
                                    <div class="col-sm-10">
                                        <div>{{risorsa.cognome}}</div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label" for="textinput">Sede:</label>
                                    <div class="col-sm-10">
                                        <div>{{risorsa.sede}}</div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label" for="textinput">Telefono:</label>
                                    <div class="col-sm-10">
                                        <div>{{risorsa.telefono}}</div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label" for="textinput">Profilo di costo:</label>
                                    <div class="col-sm-10">
                                        <div>{{risorsa.nome}}</div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label" for="textinput">E-mail:</label>
                                    <div class="col-sm-10">
                                        <div>{{risorsa.email}}</div>
                                    </div>
                                </div>


                            </fieldset>
                        </form>
                    </div>
                    <!-- /.col-lg-12 -->
                </div>
                <!-- /.row -->
            </div>
        </div>
    </div>
</div>`,
    styles: [`
    	.tooltip.customClass .tooltip-inner {
    		color: #880000;
    		background-color: #ffff66;
    		box-shadow: 0 6px 12px rgba(0,0,0,.175);
    	}
    	.tooltip.customClass .tooltip-arrow {
    		display: none;
    	}
    `]
})

export class ModalComponent { 
    
}


