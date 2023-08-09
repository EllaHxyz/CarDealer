import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerIncomeComponent } from './customer-income.component';

describe('CustomerIncomeComponent', () => {
  let component: CustomerIncomeComponent;
  let fixture: ComponentFixture<CustomerIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerIncomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
