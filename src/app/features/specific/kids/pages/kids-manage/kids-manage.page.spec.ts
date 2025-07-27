import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KidsManagePage } from './kids-manage.page';

describe('KidsManagePage', () => {
  let component: KidsManagePage;
  let fixture: ComponentFixture<KidsManagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(KidsManagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
