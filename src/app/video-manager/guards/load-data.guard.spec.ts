import { TestBed } from '@angular/core/testing';

import { LoadDataGuard } from './load-data.guard';

describe('LoadDataGuard', () => {
  let guard: LoadDataGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoadDataGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
