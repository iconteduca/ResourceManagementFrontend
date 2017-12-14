import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { LoginRoutes } from './login.routes';
import { Referenti } from '../dashboard/classes/referenti';
import {Router} from '@angular/router'
import { Utenti } from '../dashboard/classes/utenti';


/**
*	This class represents the lazy loaded LoginComponent.
*/

@Component({
	moduleId: module.id,
	selector: 'login-cmp',
	templateUrl: 'login.component.html'
})

export class LoginComponent { 
	

	constructor(private loginService: LoginService, private router: Router){
		
	}
	//model : Referenti;
	model = new Utenti('', '');
	submitted = false;
	sessionStorage = window.sessionStorage;

	onSubmit() {//login() : void {
		console.log(this.model);
		let isLogged : boolean;
		this.loginService.loginUtente(this.model).subscribe(data => {
			
			var refObj = data.json();
			let id = refObj.utente.id;
			this.sessionStorage.setItem('idUtente', id);
			let type : string =refObj.type;
			if (type === "ProjectManager") {
				this.sessionStorage.setItem('idRef',refObj.id_referente);
			} else {
				this.sessionStorage.setItem('idRef', null);	
			}
			
			this.sessionStorage.setItem('usernameRef', refObj.utente.username);
			this.sessionStorage.setItem('passwordRef', refObj.utente.password);
			this.sessionStorage.setItem('nomeRef', refObj.utente.nome);
			this.sessionStorage.setItem('cognomeRef', refObj.utente.cognome);
			this.sessionStorage.setItem('idServiceLine', refObj.id_service_line);
			this.sessionStorage.setItem('typeUser', refObj.type);
			//this.router.navigateByUrl("/dashboard/home/ref/{" + id + "}");
			this.router.navigateByUrl("/dashboard/home");
		}, error => {
			console.log(error);
			alert('Attenzione! Username e/o password errati.');
		});
		this.submitted = true;
	}

  
}
