import { TestBed } from '@angular/core/testing';

import { InvitaionService } from './invitaion.service';

describe('InvitaionService', () => {
  let service: InvitaionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvitaionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
