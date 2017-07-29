/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackendService } from './mock.data.service';

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockBackendService]
    });
  });

  it('should ...', inject([MockBackendService], (service: MockBackendService) => {
    expect(service).toBeTruthy();
  }));
});
