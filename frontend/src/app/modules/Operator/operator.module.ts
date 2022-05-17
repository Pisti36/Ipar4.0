import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeafComponent } from './pages/leaf/leaf.component';
import { SuggestionComponent } from './pages/suggestion/suggestion.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProblemComponent } from './pages/problem/problem.component';
import { FormsModule } from '@angular/forms';
import { SelectMachineComponent } from './pages/select-machine/select-machine.component';
import { MachineService } from '../Machines/http/machines.service';
import { OperatorService } from './http/operator.service';

const routes: Routes = [
    { path: '', component: SelectMachineComponent},
    { path: 'problem/:machine_type/:report', component: ProblemComponent},
    { path: 'suggestion/:position/:report/:count', component: SuggestionComponent},
    { path: 'leaf/:position/:report/:count', component: LeafComponent},
];

@NgModule({
  declarations: [SuggestionComponent, ProblemComponent, SelectMachineComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    FormsModule
  ],
  providers: [
    MachineService,
    OperatorService
  ],
  exports: [
    SuggestionComponent,
    SelectMachineComponent,
    SuggestionComponent
  ]
})
export class OperatorModule { }
