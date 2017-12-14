import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { HttpModule } from '@angular/http';
import { SkillsComponent } from './skills.component';
import { SkillsService } from "./skills.service";

@NgModule({
    imports: [RouterModule, Ng2TableModule, HttpModule],
    declarations: [SkillsComponent],
    exports: [SkillsComponent],
    providers: [SkillsService]
})

export class SkillsModule { }
