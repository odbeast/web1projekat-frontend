import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUserDrivesComponent } from './show-user-drives.component';

describe('ShowUserDrivesComponent', () => {
  let component: ShowUserDrivesComponent;
  let fixture: ComponentFixture<ShowUserDrivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowUserDrivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowUserDrivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
