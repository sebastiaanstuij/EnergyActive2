// import modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

// import page components
import { AppComponent } from './components/core/app.component';
import { HomeComponent } from './components/home/home.component';
import { MyPeaComponent } from './components/my-pea/my-pea.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

// import shared components
import { EnergyOverviewComponent } from './components/shared-components/energy-overview/energy-overview.component';
import { GreenScoreComponent } from './components/shared-components/green-score/green-score.component';

// import services
import { DataService } from './services/data-service/data.service';
import { MapperService } from './services/mapper-service/mapper.service';

// exra imports
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MyPeaComponent,
    ProfileComponent,
    PageNotFoundComponent,
    SettingsComponent,
    EnergyOverviewComponent,
    GreenScoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    FlexLayoutModule
  ],
  providers: [
    DataService,
    MapperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
