import { TestBed } from '@angular/core/testing';

import { EditProfileService } from './view-profile.service';

describe('EditProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditProfileService = TestBed.get(EditProfileService);
    expect(service).toBeTruthy();
  });
});
