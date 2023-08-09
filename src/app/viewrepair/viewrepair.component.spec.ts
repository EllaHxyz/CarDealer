import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewrepairComponent } from './viewrepair.component';

describe('ViewrepairComponent', () => {
  let component: ViewrepairComponent;
  let fixture: ComponentFixture<ViewrepairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewrepairComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewrepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
