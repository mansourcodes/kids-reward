import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OtpLoginPage } from './otp-login.page';

describe('OtpLoginPage', () => {
  let component: OtpLoginPage;
  let fixture: ComponentFixture<OtpLoginPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
