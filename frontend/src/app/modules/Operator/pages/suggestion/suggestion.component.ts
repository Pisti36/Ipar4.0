import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { OperatorService } from '../../http/operator.service';
import { Node } from '../../http/request/Node';

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
  public newList: Node[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private operatorService: OperatorService,
    private sanitizer: DomSanitizer
    ) {

  }

  ngOnInit(): void {
    let position = +this.route.snapshot.paramMap.get('position');
    this.position = position.toString();
    this.getData();
  }

  getData(){
    this.operatorService.getNodesByPosition(this.position).subscribe(
      data=>{
        this.list = data;
        this.convert();
        this.showSuggestions();
        this.getPossibleAnswers();
        this.print();
        this.getNewPositions();
      })
  }

  printNextType(){
    console.log("start Types:");
    this.nextPositionsType.forEach( element => {
      console.log(element);
    })
    console.log("end Types");
  }

  getNewPositions(){
    for(int i = 0; i < this.answersList.length; i++){
      if(i % 2 !== 0){
        this.operatorService.getNodesByPosition(this.position).subscribe(
          data=>{
                  this.newList = data;
                  this.nextPositionsType.push(this.newList[0].type);
          })
      }
    }
  }

  getPossibleAnswers(){
    this.answersList = this.question.next.split("\t");
    console.log(this.answersList);
    for(int i = 0; i < this.answersList.length; i++){
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

  print(){
    console.log(this.question);
    console.log(this.suggestion);
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
    console.log("selectedOption: " + this.selectedOption)
  }

  boolChooseOne(s: string){
  if(this.answersList[0] == s){
        console.log(s +"-el válaszolt! Pos1: " + this.answersList[1]);
      } else if(this.answersList[2] == s){
        console.log(s +"-el válaszolt! Pos3: " + this.answersList[3]);
      }
  }

}
