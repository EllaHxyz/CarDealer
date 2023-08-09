import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleMonthlyComponent } from './sale-monthly.component';

describe('SaleMonthlyComponent', () => {
  let component: SaleMonthlyComponent;
  let fixture: ComponentFixture<SaleMonthlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleMonthlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleMonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
