import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MachineService } from 'src/app/modules/Machines/http/machines.service';
import { getMatFormFieldDuplicatedHintError } from '@angular/material/form-field';
import { MachineEntity } from 'src/app/modules/Machines/http/response/machineEntity';
import { StatisticsService } from '../../http/statistics.service';
import { Report } from '../../http/response/report';
import { BarChartStatistics } from '../../http/response/barChartStatistics';
import { FaultDiagramService } from 'src/app/modules/FaultDiagram/http/faultdiagram.service';
import { FaultDiagram } from 'src/app/modules/FaultDiagram/http/response/faultdiagram';
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class MyBarChartComponent implements OnInit {

  public machine = new MachineEntity();
  public id;
  public reports: Report[] = [];
  public statisticsData: BarChartStatistics[] = [];
  public machineTypeOfTheMachine = null;
  public diagrams: FaultDiagram[] = [];
  public barChartLabelXData = [];
  public barChartLabelData = [];

  public barChartLabelYData = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private machineService: MachineService,
    private statisticsService: StatisticsService,
    private faultDiagramService: FaultDiagramService
  ) { }
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public solvedArray = [];
  public unsolvedArray = [];

  public barChartData = [
    {
        label: "Solved",
        data: this.solvedArray
    },
    {
        label: "Unsolved",
        data: this.unsolvedArray
    }
  ]
  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    this.id = id;
    this.getMachine(id);
    this.getReports(id);
  }

  getTypeOfMachine(id: number){
    this.machineService.getMachine(id).subscribe(data => {
      this.machineTypeOfTheMachine = data.machineTypeId;
      this.getDiagramsByMachineType(data.machineTypeId);
    })
  }

  getMachine(id: number){
    this.machineService.findMachine(id).subscribe(data =>{
      this.machine = data;
    })
  }

  setDiagramLabels(){
    console.log(this.barChartLabelXData);
    this.barChartLabels = this.barChartLabelXData;

  }

  getReports(id: number){
    this.statisticsService.getReportsByMachineId(id).subscribe(data => {
      this.reports = data;
      this.getStatisticsData(data);
      console.log(data);
    })
  }

  getStatisticsData(reports: Report[]){
    this.statisticsService.getStatisticsForMachines(reports).subscribe(data => {
      this.statisticsData = data;
      this.getTypeOfMachine(this.id)
      console.log(data);
    })
  }

  generateDiagram(){
    for (let j = 0; j< this.barChartLabelData.length; j++){
      this.solvedArray.push(0);
      this.unsolvedArray.push(0);
    }
    console.log(this.barChartLabelData);
    console.log(this.statisticsData);
    for (let i = 0; i<this.statisticsData.length; i++){
      for (let j = 0; j< this.barChartLabelData.length; j++){
        if(this.statisticsData[i].diagram_id == this.barChartLabelData[j].id){
          if(this.statisticsData[i].status == 'SOLVED'){
            this.solvedArray[j] +=1;
          } else {
            this.unsolvedArray[j] +=1;
          }
        }
      }    
    }
    console.log(this.solvedArray);
    console.log(this.unsolvedArray);
  }

  getDiagramsByMachineType(id: number){
    this.faultDiagramService.diagramsByMachineType(id).subscribe(data => {
      this.diagrams = data;
      data.forEach(element => {
        this.barChartLabelData.push(element);
        this.barChartLabelXData.push(element.fault_name);
      });
      this.setDiagramLabels();
      this.generateDiagram();
    })
  }
}