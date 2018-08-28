import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPriceDestComponent } from './add-price-dest.component';

describe('AddPriceDestComponent', () => {
  let component: AddPriceDestComponent;
  let fixture: ComponentFixture<AddPriceDestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPriceDestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPriceDestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
