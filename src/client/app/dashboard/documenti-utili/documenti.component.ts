import { Component } from '@angular/core';
import { DocumentiService } from './documenti.service';

@Component({
  moduleId: module.id,
  selector: 'documenti-cmp',
  templateUrl: './documenti.component.html'
})

export class DocumentiComponent {
  public rows: any;
  constructor(documentiService: DocumentiService) {
    documentiService.getRisorse()
      .subscribe(
      rows => this.rows = rows,
      error => console.error('Error: '),
      () => console.log('Completed!')
      );
  }

  private columns: Array<any> = [
    { title: 'Nome ', name: 'nome', filtering: { filterString: '', placeholder: 'Filtra per nome' } },
    { title: 'Cognome', name: 'cognome', filtering: { filterString: '', placeholder: 'Filtra per cognome' } },
    { title: 'Sede', name: 'sede' },
  ];
  public config: any = {
    paging: false,
    sorting: { columns: this.columns },
    filtering: { filterString: '' },
    className: ['table-striped', 'table-bordered']
  };


}

