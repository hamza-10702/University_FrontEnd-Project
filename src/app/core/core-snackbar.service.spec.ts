import { TestBed } from '@angular/core/testing';

import { CoreSnackbarService } from './core-snackbar.service';

describe('CoreSnackbarService', () => {
  let service: CoreSnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoreSnackbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
