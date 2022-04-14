import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaultDiagramComponent } from './fault-diagram.component';

describe('FaultDiagramComponent', () => {
  let component: FaultDiagramComponent;
  let fixture: ComponentFixture<FaultDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaultDiagramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaultDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
