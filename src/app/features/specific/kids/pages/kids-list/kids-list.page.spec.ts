import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KidsListPage } from './kids-list.page';

describe('KidsListPage', () => {
  let component: KidsListPage;
  let fixture: ComponentFixture<KidsListPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(KidsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
