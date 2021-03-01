import { TestBed } from '@angular/core/testing';

import { PropertyListResolverService } from './property-list-resolver.service';

describe('PropertyListResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PropertyListResolverService = TestBed.get(PropertyListResolverService);
    expect(service).toBeTruthy();
  });
});
