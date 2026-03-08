import { TestBed } from '@angular/core/testing';

import { PizzaDetailsService } from './pizza-details.service';

describe('PizzaDetailsService', () => {
  let service: PizzaDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PizzaDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
