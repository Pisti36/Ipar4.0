import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { OperatorService } from '../../http/operator.service';
import { Node } from '../../http/request/Node';
import { ReportElement } from '../../http/request/ReportElement';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent implements OnInit {
  videxists: boolean = true;
  imgexists: boolean = true;
  suggestion: Node = new Node();
  vidsafeSrc: SafeResourceUrl;
  imgsafeSrc: SafeResourceUrl;
  selectedOption: string;
  question : Node = new Node();
  questionType: number = 2;
  answers: string[] = [];
  public list: Node[];
  position: string;
  answersList: string[] = [];
  nextPositionsType: string[] = [];
  public newList: Node[][] = [];
  private lock: boolean = false;
  

  //report adattagok
  reportID: number;
  count: number;
  report: ReportElement = new ReportElement();
  startTime: Date;
  summary: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private operatorService: OperatorService,
    private sanitizer: DomSanitizer
    ) {

  }

  clearData(){
    this.answers = [];
    this.answersList = [];
    this.nextPositionsType = [];
    this.newList = [];
    console.log("Data cleared");
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let pos = params.position;
      this.position = pos;
      let repID = params.report;
      this.reportID = Number(repID);
      let c = params.count;
      this.count = Number(c);
      this.clearData();
      this.getData();
      window.scroll(0,0);
    })
    
    this.startTime = new Date();
  }

  getData(){
    this.operatorService.getNodesByPosition(this.position).subscribe(
      data=>{
        this.list = data;
        this.convert();
        this.showSuggestions();
        this.getPossibleAnswers();
        this.getNewPositions();
      })
  }

  printNextType(){
    console.log("start Types:");
    let i = 0;
    this.nextPositionsType.forEach( element => {
      console.log(element + " pos: " + i);
      i++;
    })
    console.log("end Types");
  }

  getNewPositions(){
    for(let i = 0; i < this.answersList.length; i++){
      if(i % 2 !== 0 ){
        console.log("pos: " + this.answersList[i]);
        this.operatorService.getNodesByPosition(this.answersList[i]).subscribe(
          data=>{
                  this.newList[Math.ceil(i/2)-1] = data;
                  console.log("New List Data: " + (Math.ceil(i/2)-1))
                  console.log(data);
				  console.log("Request"); 
          this.readNewTypes();
          this.printNextType();
          })
        }
    }
  }

  readNewTypes(){
    this.nextPositionsType = [];
    for(let i = 0; i < this.newList.length; i++){
      console.log("New list " + i + ". tagja: ")
      console.log(this.newList[i])
        this.nextPositionsType.push(this.newList[i][0].type);
    }
  }
  getPossibleAnswers(){
    this.answersList = this.question.next.split("\t");
    console.log(this.answersList);
	this.answers = [];
    for(let i = 0; i < this.answersList.length; i++){
      if(i % 2 == 0){
        this.answers.push(this.answersList[i]);
      }
    }
  }

  convert(){
    this.list.forEach(element => {
      if(element.type == "Q"){
        this.question = element;
      } else if (element.type == "I"){
        this.suggestion = element;
      }
    });
  }

  showSuggestions(){
    if(this.suggestion.video_link=="na" || this.suggestion.video_link==null || this.suggestion.image_link=="")
      this.videxists=false;
    else
    {
      this.videxists=true;
      this.vidsafeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.suggestion.video_link);
    }
    if(this.suggestion.image_link=="na" || this.suggestion.image_link==null || this.suggestion.image_link=="")
      this.imgexists=false;
    else
    {
      this.imgexists=true;
      this.imgsafeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.suggestion.image_link);
    }
  }

  sendAnswer(){
    this.chooseOne(this.selectedOption);
  }

  async chooseOne(s: string){
    let i = 0;
    let flag = true;
    await this.postReport(s);
    console.log( "Type: " + Math.ceil(i / 2));
    this.answersList.forEach( element => {
      if(element == s && flag){
        switch(this.nextPositionsType[Math.ceil(i / 2)]){
          case "Q": {
            console.log("Going to the next question!");
            this.router.navigate(['/suggestion', this.answersList[i+1], this.reportID, (++this.count)], {relativeTo: this.route });
            break;
          }
          case "I": {
            console.log("Going to the next instruction!");
            this.router.navigate(['/suggestion', this.answersList[i+1], this.reportID, (++this.count)], {relativeTo: this.route });
            break;
          }
          case "S": {
            console.log("Going to the finish!");
            this.router.navigate(['/leaf', this.answersList[i+1], this.reportID, (++this.count)], {relativeTo: this.route });
            break;
          }
          case "B": {
            console.log("Going to the break!");
            this.router.navigate(['/leaf', this.answersList[i+1], this.reportID, (++this.count)], {relativeTo: this.route });
            break;
          }
        }
        console.log(s +"-el válaszolt! Position: " + this.answersList[i+1] + "\t  Type: " + this.nextPositionsType[Math.ceil(i / 2)]);
        flag = false;
      }
      i++;
    })
  }

  postReport(answer: string){
    this.report.count = (this.count + 1);
    this.report.report_id = this.reportID;
    this.report.node_id = this.question.id;
    this.report.duration = (new Date().getTime() - this.startTime.getTime())/1000;
    //this.report.summary = this.suggestion.summary;
    this.operatorService.saveReportElement({
		  "id" : null,
		  "report_id" : this.report.report_id,
		  "node_id" : this.report.node_id,
		  "count" : this.report.count,
      "summary" : this.report.summary,
      "duration" : this.report.duration
	  }).subscribe(
      (res)=>{this.report = res; console.log(res)},
      (err)=>{console.log(err)}
    );
  }

}