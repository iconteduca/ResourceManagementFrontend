import { Ng2TableModule } from 'ng2-table/ng2-table';
import { ModalComponent } from './table/modal.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RisorseComponent } from './risorse.component';
import { HttpModule } from '@angular/http';
import { RisorseService } from './risorse.service';
import { TableComponent } from './table/table.component';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';

@NgModule({
    imports: [RouterModule, HttpModule, ModalModule, Ng2TableModule],
    declarations: [RisorseComponent, TableComponent, ModalComponent ],
    providers: [RisorseService],
   })

export class RisorseModule { }
