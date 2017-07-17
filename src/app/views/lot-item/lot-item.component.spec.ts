import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LotPanelComponent } from './lot-item.component';

describe('LotPanelComponent', () => {
  let component: LotPanelComponent;
  let fixture: ComponentFixture<LotPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
