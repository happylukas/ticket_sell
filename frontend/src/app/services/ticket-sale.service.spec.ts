import { TestBed } from '@angular/core/testing';

import { TicketSaleService } from './ticket-sale.service';

describe('TicketSaleService', () => {
  let service: TicketSaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketSaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
