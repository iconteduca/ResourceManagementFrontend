import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GanttActivityComponent } from './gantt-activity.component';
import { GanttTimeScaleComponent } from './time-scale/gantt-time-scale.component';
import { GanttActivityBackgroundComponent } from './background/activity-background.component';
import { GanttActivityBarsComponent } from './bars/activity-bars.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';

@NgModule({
    imports: [
        CommonModule, FormsModule, Ng2SearchPipeModule, Ng2FilterPipeModule
    ],
    exports: [
        GanttActivityComponent,
        GanttTimeScaleComponent,
        GanttActivityBackgroundComponent,
        GanttActivityBarsComponent,
        Ng2SearchPipeModule, Ng2FilterPipeModule
    ],
    declarations: [
        GanttActivityComponent,
        GanttTimeScaleComponent,
        GanttActivityBackgroundComponent,
        GanttActivityBarsComponent,
        ///TreeBuilder, TreeParentRepeater, TreeChildrenRepeater,
    ],
    providers: [],
})
export class GanttActivityModule { }
