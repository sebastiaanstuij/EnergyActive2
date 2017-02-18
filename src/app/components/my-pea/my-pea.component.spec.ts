/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MyPeaComponent } from './my-pea.component';

describe('ProfileComponent', () => {
  let component: MyPeaComponent;
  let fixture: ComponentFixture<MyPeaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPeaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
