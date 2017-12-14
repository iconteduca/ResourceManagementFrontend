import { Risorse } from './../classes/risorse';
import { Task } from './gantt/lib/shared/interfaces';
import { Allocazioni } from './../classes/allocazioni';
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { host } from '../../../assets/scripts/config';
import 'rxjs/add/operator/toPromise';
import { Referenti } from '../classes/referenti';
import { Observable } from 'rxjs/Observable';
import { join } from 'path';



@Injectable()
export class AllocazioneService {
  private risorseprogettiServiceLineUrl = host + 'risorseprogettiServiceLine';
  private risorseFilteredUrl = host + 'filteredRisorseProgetti/';
  private risorseUrl = host + 'risorseprogetti';
  private risorseAllocate = host + 'risorseAllocate/';
  private progettiAllocazione = host + 'progettiAllocazione/';
  private risorseByRefUrl = host + 'risorseprogettiRef/';
  private risorseFilteredRisorsaUrl = host + 'risorseprogettiFilterRisorsaRef/';
  private risorseFilteredProgettiUrl = host + 'risorseprogettiFilterProgettoRef/';
  private risorseProgettiByIdProgUrl = host + 'risorseprogettiByIdProg/';

  constructor(private http: Http) { }

  getRisorseProgetti(): Observable<Task[]> {
    return this.http.get(this.risorseUrl)
     
      .map(response => response.json() as Task[])
      .catch(this.handleError);

  }

  getRisorseProgettiByRef(idReferente: string): Observable<Task[]>  {
     return  this.http.get(this.risorseByRefUrl + idReferente)
      
      .map((response:Response) => response.json())
      .catch(this.handleError);

  }
  getRisorseProgettiByServiceLine(idServiceLine : string): Promise<Task[]> {
    return this.http.get(this.risorseprogettiServiceLineUrl + "/" + idServiceLine)
    .toPromise()
    .then(response => response.json() as Task[])
    .catch(this.handleError);

  }

  getFilteredRisorseProgetti(nome: string): Observable<Task[]> {
    return this.http.get(this.risorseFilteredUrl + '?nomeRisorsa=' + nome + '')
      .map(response => response.json() as Task[])

  }




  getRisorseAllocate(referente: Referenti) {
    return this.http.get(this.risorseAllocate + referente.id)
      .map(response => response.json());
  }


  getProgettiAllocazione(referente: Referenti) {
    return this.http.get(this.progettiAllocazione + referente.id)
      .map(response => response.json());
  }




  getFilteredProgettiXrisorsa(idReferente: string, risorsa: string): Observable<Task[]> {
    if (risorsa === null) risorsa = '-1';
    return this.http.get(this.risorseFilteredRisorsaUrl + idReferente + "/" + risorsa)

      .map(response => response.json() as Task[])
      .catch(this.handleError);
  }

  getFilteredProgettiXprogetto(idReferente: string, progetto: string): Observable<Task[]> {
    if (progetto === null) progetto = '-1';
    return this.http.get(this.risorseFilteredProgettiUrl + idReferente + "/" + progetto)
      .map(response => response.json() as Task[])
      .catch(this.handleError);

  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getRisorseByIdProject(idProgetto: number) {
    return this.http.get(this.risorseProgettiByIdProgUrl + idProgetto)
      .map(response => response.json());
  }

}

