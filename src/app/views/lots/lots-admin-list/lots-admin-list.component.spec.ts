import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LotsAdminListComponent } from './lots-admin-list.component';

describe('LotsAdminListComponent', () => {
  let component: LotsAdminListComponent;
  let fixture: ComponentFixture<LotsAdminListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotsAdminListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotsAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
