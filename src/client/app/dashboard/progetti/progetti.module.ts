import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { HttpModule } from '@angular/http';
import { ProgettiService } from './progetti.service';
import { ProgettiComponent } from './progetti.component';
import { CommonModule } from '@angular/common';
import { ModalModule, AlertModule } from 'ng2-bootstrap/ng2-bootstrap';
import { FormsModule } from '@angular/forms';
import { RisorseService } from '../risorse/risorse.service';
import { DialogFormAllocazioneComponent } from './dialog/dialog.form-allocazione.component';
import { DialogFormAllocazioneModComponent } from './dialog/dialog.form-allocazioneMod.component';
import { DialogFormProgettoComponent } from './dialog/dialog.form-progetto.component';
import { ConfirmFormComponent } from './dialog/confirm.form.component';


@NgModule({
    imports: [RouterModule, Ng2TableModule, HttpModule, CommonModule, ModalModule, FormsModule, AlertModule],
    declarations: [ProgettiComponent,DialogFormAllocazioneComponent, DialogFormAllocazioneModComponent,DialogFormProgettoComponent, ConfirmFormComponent],
    exports: [ProgettiComponent],
    providers: [ProgettiService,RisorseService]
})

export class ProgettiModule { }
