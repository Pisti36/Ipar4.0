import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OperatorService } from '../../http/operator.service';
import { Suggestion } from '../../http/response/suggestion';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent implements OnInit {
  ytlinkexists: boolean = true;
  public video: string = "https://www.youtube.com/embed/oHg5SJYRHA0?autoplay=1";
  description: String = "Leírás";
  suggestion: Suggestion;
  
  constructor(
    private router: Router,
    private operatorService: OperatorService
    ) { 
    
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.operatorService.getSuggestion().subscribe(
      data=>{
        this.suggestion = data;
        this.print();
      })
  }

  print(){
    console.log(this.suggestion);
  }

  sendYesAnswer(){
    this.operatorService.sendQuestionAnswer("yes");
    this.toQuestion();
    
  }

  sendNoAnswer(){
    this.operatorService.sendQuestionAnswer("no");
    this.toQuestion();
  }

  toQuestion(){
    this.router.navigate(['/question']);
  }
}
