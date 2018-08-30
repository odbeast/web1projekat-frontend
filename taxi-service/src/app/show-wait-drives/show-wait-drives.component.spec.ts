import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowWaitDrivesComponent } from './show-wait-drives.component';

describe('ShowWaitDrivesComponent', () => {
  let component: ShowWaitDrivesComponent;
  let fixture: ComponentFixture<ShowWaitDrivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowWaitDrivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowWaitDrivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
