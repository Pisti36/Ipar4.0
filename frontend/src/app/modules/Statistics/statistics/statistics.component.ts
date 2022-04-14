import { Component, OnInit } from '@angular/core';
import { MachineService } from '../../Machines/http/machines.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Machine } from '../../Machines/http/response/machine';
import { MachineEntity } from '../../Machines/http/response/machineEntity';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  selectedMachineType = '';
  selectedMachine = '';
  public machineTypes = [];
  public machines = [];
  public routeId = 1;
  public machineRouteId;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private machineService: MachineService
  ) { }

  ngOnInit(): void {
    this.getMachineTypes();
    this.getMachines();
  }

  select(machineType: Machine){
    console.log(machineType);
    this.routeId = machineType.id;
  }

  selectMachine(machine: MachineEntity){
    this.machineRouteId = machine.id;
  }

  selectStatistics(){
    this.router.navigate(['machinetype', this.routeId], { relativeTo: this.route });
  }

  selectMachineStatistics(){
    this.router.navigate(['machine', this.machineRouteId], { relativeTo: this.route });
  }

  public getMachineTypes(){
    this.machineService.findAll().subscribe(data => {
      this.machineTypes = data;
      this.selectedMachineType = data[0].name;
    })
  }

  public getMachines(){
    this.machineService.listMachineEntities().subscribe(data => {
      this.machines = data;
      this.selectedMachine = data[0].name;
    })
  }
}
