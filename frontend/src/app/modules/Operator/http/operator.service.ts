import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from './response/question';
import { QuestionRequest } from './request/questionRequest';
import { Suggestion } from './response/suggestion';
import { SuggestionRequest } from './request/suggestionRequest';

@Injectable({
  providedIn: 'root'
})
export class OperatorService {

  private question: string;
  private suggestion: string;

  constructor(private http: HttpClient) { 
    this.question = 'http://vm.ik.bme.hu:15206/question';
    this.suggestion = 'http://vm.ik.bme.hu:15206/suggestion';
  }

  public getQuestion() : Observable<Question>{
    return this.http.get<Question>(this.question)
  }

  public sendQuestionRequest(questionrequest: QuestionRequest) : Observable<Question>{
    return this.http.post<Question>(this.question, questionrequest)
  }

  public getSuggestion() : Observable<Suggestion>{
    return this.http.get<Suggestion>(this.suggestion)
  }

  public sendSuggestionRequest(suggestionrequest: SuggestionRequest) : Observable<Suggestion>{
    return this.http.post<Suggestion>(this.suggestion, suggestionrequest)
  }
}