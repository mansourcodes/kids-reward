import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KidFormPage } from './kid-form.page';

describe('KidFormPage', () => {
  let component: KidFormPage;
  let fixture: ComponentFixture<KidFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(KidFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
