import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MachineService } from 'src/app/modules/Machines/http/machines.service';
import { MachineEntity } from 'src/app/modules/Machines/http/response/machineEntity';
import { OperatorService } from '../../http/operator.service';

@Component({
  selector: 'app-select-machine',
  templateUrl: './select-machine.component.html',
  styleUrls: ['./select-machine.component.scss']
})
export class SelectMachineComponent implements OnInit {

  public machines = [];
  public machine_type;
  selectedMachine:string;

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
  console.log("selectedMachine " + this.selectedMachine)
  this.router.navigate(['/problem', this.machine_type],{relativeTo: this.route });
}

}