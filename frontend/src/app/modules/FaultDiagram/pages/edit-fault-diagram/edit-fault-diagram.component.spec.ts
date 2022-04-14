import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFaultDiagramComponent } from './edit-fault-diagram.component';

describe('EditFaultDiagramComponent', () => {
  let component: EditFaultDiagramComponent;
  let fixture: ComponentFixture<EditFaultDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFaultDiagramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFaultDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
