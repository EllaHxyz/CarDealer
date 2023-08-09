import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalebyModelComponent } from './saleby-model.component';

describe('SalebyModelComponent', () => {
  let component: SalebyModelComponent;
  let fixture: ComponentFixture<SalebyModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalebyModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalebyModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
