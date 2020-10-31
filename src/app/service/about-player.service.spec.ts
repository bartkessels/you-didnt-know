import { TestBed } from '@angular/core/testing';

import { AboutPlayerService } from './about-player.service';

describe('AboutPlayerService', () => {
  let service: AboutPlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AboutPlayerService);
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
