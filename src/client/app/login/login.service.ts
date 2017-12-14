import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { host } from '../../assets/scripts/config';
import { Referenti, Utenti } from '../dashboard/classes/index';

@Injectable()
export class LoginService {
  
    private loginUrl = host + 'login';
    private loginUrlUtenti = host + 'loginUtente';
  
    constructor(private http: Http) { }

   

    login(ref : Referenti) {
        let login : boolean;
        login = true;
        let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		let content = JSON.stringify(ref);
		return this.http.post(this.loginUrl, content, {
                    headers: headers
                    }).map(response => {
                    return response;
                })

    }

    loginUtente(ref : Utenti) {
        let login : boolean;
        login = true;
        let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		let content = JSON.stringify(ref);
		return this.http.post(this.loginUrlUtenti, content, {
                    headers: headers
                    }).map(response => {
                    return response;
                })

    }

}