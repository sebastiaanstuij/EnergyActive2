/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GreenpeaComponent } from './greenpea.component';

describe('ProfileComponent', () => {
  let component: GreenpeaComponent;
  let fixture: ComponentFixture<GreenpeaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreenpeaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreenpeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
