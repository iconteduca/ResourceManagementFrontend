import { Component } from '@angular/core';
import { RisorseService } from './risorse.service';

@Component({
  moduleId: module.id,
  selector: 'risorse-cmp',
  templateUrl: './risorse.component.html',
  
})

export class RisorseComponent {
  
  constructor(private _risorseService: RisorseService) { };

  fileChange(event:any) {
    this._risorseService.uploadFile(event);
  }

}

