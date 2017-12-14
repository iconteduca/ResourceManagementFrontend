import { Component } from '@angular/core';

/**
*	This class represents the lazy loaded HomeComponent.
*/

@Component({
	moduleId: module.id,
	selector: 'timeline-cmp',
	templateUrl: 'timeline.html',
	styleUrls: ['timeline.css'],
})
export class TimelineComponent { }

@Component({
	moduleId: module.id,
	selector: 'chat-cmp',
	templateUrl: 'chat.html'
})
export class ChatComponent {}

@Component({
	moduleId: module.id,
	selector: 'notifications-cmp',
	templateUrl: 'notifications.html'
})
export class NotificationComponent { }

@Component({
	moduleId: module.id,
	selector: 'home-cmp',
	templateUrl: 'home.component.html'
})

export class HomeComponent {

	/* Alert component */
	public alerts:Array<Object> = [
	   {
	     type: 'danger',
	     msg: 'Oh snap! Change a few things up and try submitting again.'
	   },
	   {
	     type: 'success',
	     msg: 'Well done! You successfully read this important alert message.',
	     closable: true
	   }
	 ];

	 public closeAlert(i:number):void {
	   this.alerts.splice(i, 1);
	 }
	/* END*/




}
