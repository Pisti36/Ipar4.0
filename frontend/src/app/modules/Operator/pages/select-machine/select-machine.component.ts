import { DatePipe, getLocaleTimeFormat } from '@angular/common';
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
  report: Report = new Report();
  reportId: string;
  reportsList: Report[] = [];

  constructor(
    private router : Router,
    private route : ActivatedRoute,
    private operatorService: OperatorService,
    private machineService: MachineService,
    private datepipe: DatePipe
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

async sendAnswer(){
  let selectedMachineId
	this.machines.forEach(element => {
      if(element.name == this.selectedMachine){
          this.machine_type = element.machineTypeId;
          selectedMachineId = element.id;
      }
    });
  //Report küldése és id lekérdése, majd átadása
  this.report.status = "Unsolved";
  var now = new Date();
  this.report.startTime = this.datepipe.transform(now, 'yyyy-MM-dd\'T\'HH:mm:ss.SSSZ');
  console.log("Date: " + this.report.startTime);
  this.operatorService.saveReport({
		  "id" : 1,
		  "status" : this.report.status,
      "machineType_id" : this.machine_type,
		  "machine_id" : selectedMachineId,
		  "startTime" : this.report.startTime,
      "endTime" : null,
      "lastNode" : null
	  }).subscribe(
      (res) => {this.report = res ; console.log(res); this.nextHTML();},
      (err) => console.log(err)
    );
  console.log("machine_id: = " + this.machine_type);
  console.log("selectedMachine: = " + this.selectedMachine);
  console.log("reportId: = " + this.reportId);
}

nextHTML(){
  this.reportId = this.report.id.toString();
  console.log("new id = " + this.reportId);
  console.log("selectedMachine: " + this.selectedMachine);
  console.log("selectedMachineId: " + this.machine_type);
  this.router.navigate(['/problem', this.machine_type, this.reportId],{relativeTo: this.route });
}

}
