import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeATaxiComponent } from './take-a-taxi.component';

describe('TakeATaxiComponent', () => {
  let component: TakeATaxiComponent;
  let fixture: ComponentFixture<TakeATaxiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakeATaxiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeATaxiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
