import { TestBed } from '@angular/core/testing';

import { PropertyServicesService } from './property-services.service';

describe('PropertyServicesService', () => {
  let service: PropertyServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertyServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
