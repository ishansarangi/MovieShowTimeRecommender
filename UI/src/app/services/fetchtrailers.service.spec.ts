import { TestBed } from '@angular/core/testing';

import { FetchtrailersService } from './fetchtrailers.service';

describe('FetchtrailersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FetchtrailersService = TestBed.get(FetchtrailersService);
    expect(service).toBeTruthy();
  });
});
