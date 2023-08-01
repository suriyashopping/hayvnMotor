import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferCountdownComponent } from './offer-countdown.component';

describe('OfferCountdownComponent', () => {
  let component: OfferCountdownComponent;
  let fixture: ComponentFixture<OfferCountdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfferCountdownComponent]
    });
    fixture = TestBed.createComponent(OfferCountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
