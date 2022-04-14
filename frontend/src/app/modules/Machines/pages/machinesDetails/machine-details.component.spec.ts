import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineDetailsComponent } from './machine-details.component';

describe('MachineDetailsComponent', () => {
  let component: MachineDetailsComponent;
  let fixture: ComponentFixture<MachineDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
