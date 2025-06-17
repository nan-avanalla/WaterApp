import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CredsPage } from './creds.page';

describe('CredsPage', () => {
  let component: CredsPage;
  let fixture: ComponentFixture<CredsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CredsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
