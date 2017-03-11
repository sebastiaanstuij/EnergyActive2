/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MaterialModule } from '@angular/material';

let fixture: ComponentFixture<AppComponent>;
let component: AppComponent;
let compiled: HTMLElement | null;
let router;
let location;

// TODO: implement routerstubbing option
// from https://stackoverflow.com/questions/39623722/angular-2-final-release-router-unit-test/39624731#39624731

// Unit Tests without child components
@Component({
  template: '<div id="mockdiv1"></div>'
})
class DummyComponent1 {
}
@Component({
  template: '<div id="mockdiv2"></div>'
})
class DummyComponent2 {
}

fdescribe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
       imports: [
        MaterialModule,
        [RouterTestingModule.withRoutes([
          { path: 'home', component: DummyComponent1 },
          { path: 'greenpea', component: DummyComponent2},
          { path: 'profile', component: DummyComponent1},
          { path: 'settings', component: DummyComponent2},
        ])],
      ],
      declarations: [
        AppComponent,
        DummyComponent1,
        DummyComponent2
      ]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;

    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  beforeEach(inject([Router, Location], (_router: Router, _location: Location) => {
    router = _router;
    location = _location;
  }));

  it('should create the app component', () => {
    expect(component).toBeTruthy('Component instance not created');
  });

  it(`should contain a rendered sidenav`, () => {
    expect(fixture.debugElement.query(By.css('#app-sidenav'))).not.toBeNull('Missing sidenav');
  });

  it(`should contain a rendered toolbar`, () => {
    expect(fixture.debugElement.query(By.css('#app-toolbar'))).not.toBeNull('Missing toolbar');
  });

  it('should go to home url', async(() => {
    router.navigate(['/home']).then(() => {
      expect(location.path()).toBe('/home');
      expect(fixture.debugElement.query(By.css('#mockdiv1'))).not.toBeNull('Missing routeroutlet component');
      expect(fixture.debugElement.query(By.css('#mockdiv2'))).toBeNull('Wrong component in DOM');
    });
  }));

  it('should go to greenpea url', async(() => {
    router.navigate(['/greenpea']).then(() => {
      expect(location.path()).toBe('/greenpea');
      expect(fixture.debugElement.query(By.css('#mockdiv1'))).toBeNull('Wrong component in DOM');
      expect(fixture.debugElement.query(By.css('#mockdiv2'))).not.toBeNull('Missing routeroutlet component');
    });
  }));

  it('should go to profile url', async(() => {
    router.navigate(['/profile']).then(() => {
      expect(location.path()).toBe('/profile');
    });
  }));

  it('should go to settings url', async(() => {
    router.navigate(['/settings']).then(() => {
      expect(location.path()).toBe('/settings');
    });
  }));
});
