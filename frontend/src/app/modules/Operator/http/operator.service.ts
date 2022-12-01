import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Question } from './response/question';
import { QuestionRequest } from './request/questionRequest';
import { Suggestion } from './response/suggestion';
import { SuggestionRequest } from './request/suggestionRequest';
import { Node } from './request/Node';
import { Report } from './request/Report';
import { ReportElement } from './request/ReportElement';

@Injectable({
  providedIn: 'root'
})
export class OperatorService {

  private backendURL: string;
  private problem: string;
  private question: string;
  private suggestion: string;
  private byPosition: string;

  private reportById: string;
  private report: string;
  private addReport: string;
  private addReportElement: string;

  constructor(private http: HttpClient) {
    this.backendURL = 'http://vm.ik.bme.hu:15206';
    this.problem = this.backendURL + '/nodes/find_by_type/R';
    this.question =  this.backendURL + '/nodes/find_by_type/Q';
    this.suggestion =  this.backendURL + '/nodes/find_by_type/I';
    this.byPosition =  this.backendURL + '/nodes/find_by_position/';

    this.reportById = this.backendURL + '/report/list/'
    this.report =  this.backendURL + '/report/';
    this.addReport =  this.backendURL + '/report/add';
    this.addReportElement =  this.backendURL + '/reportevent/add/';
  }

  public saveReportElement(reportElement: ReportElement): Observable<ReportElement> {
   return this.http.post<ReportElement>(this.addReportElement, JSON.stringify(reportElement), {headers: {'Content-Type': 'application/json'}} )
  }

  public saveReport(report: Report) : Observable<Report>{
   return this.http.post<Report>(this.addReport, JSON.stringify(report), {headers: {'Content-Type': 'application/json'}})
  }

  public updateReport(report: Report) : Observable<Report>{
    return this.http.put<Report>(this.addReport, JSON.stringify(report), {headers: {'Content-Type': 'application/json'}})
  }

  public getReport(pos: number): Observable<Report[]>{
        return this.http.get<Report[]>(this.report + pos)
  }

  public getReportById(id: number): Observable<Report>{
    return this.http.get<Report>(this.reportById + id)
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
