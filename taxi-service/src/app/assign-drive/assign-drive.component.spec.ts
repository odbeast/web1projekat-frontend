import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignDriveComponent } from './assign-drive.component';

describe('AssignDriveComponent', () => {
  let component: AssignDriveComponent;
  let fixture: ComponentFixture<AssignDriveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignDriveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignDriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
