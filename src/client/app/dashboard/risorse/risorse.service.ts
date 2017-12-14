import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { RisorseOption } from '../classes/risorseOption';
import { host } from '../../../assets/scripts/config';
import { Observable } from 'rxjs/Observable';
import { URLSearchParams } from '@angular/http';

@Injectable()
export class RisorseService {
  constructor(private http: Http) { };

  private risorseUrl = host + 'risorse';
  private risorseOptionUrl = host + 'risorseOption';
  private risorsebyServiceLineOptionUrl = host + 'risorseOptionbyServiceLine';
  private risorseImportUrl = host + 'risorseImport';
  private risorsebyServiceLineUrl = host + 'risorsebyServiceLine';

  getRisorse() {
    return this.http.get(this.risorseUrl).map(response => response.json());
  }

  getRisorseServiceLine(idserviceline: string) {

    return this.http.get(this.risorsebyServiceLineUrl + "/" + idserviceline).map(response => response.json());
  }

  /*  getRisorseOption(): Promise<RisorseOption[]> {
      return this.http.get(this.risorseOptionUrl)
        .toPromise()
        .then(response => response.json() as RisorseOption[])
        .catch(this.handleError);
    }*/
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  /*  getRisorseOption(): Promise<RisorseOption[]> {
      return this.http.get(this.risorseOptionUrl)
        .toPromise()
        .then(response => response.json() as RisorseOption[])
        .catch(this.handleError);
    }*/


  getRisorseOption() {
    return this.http.get(this.risorseOptionUrl)
      .map(response => response.json());
  }

  getRisorseOptionByServiceLineOption(idserviceline: string) {
    return this.http.get(this.risorsebyServiceLineOptionUrl + "/" + "2")
      .map(response => response.json());
  }


  uploadFile(event: any) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      let headers ;
      /** No need to include Content-Type in Angular 4 */
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      let options = new RequestOptions({ headers: headers });
      this.http.post(`${this.risorseImportUrl}`, formData, options)
        .map(res => res.json())
        .catch(error => Observable.throw(error))
        .subscribe(
        data => console.log('success'),
        error => console.log(error)
        )
    }
  }

}