import { Component, OnInit } from '@angular/core';
import { Referenti } from '../../dashboard/classes/referenti';
import {Router} from '@angular/router'

@Component({
    moduleId: module.id,
    selector: 'top-nav',
    templateUrl: 'topnav.html',
})

export class TopNavComponent implements OnInit{

	nomeReferente : string;
	sessionStorage = window.sessionStorage;

	constructor(private router: Router){}
	
	ngOnInit(): void {

		this.nomeReferente = this.sessionStorage.getItem("nomeRef") + " " + this.sessionStorage.getItem("cognomeRef");
		
	}

	logout(): void{
		this.sessionStorage.removeItem('idRef');
		this.sessionStorage.removeItem('usernameRef');
		this.sessionStorage.removeItem('passwordRef');
		this.sessionStorage.removeItem('nomeRef',);
		this.sessionStorage.removeItem('cognomeRef');
		this.router.navigateByUrl("/");
	}

	changeTheme(color: string): void {
		var link: any = $('<link>');
		link
			.appendTo('head')
			.attr({type : 'text/css', rel : 'stylesheet'})
			.attr('href', 'themes/app-'+color+'.css');
	}

	rtl(): void {
		var body: any = $('body');
		body.toggleClass('rtl');
	}

	sidebarToggler(): void  {
		var sidebar: any = $('#sidebar');
		var mainContainer: any = $('.main-container');
		sidebar.toggleClass('sidebar-left-zero');
		mainContainer.toggleClass('main-container-ml-zero');
	}
}
