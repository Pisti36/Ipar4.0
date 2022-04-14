import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewMachineComponent } from './add-new-machine.component';

describe('AddNewMachineComponent', () => {
  let component: AddNewMachineComponent;
  let fixture: ComponentFixture<AddNewMachineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewMachineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
