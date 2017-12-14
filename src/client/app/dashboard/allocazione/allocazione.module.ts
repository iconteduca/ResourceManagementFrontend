import { RisorseService } from './../risorse/risorse.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AllocazioneComponent } from './allocazione.component';
import { AllocazioneService } from './allocazione.service';
import { GanttModule } from './gantt/index';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { GanttComponent } from './gantt/gantt.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe'

@NgModule({
    imports: [RouterModule,GanttModule,HttpModule,FormsModule,CommonModule,Ng2SearchPipeModule,Ng2FilterPipeModule],
    declarations: [AllocazioneComponent],
    exports: [AllocazioneComponent,Ng2FilterPipeModule,Ng2SearchPipeModule],
    providers: [AllocazioneService,RisorseService],
    
})

export class AllocazioneModule { }
