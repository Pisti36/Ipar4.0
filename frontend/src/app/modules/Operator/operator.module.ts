import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionComponent } from './pages/question/question.component';
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
    { path: 'problem/:machine_type', component: ProblemComponent},
    { path: 'question/:position', component: QuestionComponent},
    { path: 'suggestion/:position', component: SuggestionComponent},
];

@NgModule({
  declarations: [QuestionComponent, SuggestionComponent, ProblemComponent, SelectMachineComponent],
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
    QuestionComponent, 
    SuggestionComponent,
    SelectMachineComponent,
    SuggestionComponent
  ]
})
export class OperatorModule { }
