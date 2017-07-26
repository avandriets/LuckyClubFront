import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LuckyBoardComponent } from './lucky-board.component';

describe('LuckyBoardComponent', () => {
  let component: LuckyBoardComponent;
  let fixture: ComponentFixture<LuckyBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LuckyBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LuckyBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
