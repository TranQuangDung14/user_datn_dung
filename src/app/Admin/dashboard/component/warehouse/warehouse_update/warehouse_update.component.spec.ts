/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Warehouse_updateComponent } from './warehouse_update.component';

describe('Warehouse_updateComponent', () => {
  let component: Warehouse_updateComponent;
  let fixture: ComponentFixture<Warehouse_updateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Warehouse_updateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Warehouse_updateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
