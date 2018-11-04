import { TestBed } from '@angular/core/testing';

import { GetMoviesService } from './get-movies.service';

describe('GetMoviesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetMoviesService = TestBed.get(GetMoviesService);
    expect(service).toBeTruthy();
  });
});
