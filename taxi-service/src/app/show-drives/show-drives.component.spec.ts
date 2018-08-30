import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDrivesComponent } from './show-drives.component';

describe('ShowDrivesComponent', () => {
  let component: ShowDrivesComponent;
  let fixture: ComponentFixture<ShowDrivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDrivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDrivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
