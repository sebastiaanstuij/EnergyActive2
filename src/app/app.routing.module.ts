import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EnergyUsageOverviewComponent } from './components/energy-usage-overview/energy-usage-overview.component';
import { GreenScoreComponent } from './components/green-score/green-score.component';


const appRoutes: Routes = [
  { path: 'energy-usage', component: EnergyUsageOverviewComponent},
  { path: 'green-score', component: GreenScoreComponent}
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