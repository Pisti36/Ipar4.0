import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MachineService } from '../http/machines.service';
import { Machine } from '../http/response/machine';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.scss']
})
export class MachinesComponent implements OnInit {

  machines: Machine[];
  
  constructor(private router: Router,
    private machineService: MachineService) { }

  ngOnInit(): void {
    this.getData();
  }

  print(){
    console.log(this.machines);
  }

  getData(){
    this.machineService.findAll().subscribe(data => {
      this.machines = data;
      this.print();
    })
  }

  
  delete(machine: Machine): void{
    this.machineService.delete(machine.id).subscribe(
      () => {
        this.getData();
      }
    );
  }

}
