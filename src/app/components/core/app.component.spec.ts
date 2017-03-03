/* tslint:disable:no-unused-variable */
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MaterialModule } from '@angular/material';
import { AppRoutingModule } from '../../app.routing.module';
import { APP_BASE_HREF } from '@angular/common';

import { HomeComponent } from '../home/home.component';
import { MyPeaComponent } from '../my-pea/my-pea.component';
import { ProfileComponent } from '../profile/profile.component';
import { SettingsComponent } from '../settings/settings.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

import { EnergyOverviewComponent } from '../shared-components/energy-overview/energy-overview.component';
import { GreenScoreComponent } from '../shared-components/green-score/green-score.component';

fdescribe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
       imports: [
        MaterialModule,
        AppRoutingModule
      ],
      declarations: [
        AppComponent,
        HomeComponent,
        MyPeaComponent,
        ProfileComponent,
        SettingsComponent,
        PageNotFoundComponent,
        EnergyOverviewComponent,
        GreenScoreComponent
      ],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  // it(`should have as title 'app works!'`, async(() => {
  //   let fixture = TestBed.createComponent(AppComponent);
  //   let app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('app works!');
  // }));

  // it('should render title in a h1 tag', async(() => {
  //   let fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   let compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('app works!');
  // }));
});
