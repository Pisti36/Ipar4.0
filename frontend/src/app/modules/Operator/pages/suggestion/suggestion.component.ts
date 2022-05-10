import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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
  suggestion: Suggestion = new Suggestion();
  safeSrc: SafeResourceUrl;
  
  constructor(
    private router: Router,
    private operatorService: OperatorService,
    private sanitizer: DomSanitizer
    ) { 
    
  }

  ngOnInit(): void {
    this.getData();
    if(this.suggestion.videolink=="" || this.suggestion.videolink==null)
      this.ytlinkexists=false;
    else
    {
      this.ytlinkexists=true;
      this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.suggestion.videolink);
    }
      
    
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
    console.log("lolasdad");
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
