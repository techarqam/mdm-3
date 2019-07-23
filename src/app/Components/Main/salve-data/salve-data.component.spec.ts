import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalveDataComponent } from './salve-data.component';

describe('SalveDataComponent', () => {
  let component: SalveDataComponent;
  let fixture: ComponentFixture<SalveDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalveDataComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalveDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
