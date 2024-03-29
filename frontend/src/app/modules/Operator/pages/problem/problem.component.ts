import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OperatorService } from '../../http/operator.service';
import { Node } from '../../http/request/Node';
import { ReportElement } from '../../http/request/ReportElement';

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
  report: ReportElement = new ReportElement();
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
            this.report.summary = "Problem: " + element.content;  //will be element.summary
            this.report.node_id = element.id;
            this.position = element.position + ".1";
            console.log("NewPosition " + this.position);
        }
    });
    console.log("Position " + this.position);
    console.log("selectedOption " + this.selectedOption);
    this.sendReport();
    this.router.navigate(['/suggestion', this.position, this.reportID, 1], {relativeTo: this.route });
  }

  sendReport(){
    this.report.count = 1;
    this.report.report_id = this.reportID;
    this.operatorService.saveReportElement({
		  "id" : this.report.id,
		  "report_id" : this.report.report_id,
		  "node_id" : this.report.node_id,
		  "summary" : this.report.summary,
		  "count" : this.report.count,
      "duration" : 0
	  }).subscribe(
      (res)=> {this.report = res; console.log(res)},
      (err)=> console.log(err)
    );
  }

}
