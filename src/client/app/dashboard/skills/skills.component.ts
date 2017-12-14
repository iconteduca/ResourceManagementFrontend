import { Component } from '@angular/core';
import { SkillsService } from './skills.service';

@Component({
  moduleId: module.id,
  selector: 'skills-cmp',
  templateUrl: './skills.component.html'
})

export class SkillsComponent {
  public rows: any;
  constructor(skillsService: SkillsService) {
    skillsService.getRisorse()
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

