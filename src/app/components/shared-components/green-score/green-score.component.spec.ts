/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GreenScoreComponent } from './green-score.component';

describe('GreenScoreComponent', () => {
  let component: GreenScoreComponent;
  let fixture: ComponentFixture<GreenScoreComponent>;
  let compiled: HTMLElement | null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreenScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreenScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    compiled = fixture.debugElement.nativeElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy('Component instance not created');
  });


  // it('should have exactly one "svg" element with dimensions 960x600', () => {
  //   let nativeEls: NodeListOf<SVGSVGElement> | undefined[];
  //   nativeEls = compiled ? compiled.querySelectorAll('svg') : [];
  //   expect(nativeEls.length).toBe(1, 'Incorrect number of elements found');
  //   if (nativeEls.length === 1) {
  //     let nativeEl = nativeEls[0];
  //     expect(nativeEl.clientWidth).toBe(800, 'Incorrect width');
  //     expect(nativeEl.clientHeight).toBe(500, 'Incorrect height');
  //   }
  // });


});
