import { TestBed } from '@angular/core/testing';

import { BgContentService } from './bg-content.service';

describe('BgContentService', () => {
  let service: BgContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BgContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
