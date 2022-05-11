import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from './response/question';
import { QuestionRequest } from './request/questionRequest';
import { Suggestion } from './response/suggestion';
import { SuggestionRequest } from './request/suggestionRequest';
import { Node } from './request/Node';

@Injectable({
  providedIn: 'root'
})
export class OperatorService {

  private problem: string;
  private question: string;
  private suggestion: string;
  private byPosition: string;

  constructor(private http: HttpClient) {
    this.problem = 'http://vm.ik.bme.hu:15206/nodes/find_by_type/R';
    this.question = 'http://vm.ik.bme.hu:15206/nodes/find_by_type/Q';
    this.suggestion = 'http://vm.ik.bme.hu:15206/nodes/find_by_type/I';
    this.byPosition = 'http://vm.ik.bme.hu:15206/nodes/find_by_position/';
  }

  public getNodesByPosition(pos: string): Observable<Node[]>{
      return this.http.get<Node[]>(this.byPosition + pos)
  }

  public getQuestion() : Observable<Node>{
    return this.http.get<Node>(this.question)
  }

  public sendQuestionRequest(questionrequest: QuestionRequest) : Observable<Question>{
    return this.http.post<Question>(this.question, questionrequest)
  }

  public getSuggestion() : Observable<Node>{
    return this.http.get<Node>(this.suggestion)
  }

  public sendSuggestionRequest(suggestionrequest: SuggestionRequest) : Observable<Suggestion>{
    return this.http.post<Suggestion>(this.suggestion, suggestionrequest)
  }

  public sendQuestionAnswer(answer: string) : Observable<string>{
    return this.http.post<string>(this.question, answer)
  }

  public sendSuggestionAnswer(answer: string) : Observable<string>{
    return this.http.post<string>(this.suggestion, answer)
  }

  public getProblems() : Observable<Node[]>{
    return this.http.get<Node[]>(this.problem)
  }

  public sendProblemAnswer(answer :string) : Observable<string>{
    return this.http.post<string>(this.problem, answer )
  }
}
