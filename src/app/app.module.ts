import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './components/core/app.component';
import { EnergyUsageOverviewComponent } from './components/energy-usage-overview/energy-usage-overview.component';

import { DataService } from './services/data-service/data.service';
import { MapperService } from './services/mapper-service/mapper.service';

@NgModule({
  declarations: [
    AppComponent,
    EnergyUsageOverviewComponent
  ],
  imports: [
    BrowserModule,
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
