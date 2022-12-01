import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineTypeStatisticsComponent } from './machine-type-statistics.component';

describe('MachineTypeStatisticsComponent', () => {
  let component: MachineTypeStatisticsComponent;
  let fixture: ComponentFixture<MachineTypeStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineTypeStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineTypeStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
