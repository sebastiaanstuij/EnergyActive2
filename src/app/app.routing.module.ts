import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { EnergyOverviewComponent } from './components/energy-overview/energy-overview.component';
import { GreenScoreComponent } from './components/green-score/green-score.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'energy-usage', component: EnergyOverviewComponent},
  { path: 'green-score', component: GreenScoreComponent},
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}