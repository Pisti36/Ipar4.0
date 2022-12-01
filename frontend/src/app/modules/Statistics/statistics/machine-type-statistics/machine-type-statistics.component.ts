import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { Router, ActivatedRoute } from '@angular/router';
import { MachineService } from 'src/app/modules/Machines/http/machines.service';
import { StatisticsService } from '../../http/statistics.service';
import { Report } from '../../http/response/report';
import { LineChartStatistics } from '../../http/response/lineChartStatistics';
import { BarChartStatistics } from '../../http/response/barChartStatistics';
import { MachineEntity } from 'src/app/modules/Machines/http/response/machineEntity';
import * as moment from 'moment';
import { Machine } from 'src/app/modules/Machines/http/response/machine';
import { Statistics } from '../../http/response/statistics';

@Component({
  selector: 'app-machine-type-statistics',
  templateUrl: './machine-type-statistics.component.html',
  styleUrls: ['./machine-type-statistics.component.scss']
})
export class MachineTypeStatisticsComponent implements OnInit {

  public machineList: MachineEntity[]=[];
  public machineType = new Machine();
  public id;
  public reports: Report[] = [];
  public statisticsData: Statistics;
  public reportDuration: number[] = [];
  public avgDuration: number;
  public lastFaultDate: String;
  public machineNames: String[];
  public machineReportNumbers: number[];

  constructor(
    private route: ActivatedRoute,
    private machineService: MachineService,
    private statisticsService: StatisticsService
  ) { }

  public ChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true
          }
      }]
    }
  };
  public StackedChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    isStacked: true,
    scales: {
      xAxes: [{
         stacked: true 
      }],
      yAxes: [{
         stacked: true 
      }]
   }
  };
  public pieChartOptions ={
    responsive: true,
    tooltip: {
      callbacks: {
        label: function(context) {
          const labelIndex = (context.datasetIndex * 2) + context.dataIndex;
          return context.chart.data.labels[labelIndex] + ': ' + context.formattedValue;
        }
      }
    }
  }
  public pieChartLabels = ["Solved", "Unsolved"];
  public barChartType = 'bar';
  public pieChartType = 'pie';
  public ChartLegend = true;
  public solvedArray = [];
  public unsolvedArray = [];
  public comissionDates = [];

  public pieChartData = [{
    data: this.solvedArray,
    backgroundColor: ['lime','red'], 
    borderColor:['lime','red'],  
    hoverBackgroundColor: ['limegreen','darkred'],
    hoverBorderColor: ['limegreen','darkred']
  }]

  public comissionDiagramData = [];
  public comissionDiagramLabels = [];
  public lineChartType = 'line';

  public repairTimeDiagramData = [];
  public repairTimeDiagramLabels = [];

  public nodesDiagramData = [];
  public nodesDiagramLabels = [];

  public endNodesDiagramData = [];
  public endNodesDiagramLabels = [];

  public problemNodesDiagramData = [];
  public problemNodesDiagramLabels = [];

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    this.id = id;
    this.getMachines(id);
    this.getStatisticsData(id);
  }

  getMachines(id: number){
    this.machineService.find(id).subscribe(data =>{
      this.machineType = data;
    })
    this.machineService.listMachinesByMachineTypeId(id).subscribe(data =>{
      this.machineList = data;
      console.log(this.machineList);
      this.machineList.forEach(machine =>
        this.comissionDates.push(machine.commissionDate));
    })
  }

  getStatisticsData(id: number){
    this.statisticsService.getStatisticsForMachineType(id).subscribe(data => {
      console.log("DATA:")
      console.log(data);
      this.statisticsData = data.statistics;
      this.machineNames = data.machines;
      //this.machineNames.push("Test");
      //this.machineNames.push("Test2");
      this.machineReportNumbers = data.machineReportCount;
      /*this.machineReportNumbers.push(4);
      this.machineReportNumbers.push(3);
      this.machineReportNumbers[0] -= 4;
      this.machineReportNumbers[0] -= 3;*/
      console.log("Names")
      console.log(this.machineNames)
      console.log("Report numbers")
      console.log(this.machineReportNumbers)
      var lastidx = this.statisticsData.reportTimes.length-1;
      this.lastFaultDate = this.statisticsData.reportTimes[lastidx].substring(0,4)+"."+ this.statisticsData.reportTimes[lastidx].substring(5,7)+ "."+ this.statisticsData.reportTimes[lastidx].substring(8,10)+". "+this.statisticsData.reportTimes[lastidx].substring(11,16);
      this.reportDuration = data.statistics.reportDuration;
      this.generateDiagrams();
    })
  }

  generateDiagrams(){
    console.log("Generate Diagrams");
    this.solvedArray.push(this.statisticsData.solved);
    this.solvedArray.push(this.statisticsData.unsolved);
    this.avgDuration = 0;
    var lengthminus =0;
    this.statisticsData.reportDuration.forEach(dur => {
      if(dur < 86400 && dur > 120)
        this.avgDuration += dur;
      else
       lengthminus++;
    });
    this.avgDuration /= (this.statisticsData.reportDuration.length - lengthminus);
    this.avgDuration = Math.ceil(this.avgDuration/60);
    //faults since comission diagram
    this.createDataForSinceComission();
    this.createDataForRepairTime();
    this.createDataForNodesVisited();
    
  }

  createDataForSinceComission(){
    let maxTimeSinceComission = 0;
    for(let i = 0; i < this.statisticsData.reportsTimesSinceComission.length; i++){
      if(this.statisticsData.reportsTimesSinceComission[i] > maxTimeSinceComission)
        maxTimeSinceComission= this.statisticsData.reportsTimesSinceComission[i];
    }
    maxTimeSinceComission = Math.ceil(maxTimeSinceComission/=30) ;

    var iterator =0;
    for(var i =0; i< this.machineNames.length; i++){
      let dataArray = Array.from(Array(maxTimeSinceComission+1), ()=>0);
      var j;
      for(j=0; j< this.machineReportNumbers[i]; j++){
        dataArray[Math.ceil(this.statisticsData.reportsTimesSinceComission[iterator + j]/30)]++;
      }
      iterator +=j;
      this.comissionDiagramData.push({data: dataArray, label: this.machineNames[i] + ' hibáinak száma'});
    }
    
    let monthArray = Array.from(Array(maxTimeSinceComission+1), ()=>"");
    for (let i = 1; i< maxTimeSinceComission + 1; i++){
      monthArray[i] = i + ". hónap";
    }
    monthArray[0] = "Üzembehelyezés hónapja";
    
    this.comissionDiagramLabels = monthArray;
  }

  createDataForRepairTime(){
    for(var i = 0; i < this.statisticsData.reportTimes.length;i++){
      if(this.statisticsData.reportDuration[i] > 86400 || this.statisticsData.reportDuration[i] < 120)
       continue;
      this.repairTimeDiagramData.push({data: Math.ceil(this.statisticsData.reportDuration[i]/60), label: "Javítás ideje (perc)", backgroundColor: 'green', borderColor:'green',  hoverBackgroundColor: 'darkgreen'})
      this.repairTimeDiagramLabels.push(this.statisticsData.reportTimes[i].substring(0,4)+". "+ this.statisticsData.reportTimes[i].substring(5,7)+ ". "+ this.statisticsData.reportTimes[i].substring(8,10)+". "+this.statisticsData.reportTimes[i].substring(11,16))
    }
  }

  createDataForNodesVisited(){
    var nodesVisitedData = [];
    var nodesAvgTimeData = [];
    var endNodesData : number[][] = [];
    var problemNodesData  : number[][] = [];
    var iterator = 0;
    var machineidx = 0;
    for(var i =0; i< this.machineNames.length; i++){
      endNodesData[i] = [];
      problemNodesData[i] = [];
    }
    console.log("empty array")
    console.log(problemNodesData)
    console.log(endNodesData)
    this.statisticsData.nodeReports.forEach(report =>
      {
        if(report.summary != null){//ha problem / end node
          if(!report.summary.includes("Root chosen") && !report.summary.includes("Problem: ")){//end
            var idx = this.endNodesDiagramLabels.indexOf(report.summary);
            if(idx <0){
              this.endNodesDiagramLabels.push(report.summary);
              for(var i = 0;i< this.machineNames.length; i++){
                endNodesData[i].push(0);
              }
              endNodesData[machineidx][this.endNodesDiagramLabels.indexOf(report.summary)]++;
            }
            else{
              endNodesData[machineidx][idx]++
            }
            iterator++;
          }
          else{
            var idx = this.problemNodesDiagramLabels.indexOf(this.machineNames[machineidx] + " " + report.summary.substring(9));
            if(idx <0){
              for(var i = 0; i< this.machineNames.length; i++){
                this.problemNodesDiagramLabels.push(this.machineNames[i] + " " + report.summary.substring(9));
                for(var j = 0; j< this.machineNames.length; j++)
                  problemNodesData[j].push(0);
              }
              console.log("problemnodes data: " + this.problemNodesDiagramLabels.indexOf(this.machineNames[machineidx] + " " + report.summary.substring(9)));
              problemNodesData[machineidx][Math.floor(this.problemNodesDiagramLabels.indexOf(this.machineNames[machineidx] + " " + report.summary.substring(9))/this.machineNames.length)]++;
            }
            else{
              problemNodesData[machineidx][idx]++;
            }
          }
          if(iterator >= this.machineReportNumbers[machineidx]){
            iterator = 0;
            machineidx++;
          }
        }
        else{
          var idx = this.nodesDiagramLabels.indexOf(report.nodeId);
          if(idx >= 0){
            nodesVisitedData[idx]++;
            nodesAvgTimeData[idx] += report.duration;
          }
          else{
            this.nodesDiagramLabels.push(report.nodeId);
            nodesVisitedData.push(1);
            nodesAvgTimeData.push(report.duration);
          }
        }
      });
      
      console.log(this.problemNodesDiagramLabels)
      this.nodesDiagramData.push({data: nodesVisitedData, label: "Node", backgroundColor: 'darkred', borderColor:'darkred',  hoverBackgroundColor: 'red'})
      
      for(var i =0; i< this.nodesDiagramLabels.length;i++){
        nodesAvgTimeData[i] = Math.ceil((nodesAvgTimeData[i]/nodesVisitedData[i])/60);
      }
      this.nodesDiagramData.push({data: nodesAvgTimeData, label: "Átlagos eltöltött idő a Node-ban (perc)",  backgroundColor: 'blue', borderColor:'blue',  hoverBackgroundColor: 'royalblue'})
      console.log("ENDNODES DATA:")
      console.log(endNodesData);
      console.log("PROBLEM DATA:")
      console.log(problemNodesData);
      console.log(this.problemNodesDiagramLabels);
      for(var i =0; i< endNodesData.length; i++){
        this.endNodesDiagramData.push({data: endNodesData[i] , label: this.machineNames[i]})
        this.problemNodesDiagramData.push({data: problemNodesData[i], label:  this.machineNames[i] + " problem"})
      }
      
      console.log(this.nodesDiagramData)
  }
}
