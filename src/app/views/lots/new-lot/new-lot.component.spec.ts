import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLotComponent } from './new-lot.component';

describe('NewLotComponent', () => {
  let component: NewLotComponent;
  let fixture: ComponentFixture<NewLotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewLotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
