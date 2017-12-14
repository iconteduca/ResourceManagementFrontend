import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { DocumentiComponent } from './documenti.component';
import { HttpModule } from '@angular/http';
import { DocumentiService } from './documenti.service';



@NgModule({
    imports: [RouterModule, Ng2TableModule, HttpModule,],
    declarations: [DocumentiComponent],
    exports: [DocumentiComponent],
    providers: [DocumentiService]
})

export class DocumentiModule { }
