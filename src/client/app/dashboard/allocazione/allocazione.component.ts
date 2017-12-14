import { Observable } from 'rxjs/Observable';
import { AllocazioneRoutes } from "./allocazione.routes";
import { Component, Input, Output, EventEmitter, Pipe, PipeTransform, ChangeDetectorRef, ApplicationRef, OnInit, OnChanges, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { Project, IGanttOptions, Zooming, Task } from './gantt/index';
import { AllocazioneService } from './allocazione.service';
import { AllocazionePipe } from './allocazione.pipe';
import { FormControl } from "@angular/forms";
import { Subscription } from "rxjs/Subscription";
import { RisorseService } from '../risorse/risorse.service';
import { Referenti } from '../classes/referenti';
import { GanttService } from './gantt/lib/shared/services/gantt.service';
import { GanttComponent } from './gantt/gantt.component';
import { loadTasks } from '../../../../../tools/utils/seed/tasks_tools';
import { GanttConfig } from './gantt/lib/shared/services/gantt-config.service';





@Component({
    moduleId: module.id,
    selector: 'allocazione-cmp',
    templateUrl: './allocazione.component.html',
    providers: [GanttComponent]
})

export class AllocazioneComponent implements OnInit {

    // Default options

    options: IGanttOptions = {
        scale: {
            start: new Date("October 1, 2017 00:00:00"),
            end: new Date("December 31, 2017 00:00:00")
        },
    };

    risorse: any;
    progetti: any;
    nomeRisorsa: string;
    project: Project;
    idReferente: string;
    idServiceLine: string;

    constructor(private ref: ChangeDetectorRef, private _allocazioneService: AllocazioneService, private _risorseService: RisorseService, private _gantt: GanttComponent, zone: NgZone) { }



    ngOnInit(): void {

        this.idReferente = window.sessionStorage.getItem('idRef');//

        if (this.idReferente === "null") {
            this.idServiceLine = window.sessionStorage.getItem('idServiceLine');

            this.getRisorseProgettiByServiceLine(this.idServiceLine);

        } else {
            this.getRisorseProgettiByRef(this.idReferente);

        }
        //    this.getRisorse();

    };


    getRisorse(): void {
        //      let idServiceLine: string = sessionStorage.getItem("idServiceLine");
        //      this._risorseService.getRisorseOptionByServiceLineOption(idServiceLine).subscribe(data => {
        //          this.risorse = data;
        //      }        
        //   )
        this.idReferente = window.sessionStorage.getItem('idRef');//        
        //     this.getRisorseProgettiByRef(new Referenti(null, null, +this.idReferente));//this.getRisorseProgetti();            
        this.getRisorseReferente(new Referenti(null, null, +this.idReferente));
        this.getProgettiAllocazione(new Referenti(null, null, +this.idReferente));
        // this.getFilteredProgettiXrisorsa(this.idReferente, null);
        // this.getFilteredProgettiXprogetto(this.idReferente, null);
    };


    getRisorseReferente(referente: Referenti): any {
        this._allocazioneService.getRisorseAllocate(referente).subscribe(data => {
            this.risorse = data;
        })
    };

    getProgettiAllocazione(referente: Referenti): void {
        this._allocazioneService.getProgettiAllocazione(referente).subscribe(dataproject => {
            this.progetti = dataproject;
        })
    };
    getRisorseProgetti(): void {
        this._allocazioneService.getRisorseProgetti().map(res => res).subscribe(heroes => {
            this.project = {
                'id': 'dd10f0b6-b8a4-4b2d-a7df-b2c3d63b4a01',
                'name': 'Service Line Application Management',
                'tasks': heroes
            };
        })
    }

    getRisorseProgettiByRef(idReferente: string): void {
        this._allocazioneService.getRisorseProgettiByRef(idReferente).subscribe(data => {
            this.project = {
                'id': 'dd10f0b6-b8a4-4b2d-a7df-b2c3d63b4a01',
                'name': 'Service Line Application Managment',
                'tasks': data
            };
        })
    }


    getRisorseProgettiByServiceLine(idServiceLine: string): any {
        return this._allocazioneService.getRisorseProgettiByServiceLine(idServiceLine).then(heroes => {
            this.project = {
                'id': 'dd10f0b6-b8a4-4b2d-a7df-b2c3d63b4a',
                'name': 'Service Line Application Managment',
                'tasks': heroes
            };
        })
    }

    getFilteredProgetti(d: string): void {
        this._allocazioneService.getFilteredRisorseProgetti(d).subscribe(heroes => {
            this.project = {
                'id': 'dd10f0b6-b8a4-4b2d-a7df-b2c3d63b4a0',
                'name': 'Service Line Application Management',
                'tasks': heroes
            };
        });

    }


    getFilteredProgettiXrisorsa(idReferente: string, d: string): any {
        return this._allocazioneService.getFilteredProgettiXrisorsa(idReferente, d).subscribe(heroes => {
            this.project = {
                'id': 'dd10f0b6-b8a4-4b2d-a7df-b2c3d63b4a02',
                'name': 'Service Line Application Managment',
                'tasks': heroes
            };
            this._gantt.ngOnChange(this.project);
        }
        );
    }


    getFilteredProgettiXprogetto(idReferente: string, d: string): void {
        this._allocazioneService.getFilteredProgettiXprogetto(idReferente, d).subscribe(heroes => {
            this.project.tasks = heroes

        });
    }





    selectRisora(risorsa: string) {
        let idRef = this.idReferente;
        this.getFilteredProgettiXrisorsa(idRef, risorsa);

    }


    selectProgetto(progetto: string) {
        let idRef = this.idReferente;
        this.getFilteredProgettiXprogetto(idRef, progetto);

    }

    refresh() {

        //private cRef: ChangeDetectorRef, private aRef:  ApplicationRef
        //this.changeFilter(this.data,this.config);
        window.location.reload();
        //this.ngOnInit();
        /*this.onChangeTable(this.config, this.page);
        this.aRef.tick();
        this.cRef.detectChanges();
        this.ngOnInit();
        this.onChangeTable(this.config, this.page);*/
    }




};


