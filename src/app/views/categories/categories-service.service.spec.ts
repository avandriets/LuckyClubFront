import { TestBed, inject } from '@angular/core/testing';

import { CategoriesServiceService } from './categories-service.service';

describe('CategoriesServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoriesServiceService]
    });
  });

  it('should ...', inject([CategoriesServiceService], (service: CategoriesServiceService) => {
    expect(service).toBeTruthy();
  }));
});
