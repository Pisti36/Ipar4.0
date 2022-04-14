import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from './statistics/statistics.component';
import { Routes, RouterModule } from '@angular/router';
import { MyBarChartComponent } from './statistics/bar-chart/bar-chart.component';
import { ChartsModule } from 'ng2-charts';
import { LineChartComponent } from './statistics/line-chart/line-chart.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StatisticsService } from './http/statistics.service';
import { MachineService } from '../Machines/http/machines.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FaultDiagramService } from '../FaultDiagram/http/faultdiagram.service';

const routes: Routes = [
  { path: '', component: StatisticsComponent},
  { path: 'machinetype/:id', component: LineChartComponent},
  { path: 'machine/:id', component: MyBarChartComponent},
];


@NgModule({
  declarations: [
    StatisticsComponent,
    MyBarChartComponent,
    LineChartComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ChartsModule,
    SharedModule,
    HttpClientModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  providers: [
    MachineService,
    StatisticsService,
    FaultDiagramService
  ],
  exports: [
    MatSelectModule,
    MatFormFieldModule
  ]
})
export class StatisticsModule { }
