import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OperatorService } from '../../http/operator.service';
import { Question } from '../../http/response/question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  selectedOption: string;
  question : Question = new Question();
  questiontext: string  = "Kérdés";
  questionType: number = 1;
  
  constructor(
    private router: Router,
    private operatorService: OperatorService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.operatorService.getQuestion().subscribe(data =>{
      this.question = data;
      this.print();
    })
  }

  print(){
    console.log(this.question);
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
