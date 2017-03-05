// import modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing.module';
import { FormsModule } from '@angular/forms';
import { HttpModule, XHRBackend } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

// import page components
import { AppComponent } from './components/core/app.component';
import { HomeComponent } from './components/home/home.component';
import { GreenpeaComponent } from './components/greenpea/greenpea.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

// import shared components
import { EnergyOverviewComponent } from './components/shared-components/energy-overview/energy-overview.component';
import { GreenScoreComponent } from './components/shared-components/green-score/green-score.component';

// import services
import { DataService } from './services/data-service/data.service';
import { MapperService } from './services/mapper-service/mapper.service';

// import mock backend
import { MockXHRBackend } from './services/data-service/mock.data.service';

// exra imports for touch/gesture support
import 'hammerjs';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    GreenpeaComponent,
    ProfileComponent,
    PageNotFoundComponent,
    SettingsComponent,
    EnergyOverviewComponent,
    GreenScoreComponent
  ],
  providers: [
    DataService,
    MapperService,
    { provide: XHRBackend, useClass: MockXHRBackend }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
