import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MachineService } from 'src/app/modules/Machines/http/machines.service';
import { OperatorService } from '../../http/operator.service';
import { Node } from '../../http/request/Node';
import { Report } from '../../http/request/Report';
import { ReportElement } from '../../http/request/ReportElement';

@Component({
  selector: 'app-leaf',
  templateUrl: './leaf.component.html',
  styleUrls: ['./leaf.component.scss']
})
export class LeafComponent implements OnInit {
  position: string;
  public list: Node[];
  leaf : Node = new Node();
  nextPosition: string;
  public newList: Node[];
  endOfTree: boolean = false;
  startDate: Date;
  email: String;

  reportID: number;
  count: number;
  reportelement: ReportElement = new ReportElement();
  report: Report = new Report();



constructor(
    private router: Router,
    private route: ActivatedRoute,
    private operatorService: OperatorService,
    private machineService: MachineService,
    private datepipe: DatePipe
    ) {

  }

  clearData(){
    this.nextPosition = "";
    this.endOfTree = false;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let position = params.position;
      this.position = position;
      let repID = params.report;
      this.reportID = Number(repID);
      let c = params.count;
      this.count = c;
      this.clearData();
      this.getData();
      window.scroll(0,0);
    })
    this.startDate = new Date();
    
  }

  getData(){
    this.operatorService.getNodesByPosition(this.position).subscribe(
      data=>{
        this.list = data;
        this.convert();
        this.operatorService.getReportById(this.reportID).subscribe(res => {
          this.report = res
          console.log(this.report)
          this.machineService.getMachine(this.report.machine_id).subscribe(res =>{
            this.email = res.mail;
            if(this.leaf.type == "E")
            this.leaf.content = "Amennyiben a hiba továbbra is fenn áll, forduljon szakértőhöz a(z) " + this.email + " email címen";
          } );
        } );
        this.getNext();
        this.getNewPositions();
      })
  }

  async convert(){
    this.list.forEach(element => {
      this.leaf = element;

    });
  }

  getNext(){
    if(this.leaf.type == "B"){
      this.nextPosition = this.leaf.next;
    } else {
      this.nextPosition = "";
    }
  }

  getNewPositions(){
    if(this.leaf.type == "B"){
      this.operatorService.getNodesByPosition(this.nextPosition).subscribe(data=>{
        this.newList = data;
        this.readNewTypes();
      })
    }
  }

  readNewTypes(){
    if(this.newList[0].type == "E"){
      this.endOfTree = true;
    } else {
      this.endOfTree = false;
    }
  }

  sendAnswer(){
    switch(this.leaf.type){
      case "S": {
        console.log("Done successfully!");
        this.router.navigate(['/operator'], {relativeTo: this.route });
        //Modify report
        this.updateReport("Solved");
        break;
      }
      case "B": {
        console.log("Next branch!");
        if(this.endOfTree){
        this.router.navigate(['/leaf', this.nextPosition, this.reportID, (this.count)], {relativeTo: this.route });
        } else {
          this.router.navigate(['/suggestion', this.nextPosition, this.reportID, (this.count)], {relativeTo: this.route });
        }
        break;
      }
      case "E": {
        console.log("No solution for this problem in this tree!");
        this.router.navigate(['/operator'], {relativeTo: this.route });
        //Modify report
        this.updateReport("Unsolved");
        break;
      }
    }
  }

  updateReport(message: string){
    if(message=="Unsolved")
      this.postReport("End: A problémát nem sikerült megoldani");
    else
      this.postReport("End: " + this.leaf.content);
    var now = new Date();
    this.report.endTime = this.datepipe.transform(now, 'yyyy-MM-dd\'T\'HH:mm:ss.SSSZ');
    this.operatorService.updateReport({
		  "id" : this.reportID,
		  "status" : message,
      "machineType_id" : this.report.machineType_id,
		  "machine_id" : this.report.machine_id,
		  "startTime" : this.report.startTime,
      "endTime" : this.report.endTime,
      "lastNode" : this.leaf.id
	  }).subscribe(res => console.log(res));
    console.log(
      {
		  "id" : this.reportID,
		  "status" : message,
      "machinetype_id" : this.report.machineType_id,
		  "machine_id" : this.report.machine_id,
		  "startTime" : this.report.startTime,
      "endTime" : null,
      "lastNode" : this.leaf.id
	  }
    );
  }

  postReport(sum :string){
      this.reportelement.summary = sum;
      this.reportelement.count = (this.count + 1);
      this.reportelement.report_id = this.reportID;
      this.reportelement.node_id = this.leaf.id;
      this.operatorService.saveReportElement({
		  "id" : this.reportelement.id,
		  "report_id" : this.reportelement.report_id,
		  "node_id" : this.reportelement.node_id,
		  "summary" : this.reportelement.summary,
		  "count" : this.reportelement.count,
      "duration" : 0
	  }).subscribe(res => console.log(res));
    }

}
