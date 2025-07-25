import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddKidPage } from './add-kid.page';

describe('AddKidPage', () => {
  let component: AddKidPage;
  let fixture: ComponentFixture<AddKidPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddKidPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
