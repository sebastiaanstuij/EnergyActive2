// import modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routing.module';
import { FormsModule } from '@angular/forms';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions  } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
//import { HttpModule } from "@angular/http"; //TODO: enable for production


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
import { MockBackendService } from './services/data-service/mock.data.service';

// exra imports for touch/gesture support
import 'hammerjs';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    // HttpModule, //TODO: enable for production
    FormsModule,
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
    BaseRequestOptions,
    MockBackend,
    {
      provide: Http,
      deps: [MockBackend, BaseRequestOptions],
      useFactory: (backend, options) => { return new Http(backend, options); }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
