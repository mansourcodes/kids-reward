import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageKidsPage } from './manage-kids.page';

describe('ManageKidsPage', () => {
  let component: ManageKidsPage;
  let fixture: ComponentFixture<ManageKidsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageKidsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
