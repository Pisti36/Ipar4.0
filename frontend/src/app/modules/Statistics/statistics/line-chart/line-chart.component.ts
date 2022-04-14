import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { Router, ActivatedRoute } from '@angular/router';
import { MachineService } from 'src/app/modules/Machines/http/machines.service';
import { StatisticsService } from '../../http/statistics.service';
import { Report } from '../../http/response/report';
import { LineChartStatistics } from '../../http/response/lineChartStatistics';
import { MachineEntity } from 'src/app/modules/Machines/http/response/machineEntity';
import * as moment from 'moment';
import { Machine } from 'src/app/modules/Machines/http/response/machine';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  public machinesList: MachineEntity[];
  public reportsList: Report[];
  public list: LineChartStatistics[] = [];
  public editedList: LineChartStatistics[]= [];
  public faultsCount = 0;
  public dataArray = [];
  public monthArray = [];
  public loaded = false;
  public id;
  public machineType = new Machine();

public lineChartData = [];

public lineChartLabels = [];

  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [
        {
      }
    ],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private machineService: MachineService,
    private reportService: StatisticsService) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    this.id = id;
    console.log(id);
    this.getMachineType(id);
    this.getMachinesByType(id);
  }

  getMachineType(id: number){
    this.machineService.find(id).subscribe(data => {
      this.machineType = data;
    })
  }


  public getMachinesByType(id: number){
    this.machineService.listMachinesByMachineTypeId(id).subscribe(
      data => {
        this.machinesList = data;
        console.log(this.machinesList);
        this.getReportsByMachines(this.machinesList);
      }
    )
  }

  public getReportsByMachines(m: MachineEntity[]){
    this.reportService.getReportsByMachine(m).subscribe(
      data => {
        this.reportsList = data;
        console.log(this.reportsList);
        this.createLineChartStatisticsData(m, this.reportsList);
      }
    )
  }

  public createLineChartStatisticsData(m: MachineEntity[], r: Report[]){
    r.forEach(element => {
      const l = new LineChartStatistics();
      l.faultId = element.id;
      l.faultTime = element.time.toString();
      m.forEach(elem => {
        if (element.machineid == elem.id){
          l.commissionDate = elem.commissionDate.toString();
        }
      });
      this.list.push(l);
    });
    console.log(this.list);
    this.getCommissionDates();
  }


  public datesCount = 0;


  public commissionDates = [];
  //Üzembehelyezések időpontjai
  getCommissionDates(){
    const commmissionDatesList= [];
    const elem = new LineChartStatistics;
    this.list.forEach(element =>{
      if (commmissionDatesList.includes(element.commissionDate)){
      } else {
        commmissionDatesList.push(moment(element.commissionDate).format('YYYY-MM-DD'));
      }
    });
    this.commissionDates = commmissionDatesList;
    console.log(this.commissionDates);
    this.scalingDates();
  }
  
  scalingDates(){
    let commissionDatesSorted = [];
    commissionDatesSorted = this.commissionDates.sort();
    console.log(commissionDatesSorted);
    this.editedList = this.list;
    this.editedList.forEach(element => {
      console.log(element);
      if(element.commissionDate!=commissionDatesSorted[0]){
        const a = moment(commissionDatesSorted[0]);
        const b = moment(element.commissionDate);
        const diff = a.diff(b, 'days');
        let o = moment(element.commissionDate, "YYYY-MM-DD").add(diff+1, "days").format('YYYY-MM-DD');
        let oo = moment(element.faultTime, "YYYY-MM-DD").add(diff+1, "days").format('YYYY-MM-DD');
        console.log(diff);
        console.log(o);
        console.log(oo);
        element.commissionDate = moment(o).format('YYYY-MM-DD')
        element.faultTime = moment(oo).format('YYYY-MM-DD')
      }
    });
    console.log(this.editedList);
    this.createMonths(this.editedList);
  }
  
  createMonths(list: LineChartStatistics[]){
    const faultTimeDatesList= [];
    let sortedFaultTimeDatesList= [];
    list.forEach(element => {
      faultTimeDatesList.push(element.faultTime);
    });
    sortedFaultTimeDatesList = faultTimeDatesList.sort();
    console.log(sortedFaultTimeDatesList);
  
    let commissionDateA = moment(list[0].commissionDate);
    let finalFault = moment(sortedFaultTimeDatesList[sortedFaultTimeDatesList.length-1]);
    const diff = finalFault.diff(commissionDateA, 'months');
    console.log(diff); //14 hónap + az üzembehelyezés
  
    let num = 0; 
    let dataArray = Array.from(Array(diff+1), ()=>0);
    console.log(dataArray);
  
    this.editedList.forEach(element => {
        let commissionDateB = moment(list[0].commissionDate);
        let fault = moment(element.faultTime);
        const x = fault.diff(commissionDateB, 'months');
        dataArray[x]++;
    });
    this.dataArray = dataArray;
    this.loaded = true;
    this.lineChartData = [
      { data: this.dataArray, label: 'Hibák száma' }
    ];
    console.log(dataArray);


    let monthArray = Array.from(Array(diff+1), ()=>"");
    for (let i = 0; i< diff+1; i++){
      monthArray[i] = i + ". hónap";
    }
    monthArray[0] = "Üzembehelyezés hónapja";
    this.monthArray = monthArray;

    this.lineChartLabels = this.monthArray;
    console.log(monthArray);

    this.faultsCount = this.editedList.length;
  }
}