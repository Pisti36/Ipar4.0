import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FaultDiagram } from './response/faultdiagram';
import { Question } from './response/question';

@Injectable()
export class FaultDiagramService {

  private backendURL: string;
  private diagramListUrl: string;
  private diagramAddUrl: string;
  private diagramDeleteUrl: string;
  private questionByMachineTypeUrl: string;
  private editQuestionUrl: string;
  private saveQuestionUrl: string;
  private diagramsByMachineTypeUrl: string;

  constructor(private http: HttpClient) {
    this.backendURL = 'http://vm.ik.bme.hu:15206'
    this.diagramListUrl = this.backendURL + '/faultdiagram/list';
    this.diagramAddUrl = this.backendURL + '/faultdiagram/add';
    this.diagramDeleteUrl = this.backendURL + '/faultdiagram/list/';
    this.questionByMachineTypeUrl = this.backendURL + '/question/find/'
    this.editQuestionUrl = this.backendURL + '/question/list/'
    this.saveQuestionUrl = this.backendURL + '/question/add'
    this.diagramsByMachineTypeUrl = this.backendURL + '/faultdiagram/diagrams/'
  }

  public findAll(): Observable<FaultDiagram[]> {
    return this.http.get<FaultDiagram[]>(this.diagramListUrl);
  }

  public save(diagram: FaultDiagram) {
    return this.http.post<FaultDiagram>(this.diagramAddUrl, diagram);
  }

  public delete(id: number) {
    return this.http.delete<FaultDiagram>(this.diagramDeleteUrl + id);
  }

  public findDiagram(id: number) {
    return this.http.get<FaultDiagram>(this.diagramDeleteUrl + id);
  }

  public editDiagram(diagram: FaultDiagram) {
    return this.http.put<FaultDiagram>(this.diagramDeleteUrl + diagram.id, diagram);
  }

  public findQuestionsByMachineType(id: number) {
    return this.http.get<Question[]>(this.questionByMachineTypeUrl + id);
  }

  public editQuestion(question: Question){
    return this.http.put<Question>(this.editQuestionUrl + question.id, question)
  }

  public findQuestion(id: number){
    return this.http.get<Question>(this.editQuestionUrl + id);
  }

  public saveQuestion(question: Question){
    return this.http.post<Question>(this.saveQuestionUrl, question);
  }

  public deleteQuestion(question: Question){
    return this.http.delete<Question>(this.editQuestionUrl + question.id)
  }

  public diagramsByMachineType(id: number){
    return this.http.get<FaultDiagram[]>(this.diagramsByMachineTypeUrl + id)
  }

}
