import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OperatorService } from '../../http/operator.service';
import { ProblemRequest } from '../../http/request/problemRequest';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.scss']
})
export class ProblemComponent implements OnInit {

  selectedOption:string;
  machineproblems: ProblemRequest;

  constructor(
    private router: Router,
    private operatorService: OperatorService
    ) { }

  ngOnInit(): void {
      this.operatorService.getProblems
  }

  sendAnswer(){
    this.operatorService.sendProblemAnswer(this.selectedOption);
    console.log("selectedOption " + this.selectedOption)
    this.router.navigate(['/question']);
  }
}
