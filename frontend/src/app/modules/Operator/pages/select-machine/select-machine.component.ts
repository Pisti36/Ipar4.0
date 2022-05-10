import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MachineService } from 'src/app/modules/Machines/http/machines.service';
import { MachineEntity } from 'src/app/modules/Machines/http/response/machineEntity'; 

@Component({
  selector: 'app-select-machine',
  templateUrl: './select-machine.component.html',
  styleUrls: ['./select-machine.component.scss']
})
export class SelectMachineComponent implements OnInit {

  machines: MachineEntity[] = [];
  machine_type: string;
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
  this.machine_type = machine.machineTypeId.toString();
}

sendAnswer(){
  console.log("selectedMachine " + this.selectedMachine)
  this.router.navigate(['/problem', this.machine_type],{relativeTo: this.route });
}

}
