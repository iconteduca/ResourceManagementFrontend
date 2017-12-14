import { RisorseOption } from './../classes/risorseOption';
import { ProgettiService } from "./progetti.service";
import { Component, ViewChild, Output, OnInit, OnChanges } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/components/modal/modal.component';
import { DialogFormProgettoComponent } from './dialog/dialog.form-progetto.component';
import { DialogFormAllocazioneComponent } from './dialog/dialog.form-allocazione.component';
import { DialogFormAllocazioneModComponent } from './dialog/dialog.form-allocazioneMod.component';
import { Observable } from 'rxjs/Observable';
import { RisorseService } from '../risorse/risorse.service';
import { Referenti } from '../classes/referenti';
import { Progetti } from '../classes/progetti';
import { ConfirmFormComponent } from './dialog/confirm.form.component';
import { AllocazioneService } from '../allocazione/allocazione.service';
import { RisorseProgettiModelView } from '../classes/risorseprogettiModelView';


@Component({
  moduleId: module.id,
  selector: 'progetti-cmp',
  templateUrl: './progetti.component.html',
})

export class ProgettiComponent implements OnInit, OnChanges {


  ngOnChanges(): void {
    this.onChangeTable(this.config);
  }


  @ViewChild('progettoModal') public progettoModal: DialogFormProgettoComponent;
  @ViewChild('allocazioneModal') public allocazioneModal: DialogFormAllocazioneComponent;
  @ViewChild('allocazioneModModal') public allocazioneModModal: DialogFormAllocazioneModComponent;
  @ViewChild('confirmModal') public confirmModal: ConfirmFormComponent;

  childTitle: string;
  idProgetto: number;
  msg: string;
  private data: Array<any>
  public rows: Observable<any>;
  public risorse:Observable<RisorseOption[]>;
  public risorseToModify:Observable<RisorseProgettiModelView[]>;
  loader: boolean = false
  idReferente : number;
  idServiceLine : string;
  constructor(private _risorseService: RisorseService, private _progettiService: ProgettiService, 
    private _allocazioneService: AllocazioneService) { };


  private columns: Array<any> = [
    { title: 'Nome Progetto ', name: 'nomeProgetto', filtering: { filterString: '', placeholder: 'Filtra per Progetto' } },
    { title: 'Project Manager', name: 'referente', filtering: { filterString: '', placeholder: 'Filtra per Project Manager' } },
    { title: 'Data Avvio', name: 'dataAvvioProgetto' },
    { title: 'Data Chiusura', name: 'dataChiusuraProgetto' },
    { title: 'Cliente', name: 'clienteDesc' },
    { title: 'Risorse Allocate', name: 'risorse' },
    { title: 'Note', name: 'note' },
    { title: '', name: 'addButton' },
    { title: '', name: 'modAllocazioneButton' },
    { title: '', name: 'updateButton' },
    { title: '', name: 'deleteButton' },
  ];
  public page: number = 1;
  public itemsPerPage: number = 10;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 0;
  selectedDocument: any;


  public config: any = {
    paging: false,
    sorting: { columns: this.columns },
    filtering: { filterString: '' },
    className: ['table', 'table-striped', 'table-bordered']
  };
  // Button
  private addButton(viewbutton: string) {
    viewbutton = `<button class='btn btn-success' (click)='showModalAddAllocazione()' title="Aggiungi allocazione"><i class='fa fa-fw fa fa-plus'></i><i class='fa fa-fw fa-user'></i></button>`;
    return viewbutton;
  };

  private modAllocazioneButton(viewbutton: string) {
    //<i class='fa fa-fw fa fa-minus'></i>
    viewbutton = `<button class='btn btn-success' (click)='showModalModAllocazione()' title="Gestisci allocazioni"><i class='fa fa-fw fa-user'></i></button>`;
    return viewbutton;
  };

  private updateButton(viewbutton: string) {
    //let viewbutton = `<button class='btn btn-success' (click)='showModalProgettoForUpdate(` + idprogetto + `)'><i class='fa fa-fw fa fa-plus'></i><i class='fa fa-fw fa-user'></i>Dettagli</button>`;
    viewbutton = `<button class='btn btn-success'><i class='fa fa-fw fa fa-pencil' title="Modifica progetto"></i></button>`;
    return viewbutton;
  };

  private deleteButton(viewbutton: string) {
    viewbutton = `<button class='btn btn-success'><i class='fa fa-fw fa fa-trash' title="Elimina progetto"></i></button>`;
    return viewbutton;
  };
  

  

  private extendData(partial: any) {
    // For every resulttable entry
    for (let i = 0; i < partial.length; i++) {
      // Add Button
      partial[i].addButton = this.addButton(partial[i].idprogetto);
      partial[i].modAllocazioneButton = this.modAllocazioneButton(partial[i].idprogetto);      
      partial[i].updateButton = this.updateButton(partial[i].idprogetto);
      partial[i].deleteButton = this.deleteButton(partial[i].idprogetto);    

    }
    return partial;
  };
  

  public showModalProgettoForUpdate(selectedDocument:any): void {
    this.childTitle = 'Aggiorna Progetto';
    this.progettoModal.showForUpdate(selectedDocument);

  }

  
  public showConfirmDelete(selectedDocument:any): void {
    this.childTitle = 'Cancellazione progetto';
    this.msg = 'Confermi di voler cancellare il progetto ' + selectedDocument.nomeProgetto + "?";
    this.idProgetto = selectedDocument.idprogetto;
    this.confirmModal.show(this);

  }


  public showModalProgetto(): void {
    this.childTitle = 'Nuovo Progetto';
    var idRef = sessionStorage.getItem("idRef");
    if (idRef==="null") {
      alert('Attenzione! Funzionalità prevista solo per i Project Manager');
    } else {
      this.progettoModal.show(this);
    }
    

  }

  public showModalAddAllocazione(idProgetto: number): void {
    this.loader = true;
    var idServiceLine = sessionStorage.getItem("idServiceLine");
    
    this._risorseService.getRisorseOptionByServiceLineOption(idServiceLine).subscribe(data => {
      this.risorse = data;
      this.idProgetto = idProgetto;
      this.childTitle = 'Aggiungi Allocazione';
      this.allocazioneModal.show(this);
      this.loader = false;
    })
  };

  public showModalModAllocazione(idProgetto: number): void {
    this.loader = true;
    this._allocazioneService.getRisorseByIdProject(idProgetto).subscribe(data => {
      this.risorseToModify = data;
      //this.risorse = data;
      this.idProgetto = idProgetto;
      this.childTitle = 'Modifica Allocazioni';
      this.allocazioneModModal.show(this);
      this.loader = false;
    })
  };

  public ngOnInit(): void {
    this.onChangeTable(this.config);
  }
  
  public changePage(page: any, data: Array<any> = this.data): Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous: any, current: any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }
  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item: any) => {
          return item[column.name].toLowerCase().indexOf(column.filtering.filterString) !== -1;
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item: any) =>
        item[config.filtering.columnName].toLowerCase().indexOf(this.config.filtering.filterString) !== -1);
    }

    let tempArray: Array<any> = [];
    filteredData.forEach((item: any) => {
      let flag = false;
      this.columns.forEach((column: any) => {
        if ((item[column.name] !== "addButton") && (item[column.name] !== undefined) && (item[column.name] !== null)) {
          if (item[column.name].toString().toLowerCase().indexOf(this.config.filtering.filterString) !== -1) {
            flag = true;
          }
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }



  public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }
    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    //this._progettiService.getProgetti()
    this.idReferente = +window.sessionStorage.getItem('idRef');
    this.idServiceLine = sessionStorage.getItem("idServiceLine");
    let idRef : string = sessionStorage.getItem("idRef");
    if (idRef==="null") {
      
      this._progettiService.getProgettiRefByServiceLineUrl(this.idServiceLine)
      .subscribe(progetti => {
        this.data = this.extendData(progetti);
        this.length = this.data.length;
        let filteredData = this.changeFilter(this.data, this.config);
        let sortedData = this.changeSort(filteredData, this.config);
        this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
        this.length = sortedData.length;
      }, error => console.error('Error'),
      () => console.log('Completed!')
      );
    } else {
      this._progettiService.getProgettiByRef(new Referenti(null, null, this.idReferente))
      .subscribe(progetti => {
        this.data = this.extendData(progetti);
        this.length = this.data.length;
        let filteredData = this.changeFilter(this.data, this.config);
        let sortedData = this.changeSort(filteredData, this.config);
        this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
        this.length = sortedData.length;
      }, error => console.error('Error'),
      () => console.log('Completed!')
      );
    }
    

    
  }



  public onCellClick(data: any): any {
    this.selectedDocument = data.row;
    let idProgetto = data.row.idprogetto;

    var idRef = sessionStorage.getItem("idRef");
    if (idRef==="null") {
      alert('Attenzione! Funzionalità prevista solo per i Project Manager');
    } else {

      // If Button View
      if (data.column == "addButton") {

        this.showModalAddAllocazione(idProgetto);
        console.log("ok");

      } else if (data.column == "modAllocazioneButton") {

        this.showModalModAllocazione(idProgetto);
        console.log("ok");

      } else if(data.column == "updateButton"){
        
        this.showModalProgettoForUpdate(this.selectedDocument);
        console.log("ok");

      } else if(data.column == "deleteButton"){

        this.showConfirmDelete(this.selectedDocument);
        console.log("ok");

      }
    }
      // Refresh Table
      this.onChangeTable(this.config, this.page);
    }


  onComponentChange(value: any) {
    this.ngOnInit();
  }

  refresh(){

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

}


