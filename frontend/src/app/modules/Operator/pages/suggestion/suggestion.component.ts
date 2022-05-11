import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
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
  public video: string = "https://www.youtube.com/embed/oHg5SJYRHA0?autoplay=1";
  description: String = "Leírás";
  suggestion: Node = new Node();
  vidsafeSrc: SafeResourceUrl;
  imgsafeSrc: SafeResourceUrl;
  selectedOption: string;
  question : Node = new Node();
  questiontext: string  = "Kérdés";
  questionType: number = 1;
  answers: string[] = [];
  public list: Node[];
  position: string;
  answersList: string[] = [];


  constructor(
    private router: Router,
    private operatorService: OperatorService,
    private sanitizer: DomSanitizer
    ) {

  }

  ngOnInit(): void {
    let position = +this.route.snapshot.paramMap.get('position');
    this.getData();
  }

  getData(){
    this.operatorService.getNodesByPosition().subscribe(
      data=>{
        this.list = data;
        this.convert();
        this.showSuggestions();
        this.getPossibleAnswers();
        this.list();
      })
  }

  getPossibleAnswers(){
    answers = question.next.split("\t");
  }

  convert(){
    this.list.forEach(element => {
      if(element.type == "Q"){
        question = element;
      } else if (element.type == "I"){
        suggestion = element;
      }
    });
  }

  print(){
    console.log(this.question);
    console.log(this.suggestion);
  }

  showSuggestions(){
    if(this.suggestion.video_link=="" || this.suggestion.video_link==null)
      this.videxists=false;
    else
    {
      this.videxists=true;
      this.vidsafeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.suggestion.video_link);
    }
    if(this.suggestion.image_link=="" || this.suggestion.image_link==null)
      this.imgexists=false;
    else
    {
      this.imgexists=true;
      this.imgsafeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.suggestion.image_link);
    }
  }

  sendAnswer(){
    this.operatorService.sendQuestionAnswer(this.selectedOption);
    console.log("selectedOption " + this.selectedOption)
    this.toSuggestion();
  }

  sendYesAnswer(){
    this.operatorService.sendQuestionAnswer("yes");
    this.toSuggestion();

  }

  sendNoAnswer(){
    this.operatorService.sendQuestionAnswer("no");
    this.toSuggestion();
  }

  toSuggestion(){
    this.router.navigate(['/suggestion']);
  }

}
