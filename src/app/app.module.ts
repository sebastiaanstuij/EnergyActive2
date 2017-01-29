import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './components/core/app.component';
import { HomeComponent } from './components/home/home.component';
import { EnergyOverviewComponent } from './components/energy-overview/energy-overview.component';
import { GreenScoreComponent } from './components/green-score/green-score.component';

import { DataService } from './services/data-service/data.service';
import { MapperService } from './services/mapper-service/mapper.service';

import 'hammerjs';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    EnergyOverviewComponent,
    GreenScoreComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot()
  ],
  providers: [
    DataService,
    MapperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
