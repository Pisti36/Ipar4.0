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
  public allrootnodes: Node[];
  public machine_type;
  public problems: Node[] = [];
  position: string;



  constructor(
    private router: Router,
    private operatorService: OperatorService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    let machine_type = +this.route.snapshot.paramMap.get('machine_type');
    this.machine_type = machine_type;
    this.operatorService.getProblems().subscribe(res => {
      this.allrootnodes = res;
      this.selectedOption = res[0].content;
		  console.log("OptionsGot " + this.allrootnodes);
      this.problemsByMachineType();
    });
  }

  problemsByMachineType(){
    this.allrootnodes.forEach(element => {
      if(element.machine_type == this.machine_type){
          this.problems.push(element);
      }
    });
  }

  selectProblem(problem: Node){
    this.position = problem.position + ".1";
  }

  sendAnswer(){
    this.problems.forEach(element => {
        console.log("problems list isnt empty");
        if(element.content == this.selectedOption){
            this.position = element.position + ".1";
            console.log("NewPosition " + this.position);
        }
    });
    console.log("Position " + this.position);
    console.log("selectedOption " + this.selectedOption);
    this.router.navigate(['/suggestion', this.position], {relativeTo: this.route });
  }
}
