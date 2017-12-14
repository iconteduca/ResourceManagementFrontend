import { ModalComponent } from './modal.component';
import { NgStyle } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RisorseService } from '../risorse.service';
import { ModalDirective } from 'ng2-bootstrap/components/modal/modal.component';

@Component({
  moduleId: module.id,
  selector: 'table-cmp',
  template: `<div class='table-responsive'><ng-table [config]="config" [rows]="rows" [columns]="columns" (tableChanged)="onChangeTable(config)">
            </ng-table></div>`,
})

export class TableComponent implements OnInit {

  public rows: any;
  private data: Array<any>;

  constructor(private _risorseService: RisorseService) { };


  private columns: Array<any> = [
    { title: 'Nome', name: 'nome', filtering: { filterString: '', placeholder: 'Filtra per Nome' } },
    { title: 'Cognome', name: 'cognome', filtering: { filterString: '', placeholder: 'Filtra per Cognome' } },
    { title: 'Sede', name: 'sede' },
    { title: 'E-mail', name: 'email' },
    { title: 'Telefono Aziendale', name: 'telefonoAziendale' },
    { title: 'Costo Risorsa', name: 'costoRisorsa' },
    { title: 'Skills', name: 'skills', filtering: { filterString: '', placeholder: 'Filtra per Skill' } },
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
    let filteredData: Array<any>  =  data;

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
        if ((item[column.name] !== undefined) && (item[column.name] !== null)) {
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
    let idServiceLine:string = sessionStorage.getItem("idServiceLine");
    this._risorseService.getRisorseServiceLine(idServiceLine)
      .subscribe(risorse => {
        this.data = this.formatSkills(risorse)
        this.length = this.data.length;
        let filteredData = this.changeFilter(this.data, this.config);
        let sortedData = this.changeSort(filteredData, this.config);
        this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
        this.length = sortedData.length;
      }, error => console.error('Error'),
      () => console.log('Completed!')
      );
  }


  private formatSkills(partial: any) {
    // For every resulttable entry
    for (let i = 0; i < partial.length; i++) {
      // Add Button
      //partial[i].skills = (partial[i].skills.split('|').toString());
      partial[i].skills = (partial[i].skills.replace(/\|/g, ', '));
    }
    return partial;
  };
}
