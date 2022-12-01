import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMachineStatisticsComponent } from './machine-statistics.component';

describe('MyMachineStatisticsComponent', () => {
  let component: MyMachineStatisticsComponent;
  let fixture: ComponentFixture<MyMachineStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyMachineStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMachineStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
