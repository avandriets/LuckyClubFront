import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LotDetailViewComponent } from './lot-detail-view.component';

describe('LotDetailViewComponent', () => {
  let component: LotDetailViewComponent;
  let fixture: ComponentFixture<LotDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
