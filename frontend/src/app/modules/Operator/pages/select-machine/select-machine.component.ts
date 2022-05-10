import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OperatorService } from '../../http/operator.service';

@Component({
  selector: 'app-select-machine',
  templateUrl: './select-machine.component.html',
  styleUrls: ['./select-machine.component.scss']
})
export class SelectMachineComponent implements OnInit {

  selectedOption:string;
  machineIDs: string[];

  constructor(
    private router : Router, 
    private operatorService: OperatorService
    ) { }

  ngOnInit(): void {
    this.operatorService.getProblems().subscribe(res => {
      this.machineIDs = res;
    });
      
}

sendAnswer(){
  this.operatorService.sendProblemAnswer(this.selectedOption);
  console.log("selectedOption " + this.selectedOption)
  this.router.navigate(['/problem']);
}

}
