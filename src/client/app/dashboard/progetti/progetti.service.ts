import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Progetti } from '../classes/index';
import { RisorseProgetti } from '../classes/risorseprogetti';
import {host} from '../../../assets/scripts/config';
import { Referenti } from '../classes/referenti';
import { RisorseProgettiModelView } from '../classes/risorseprogettiModelView';

@Injectable()
export class ProgettiService {
  constructor(private http: Http) { };

  private getProgettiUrl = host+'progettis';
  private saveProgettiUrl = host+'progetti/crea';
  private saveRisorseProgettiUrl = host+'risorseprogetti/crea';
  private getProgettiByRefUrl = host+'progettiRef/';
  private progettiRefByServiceLineUrl = host+'progettiRefByServiceLine/';
  private updateProgettiUrl = host+'progetti/aggiorna';
  private deleteProgettiUrl = host+'progettiDel/';
  private deleteRisorsaProgettoUrl = host + 'risorseprogetti/';
  private updateRisorsaProgettoUrl = host + 'risorseprogetti';
  private insertRisorseProgettiUrl = host + 'risorseprogetti';
  

  getProgetti(): Observable<Progetti[]> {
    return this.http.get(this.getProgettiUrl)
      .map(response => {
        return response.json();
      })
  }

  getProgettiByRef(ref : Referenti): Observable<Progetti[]> {
    return this.http.get(this.getProgettiByRefUrl + ref.id )
      .map(response => {
        return response.json();
      })
  }

  getProgettiRefByServiceLineUrl(idServiceLine:string): Observable<Progetti[]> {
    return this.http.get(this.progettiRefByServiceLineUrl + idServiceLine )
      .map(response => {
        return response.json();
      })
  }

  saveProgetto(progetto: Progetti){

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let content = JSON.stringify(progetto);
    return this.http.post(this.saveProgettiUrl, content, {
      headers: headers
    })
      .map(response => {
        return response.status;
      })
  }
  
  saveRisorsaProgetto(risorsaprogetto: RisorseProgetti) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let content = JSON.stringify(risorsaprogetto);
    return this.http.post(this.saveRisorseProgettiUrl, content, {
      headers: headers
    })
      .map(response => {
        return response;
      })
      .catch(err=> {
        return err.status;
      })
  }

  insertRisorsaProgetto(risorsaprogetto: RisorseProgettiModelView) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let content = JSON.stringify(risorsaprogetto);
    return this.http.post(this.insertRisorseProgettiUrl, content, {
      headers: headers
    })
      .map(response => {
        return response;
      })
      .catch(err=> {
        return err.status;
      })
  }
  
  updateRisorsaProgetto(risorsaprogetto: RisorseProgettiModelView) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let content = JSON.stringify(risorsaprogetto);
    return this.http.put(this.updateRisorsaProgettoUrl, content, {
      headers: headers
    })
      .map(response => {
        return response;
      })
      .catch(err=> {
        return err.status;
      })
  }

  updateProgetto(progetto: Progetti){
    
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let content = JSON.stringify(progetto);
        return this.http.put(this.updateProgettiUrl, content, {
          headers: headers
        }).map(response => {
            return response.status;
        })
  }

    deleteProgetto(progetto: Progetti){      
      let content = progetto.idprogetto;        
      return this.http.delete(this.deleteProgettiUrl + content);
    }

    deleteRisorsaProgetto(idRisorsaProgetto: number){      
      let content = idRisorsaProgetto;        
      return this.http.delete(this.deleteRisorsaProgettoUrl + content);
    }

    /*deleteProgetto(progetto : Progetti): Observable<Progetti[]> {
      return this.http.get(this.deleteProgettiUrl + progetto.idprogetto )
        .map(response => {
          return response.json();
        })
    }*/
}
