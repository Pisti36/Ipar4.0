import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { OperatorService } from '../../http/operator.service';
import { Node } from '../../http/request/Node';
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

  reportID: number;
  count: number;
  report: ReportElement = new ReportElement();


constructor(
    private router: Router,
    private route: ActivatedRoute,
    private operatorService: OperatorService
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
      this.reportID = repID;
      let c = params.count;
      this.count = c;
      this.clearData();
      this.getData();
      window.scroll(0,0);
    })
  }

  getData(){
    this.operatorService.getNodesByPosition(this.position).subscribe(
      data=>{
        this.list = data;
        this.convert();
        this.getNext();
        this.getNewPositions();
      })
  }

  convert(){
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
    this.postReport();
    switch(this.leaf.type){
      case "S": {
        console.log("Done successfully!");
        this.router.navigate(['/operator'], {relativeTo: this.route });
        //Modify report
        this.updateReport("Sikeresen ért véget!");
        break;
      }
      case "B": {
        console.log("Next branch!");
        if(this.endOfTree){
        this.router.navigate(['/leaf', this.nextPosition, this.reportID, (this.count++)], {relativeTo: this.route });
        } else {
          this.router.navigate(['/suggestion', this.nextPosition, this.reportID, (this.count++)], {relativeTo: this.route });
        }
        break;
      }
      case "E": {
        console.log("No solution for this problem in this tree!");
        this.router.navigate(['/operator'], {relativeTo: this.route });
        //Modify report
        this.updateReport("Sikertelenül ért véget!");
        break;
      }
    }
  }

  updateReport(message: string){
    //Update Report in database
    //Backend doesn't support it yet
  }

  postReport(){
      this.report.answer = this.leaf.content;
      this.report.count = (this.count + 1);
      this.report.report_id = this.reportID;
      this.report.node_id = this.leaf.id;
      this.operatorService.saveReportElement({
		  "id" : this.report.id,
		  "answer" : this.report.answer,
		  "count" : this.report.count,
		  "report_id" : this.report.report_id,
		  "node_id" : this.report.node_id
	  });
    }

}
