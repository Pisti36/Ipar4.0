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
  public newList: Node[][] = [];

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
      if(i % 2 !== 0){
        console.log("pos: " + this.answersList[i]);
        this.operatorService.getNodesByPosition(this.answersList[i]).subscribe(
          data=>{
                  this.newList[i] = data;
				console.log("Request");
				if(i >= this.answersList.length - 1){
					this.readNewTypes();
					this.printNextType();
				}
          })
      }
    }
  }

  readNewTypes(){
    for(let i = 0; i < this.newList.length; i++){
      if(i % 2 !== 0){
        this.nextPositionsType.push(this.newList[i][0].type);
      }
    }
  }
  getPossibleAnswers(){
    this.answersList = this.question.next.split("\t");
    console.log(this.answersList);
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
    this.chooseOne(selectedOption);
  }

  chooseOne(s: string){
    let i = 0;
    let flag = true;
    this.answersList.forEach( element => {
      if(element == s && flag){
        switch(this.nextPositionsType[Math.ceil(i / 2)]){
          case "Q", "I": {
            console.log("Going to the next question and instruction!");
            //this.router.navigate(['/suggestion', this.answersList[i+1]], {relativeTo: this.route });
          }
          case "S", "B": {
            console.log("Going to the leaf!");
            //this.router.navigate(['/suggestion', this.answersList[i+1]], {relativeTo: this.route });
          }
        }
        console.log(s +"-el válaszolt! Position: " + this.answersList[i+1] + "\t  Type: " + this.nextPositionsType[Math.ceil(i / 2)]);
        flag = false;
      }
      i++;
    })
  }

}
