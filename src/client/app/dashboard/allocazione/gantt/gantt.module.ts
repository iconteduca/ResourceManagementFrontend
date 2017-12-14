import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GanttComponent } from './gantt.component';
import { GanttHeaderComponent } from './lib/header/gantt-header.component';
import { GanttFooterComponent } from './lib/footer/gantt-footer.component';
import { GanttService } from './lib/shared/services/gantt.service';
import { GanttActivityModule } from './lib/activity/gantt-activity.module';

import { GroupByPipe } from './lib/shared/pipes/groupBy.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        GanttActivityModule,
        Ng2SearchPipeModule,Ng2FilterPipeModule
    ],
    exports: [
        GanttComponent, Ng2SearchPipeModule,Ng2FilterPipeModule
    ],
    declarations: [
        GanttComponent,
        GanttHeaderComponent,
        GanttFooterComponent,  
        GroupByPipe ,
             
    ],
    providers: [GanttService],
})
export class GanttModule { }