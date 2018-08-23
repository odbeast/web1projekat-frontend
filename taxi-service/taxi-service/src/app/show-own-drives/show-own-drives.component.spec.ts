import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOwnDrivesComponent } from './show-own-drives.component';

describe('ShowOwnDrivesComponent', () => {
  let component: ShowOwnDrivesComponent;
  let fixture: ComponentFixture<ShowOwnDrivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowOwnDrivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowOwnDrivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
