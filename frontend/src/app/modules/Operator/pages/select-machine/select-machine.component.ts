import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MachineService } from 'src/app/modules/Machines/http/machines.service';
import { MachineEntity } from 'src/app/modules/Machines/http/response/machineEntity';
import { OperatorService } from '../../http/operator.service';
import { Report } from '../../http/request/Report';

@Component({
  selector: 'app-select-machine',
  templateUrl: './select-machine.component.html',
  styleUrls: ['./select-machine.component.scss']
})
export class SelectMachineComponent implements OnInit {

  machines: MachineEntity[] = [];
  machine_type: number;
  selectedMachine:string;
  report: Report;
  reportId: string;
  reportsList: Report[] = [];

  constructor(
    private router : Router,
    private route : ActivatedRoute,
    private machineService: MachineService
    ) { }

  ngOnInit(): void {
    this.getMachines();
}

public getMachines(){
  this.machineService.listMachineEntities().subscribe(data => {
    this.machines = data;
    this.selectedMachine = data[0].name;
  })
}

selectMachine(machine : MachineEntity){
  this.machine_type = machine.machineTypeId;
}

sendAnswer(){
	this.machines.forEach(element => {
      if(element.name == this.selectedMachine){
          this.machine_type = element.machineTypeId;
      }
    });
  //Report küldése és id lekérdése, majd átadása
  this.report.status = "Started";
  this.report.user_id = 10; //(User id here, not yet implemented)
  this.report.machine_id = this.machine_type;
  this.report.time = new Date(); //Lehet String-ként kellene
  this.OperatorService.saveReport(this.report);
  this.OperatorService.getReport(this.machine_type).subscribe( res =>{
    this.reportsList = res;
    this.nextHTML();
  });
}

nextHTML(){
  this.reportId = this.reportsList[this.reportsList.length()-1].id;
  console.log("new id = " + this.reportId);
  console.log("selectedMachine: " + this.selectedMachine);
  console.log("selectedMachineId: " + this.machine_type);
  this.router.navigate(['/problem', this.machine_type, this.reportId],{relativeTo: this.route });
}

}
