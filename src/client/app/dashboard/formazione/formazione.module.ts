import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormazioneComponent } from './formazione.component';
import { FormazioneService } from './formazione.service';


@NgModule({
    imports: [RouterModule, HttpModule],
    declarations: [FormazioneComponent],
    exports: [FormazioneComponent],
    providers: [FormazioneService],
})

export class FormazioneModule { }
