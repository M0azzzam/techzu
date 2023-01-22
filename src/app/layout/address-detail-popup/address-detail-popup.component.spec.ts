import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressDetailPopupComponent } from './address-detail-popup.component';

describe('AddressDetailPopupComponent', () => {
  let component: AddressDetailPopupComponent;
  let fixture: ComponentFixture<AddressDetailPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressDetailPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressDetailPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
