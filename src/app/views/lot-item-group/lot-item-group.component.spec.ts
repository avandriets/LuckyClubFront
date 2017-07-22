import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LotItemGroupComponent } from './lot-item-group.component';

describe('LotItemGroupComponent', () => {
  let component: LotItemGroupComponent;
  let fixture: ComponentFixture<LotItemGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotItemGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotItemGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
