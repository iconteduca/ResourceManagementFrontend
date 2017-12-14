import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { HomeModule } from './home/home.module';
import { ProgettiModule } from './progetti/progetti.module';
import { DashboardComponent } from './dashboard.component';
import { TopNavComponent } from '../shared/index';
import { SidebarComponent } from '../shared/index';
import { RisorseModule } from './risorse/index';
import { SkillsModule } from './skills/index';
import { AllocazioneModule } from './allocazione/index';
import { DocumentiModule } from './documenti-utili/index';
import { FormazioneModule } from './formazione/index';



@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        DropdownModule,
        ModalModule,
        HomeModule,
        RisorseModule,
        AllocazioneModule,
        ProgettiModule,
        SkillsModule,
        DocumentiModule,
        FormazioneModule

    ],
    declarations: [DashboardComponent, TopNavComponent, SidebarComponent],
    exports: [DashboardComponent, TopNavComponent, SidebarComponent]
})

export class DashboardModule { }
