import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FaultDiagramService } from '../../http/faultdiagram.service';
import { Question } from '../../http/response/question';
import { FaultDiagram } from '../../http/response/faultdiagram';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-fault-diagram',
  templateUrl: './edit-fault-diagram.component.html',
  styleUrls: ['./edit-fault-diagram.component.scss']
})
export class EditFaultDiagramComponent implements OnInit {
  id = null;
  questions: Question[];
  diagram: FaultDiagram;
  newDiagram: FaultDiagram = new FaultDiagram();
  newQuestion: Question = new Question();
  showMainContent: Boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private faultService: FaultDiagramService,
    private http: HttpClient,
    private renderer:Renderer2
  ) { }

  editFaultDiagram = new FormGroup({
    diagramName: new FormControl(),
    machineType: new FormControl()
  });

  addNewQuestion = new FormGroup({
    questionId: new FormControl(),
    questionName: new FormControl(),
    questionType: new FormControl(),
    leafSolution: new FormControl(),
    imageLink: new FormControl(),
    imageLinkSuggestion: new FormControl(),
    videoLink: new FormControl(),
    videoLinkSuggestion: new FormControl(),
  });

  showForm(){
    this.showMainContent = this.showMainContent ? false : true;
  }

  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get('id');
    this.id = id;
    this.getQuestionsByMachineType(id);
    this.getFaultName(id);
  }

  getQuestionsByMachineType(id: number){
    this.faultService.findQuestionsByMachineType(id).subscribe(res => {
      this.questions = res;
    })
  }

  getFaultName(id: number){
    this.faultService.findDiagram(id).subscribe(res =>{
      this.diagram = res;
    })
  }

  onSubmit(text: string): void {
    if (text == "editFaultDiagram"){
      this.newDiagram.id = this.diagram.id;
      this.newDiagram.fault_name = this.editFaultDiagram.get('diagramName').value;
      this.newDiagram.machine_type = this.editFaultDiagram.get('machineType').value;
      
      this.faultService.editDiagram(this.newDiagram).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
    } else if (text == "newQuestion"){
      this.newQuestion.question_id = this.addNewQuestion.get('questionId').value;
      this.newQuestion.diagram_id = this.diagram.id;
      this.newQuestion.question = this.addNewQuestion.get('questionName').value;
      this.newQuestion.question_type = this.addNewQuestion.get('questionType').value;
      this.newQuestion.leaf_solution = this.addNewQuestion.get('leafSolution').value;
      this.newQuestion.image_link = this.addNewQuestion.get('imageLink').value;
      this.newQuestion.image_link_suggestion = this.addNewQuestion.get('imageLinkSuggestion').value;
      this.newQuestion.video_link = this.addNewQuestion.get('videoLink').value;
      this.newQuestion.video_link_suggestion = this.addNewQuestion.get('videoLinkSuggestion').value;

      this.faultService.saveQuestion(this.newQuestion).subscribe(
        () => this.getQuestionsByMachineType(this.id)
      );
    }
  }


  editField: string;

  findById(question: Question){
    this.faultService.findQuestion(question.id).subscribe();
  }

  updateList(id: number, property: string, event: any, question: Question) {
      const editField = event.target.textContent;
      console.log(question.id);
      console.log(property);
      if (property == 'question_id'){
        question.question_id = editField;
        this.faultService.editQuestion(question).subscribe(
          (res) => console.log(res),
          (err) => console.log(err)
        );
      }
      else if (property == 'question'){
        question.question = editField;
        this.faultService.editQuestion(question).subscribe(
          (res) => console.log(res),
          (err) => console.log(err)
        );
      }
      else if (property == 'leaf_solution'){
        question.leaf_solution = editField;
        this.faultService.editQuestion(question).subscribe(
          (res) => console.log(res),
          (err) => console.log(err)
        );
      }
      else if (property == 'image_link'){
        question.image_link = editField;
        this.faultService.editQuestion(question).subscribe(
          (res) => console.log(res),
          (err) => console.log(err)
        );
      }
      else if (property == 'image_link_suggestion'){
        question.image_link_suggestion = editField;
        this.faultService.editQuestion(question).subscribe(
          (res) => console.log(res),
          (err) => console.log(err)
        );
      }
      else if (property == 'video_link'){
        question.video_link = editField;
        this.faultService.editQuestion(question).subscribe(
          (res) => console.log(res),
          (err) => console.log(err)
        );
      }
      else if (property == 'video_link_suggestion'){
        question.video_link_suggestion = editField;
        this.faultService.editQuestion(question).subscribe(
          (res) => console.log(res),
          (err) => console.log(err)
        );
      }
  }

  delete(question: Question){
    this.faultService.deleteQuestion(question).subscribe(
      () => this.getQuestionsByMachineType(this.id)
    );
  }

}
