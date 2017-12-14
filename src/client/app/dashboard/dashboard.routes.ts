import { Route } from '@angular/router';
import { HomeRoutes } from './home/index';
import { RisorseRoutes } from './risorse/index';
import { AllocazioneRoutes } from './allocazione/index';
import { DashboardComponent } from './index';
import { SkillsRoutes } from './skills/index';
import { ProgettiRoutes } from './progetti/index';
import { DocumentiRoutes } from './documenti-utili/index';
import {FormazioneRoutes} from './formazione/index';

export const DashboardRoutes: Route[] = [
	{
		path: 'dashboard',
		component: DashboardComponent,
		children: [
			...HomeRoutes,
			...RisorseRoutes,
			...AllocazioneRoutes,
			...ProgettiRoutes,
			...DocumentiRoutes,
			...SkillsRoutes,
			...FormazioneRoutes

		]
	}
];
