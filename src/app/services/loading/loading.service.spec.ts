import { TestBed } from '@angular/core/testing';

import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loading', () => {
    it('should be false at the start', () => {
      expect(service.loading).toBeFalsy();
    })

    it('should be true when setLoading is set to true', () => {
      service.setLoading(true);

      expect(service.loading).toBeTruthy()
    })

    it('should be false when setLoading is set to true', () => {
      service.setLoading(true);
      service.setLoading(false);

      expect(service.loading).toBeFalsy()
    })
  })

});
