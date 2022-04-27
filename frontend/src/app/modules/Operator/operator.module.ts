import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionComponent } from './pages/question/question.component';
import { SuggestionComponent } from './pages/suggestion/suggestion.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProblemComponent } from './pages/problem/problem.component';

const routes: Routes = [
    { path: '', component: ProblemComponent},
    { path: 'question', component: QuestionComponent},
    { path: 'suggestion', component: SuggestionComponent},
];

@NgModule({
  declarations: [QuestionComponent, SuggestionComponent, ProblemComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
  ],
  exports: [
    QuestionComponent, 
    SuggestionComponent
  ]
})
export class OperatorModule { }
