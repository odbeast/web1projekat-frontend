import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDriverDrivesComponent } from './show-driver-drives.component';

describe('ShowDriverDrivesComponent', () => {
  let component: ShowDriverDrivesComponent;
  let fixture: ComponentFixture<ShowDriverDrivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDriverDrivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDriverDrivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
