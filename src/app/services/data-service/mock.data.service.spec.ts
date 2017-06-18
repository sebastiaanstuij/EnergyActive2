/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MockXHRBackend } from './mock.data.service';

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockXHRBackend]
    });
  });

  it('should ...', inject([MockXHRBackend], (service: MockXHRBackend) => {
    expect(service).toBeTruthy();
  }));
});
