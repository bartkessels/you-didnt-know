import { TestBed } from '@angular/core/testing';

import { CurrentResultsService } from './current-results.service';

describe('CurrentResultsService', () => {
  let service: CurrentResultsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentResultsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
