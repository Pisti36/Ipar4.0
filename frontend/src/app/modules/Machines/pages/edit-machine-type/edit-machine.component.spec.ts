import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMachineTypeComponent } from './edit-machine.component';

describe('EditMachineTypeComponent', () => {
  let component: EditMachineTypeComponent;
  let fixture: ComponentFixture<EditMachineTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMachineTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMachineTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
