import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalebymanufacturerComponent } from './salebymanufacturer.component';

describe('SalebymanufacturerComponent', () => {
  let component: SalebymanufacturerComponent;
  let fixture: ComponentFixture<SalebymanufacturerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalebymanufacturerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalebymanufacturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
