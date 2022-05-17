import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OperatorService } from '../../http/operator.service';
import { Node } from '../../http/request/Node';
import { ReportEvent } from '../../http/request/ReportEvent';

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
  report: ReportEvent;
  reportID: number;



  constructor(
    private router: Router,
    private operatorService: OperatorService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    let machine_type = +this.route.snapshot.paramMap.get('machine_type');
    this.machine_type = machine_type;
    let reportID = +this.route.snapshot.paramMap.get('report');
    this.reportID = reportID;
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
            this.report.answer = "Root chosen " + element.position;
            this.report.node_id = element.id;
            this.position = element.position + ".1";
            console.log("NewPosition " + this.position);
        }
    });
    console.log("Position " + this.position);
    console.log("selectedOption " + this.selectedOption);
    this.router.navigate(['/suggestion', this.position, this.reportID, 1], {relativeTo: this.route });
  }

  sendReport(){
    this.report.count = 1;
    this.report.report_id = reportID;
    this.OperatorService.saveReportElement(this.report);
  }

}
