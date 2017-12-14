import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FormazioneService {
  private risorseUrl = 'http://10.0.2.202:4156/elenco/tutti';
  constructor(private http: Http) { }

  getRisorse() {
    return this.http.get(this.risorseUrl)
      .map(response => response.json());
  }
}
