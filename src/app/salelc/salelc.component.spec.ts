import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalelcComponent } from './salelc.component';

describe('SalelcComponent', () => {
  let component: SalelcComponent;
  let fixture: ComponentFixture<SalelcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalelcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalelcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
