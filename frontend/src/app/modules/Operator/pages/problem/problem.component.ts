import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OperatorService } from '../../http/operator.service';
import { Node } from '../../http/request/Node';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.scss']
})
export class ProblemComponent implements OnInit {

  selectedOption:string;
  public problems: Node[];
  public id;



  constructor(
    private router: Router,
    private operatorService: OperatorService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get('id');
    this.id = id;
    this.operatorService.getProblems().subscribe(res => {
      this.problems = res;
    });
  }

  sendAnswer(){
    this.operatorService.sendProblemAnswer(this.selectedOption);
    console.log("selectedOption " + this.selectedOption)
    this.router.navigate(['/question']);
  }
}
