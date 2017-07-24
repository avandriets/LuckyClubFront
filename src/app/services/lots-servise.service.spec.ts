import { TestBed, inject } from '@angular/core/testing';

import { LotsServiseService } from './lots-servise.service';

describe('LotsServiseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LotsServiseService]
    });
  });

  it('should ...', inject([LotsServiseService], (service: LotsServiseService) => {
    expect(service).toBeTruthy();
  }));
});
