import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CarouselModule, DropdownModule, AlertModule } from 'ng2-bootstrap/ng2-bootstrap';

import { TimelineComponent, ChatComponent, NotificationComponent } from './home.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [CommonModule, CarouselModule, DropdownModule, AlertModule, RouterModule],
    declarations: [HomeComponent, TimelineComponent, ChatComponent, NotificationComponent],
    exports: [HomeComponent, TimelineComponent, ChatComponent, NotificationComponent]
})

export class HomeModule { }
