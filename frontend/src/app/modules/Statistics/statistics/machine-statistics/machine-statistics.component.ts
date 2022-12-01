import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MachineService } from 'src/app/modules/Machines/http/machines.service';
import { getMatFormFieldDuplicatedHintError } from '@angular/material/form-field';
import { MachineEntity } from 'src/app/modules/Machines/http/response/machineEntity';
import { StatisticsService } from '../../http/statistics.service';
import { Report } from '../../http/response/report';
import { Statistics } from '../../http/response/statistics';
import { ChartOptions } from 'chart.js';
@Component({
  selector: 'app-machine-statistics',
  templateUrl: './machine-statistics.component.html',
  styleUrls: ['./machine-statistics.component.scss']
})
export class MyMachineStatisticsComponent implements OnInit {

  public machine = new MachineEntity();
  public id;
  public reports: Report[] = [];
  public statisticsData: Statistics;
  public reportDuration: number[] = [];
  public avgDuration: number;
  public lastFaultDate: String;
  public timeUntilRepair: String;

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
  public pieChartOptions ={
    responsive: true
  }
  public pieChartLabels = ["Solved", "Unsolved"];
  public barChartType = 'bar';
  public pieChartType = 'pie';
  public ChartLegend = true;
  public solvedArray = [];
  public unsolvedArray = [];
  public comissionDate;

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
    this.getMachine(id);
    this.getStatisticsData(id);
  }

  

  getMachine(id: number){
    this.machineService.findMachine(id).subscribe(data =>{
      this.machine = data;
      this.comissionDate = data.commissionDate;
    })
  }

  getStatisticsData(id: number){
    this.statisticsService.getStatisticsForMachine(id).subscribe(data => {
      console.log("DATA:")
      console.log(data);
      this.statisticsData = data;
      var lastidx = this.statisticsData.reportTimes.length-1;
      this.lastFaultDate = this.statisticsData.reportTimes[lastidx].substring(0,4)+"."+ this.statisticsData.reportTimes[lastidx].substring(5,7)+ "."+ this.statisticsData.reportTimes[lastidx].substring(8,10)+". "+this.statisticsData.reportTimes[lastidx].substring(11,16);
      this.reportDuration = data.reportDuration;
      this.generateDiagrams();
      this.getPredictedRepairTime();
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
    let dataArray = Array.from(Array(maxTimeSinceComission), ()=>0);
    console.log(dataArray);
    let monthArray = Array.from(Array(maxTimeSinceComission), ()=>"");
    console.log(monthArray);
    this.statisticsData.reportsTimesSinceComission.forEach(element =>{
      dataArray[Math.floor(element/30)]++;
    })
    for (let i = 1; i< maxTimeSinceComission; i++){
      monthArray[i] = i+1 + ". hónap";
    }
    monthArray[0] = "Üzembehelyezés hónapja";
    this.comissionDiagramData = [{data: dataArray, label: 'Hibák száma'}];
    this.comissionDiagramLabels = monthArray;
  }

  createDataForRepairTime(){
    for(var i = 0; i < this.statisticsData.reportTimes.length;i++){
      if(this.statisticsData.reportDuration[i] > 86400 || this.statisticsData.reportDuration[i] < 120)
       continue;
      this.repairTimeDiagramData.push({data: Math.ceil(this.statisticsData.reportDuration[i]/60), label: "Javítás ideje (perc)", backgroundColor: 'green', borderColor:'green',  hoverBackgroundColor: 'darkgreen'})
      this.repairTimeDiagramLabels.push(this.statisticsData.reportTimes[i].substring(0,4)+"."+ this.statisticsData.reportTimes[i].substring(5,7)+ "."+ this.statisticsData.reportTimes[i].substring(8,10)+". "+this.statisticsData.reportTimes[i].substring(11,16))
    }
  }

  createDataForNodesVisited(){
    var nodesVisitedData = [];
    var nodesAvgTimeData = [];
    var endNodesData = [];
    var problemNodesData = [];
    this.statisticsData.nodeReports.forEach(report =>
      {
        if(report.summary != null){//ha problem / end node
          if(!report.summary.includes("Root chosen") && !report.summary.includes("Problem: ")){
            var idx = this.endNodesDiagramLabels.indexOf(report.summary);
            if(idx >=0){
              endNodesData[idx]++;
            }
            else{
              this.endNodesDiagramLabels.push(report.summary);
              endNodesData.push(1);
            }
          }
          else{
            var idx = this.problemNodesDiagramLabels.indexOf(report.summary.substring(9));
            if(idx >=0){
              problemNodesData[idx]++;
            }
            else{
              this.problemNodesDiagramLabels.push(report.summary.substring(9));
              problemNodesData.push(1);
            }
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
      this.nodesDiagramData.push({data: nodesVisitedData, label: "Node", backgroundColor: 'darkred', borderColor:'darkred',  hoverBackgroundColor: 'red'})
      
      for(var i =0; i< this.nodesDiagramLabels.length;i++){
        nodesAvgTimeData[i] = Math.ceil((nodesAvgTimeData[i]/nodesVisitedData[i])/60);
      }
      this.nodesDiagramData.push({data: nodesAvgTimeData, label: "Átlagos eltöltött idő a Node-ban (perc)",  backgroundColor: 'blue', borderColor:'blue',  hoverBackgroundColor: 'royalblue'})

      this.endNodesDiagramData.push({data: endNodesData , label: "EndNode", backgroundColor: 'darkviolet', borderColor:'darkviolet',  hoverBackgroundColor: 'violet'})

      this.problemNodesDiagramData.push({data: problemNodesData})
      console.log(this.nodesDiagramData)
  }

  getPredictedRepairTime() {
    const daydifferences = [];
    for(var i = 0; i< this.statisticsData.reportsTimesSinceComission.length-1; i++){
      daydifferences.push(this.statisticsData.reportsTimesSinceComission[i+1] - this.statisticsData.reportsTimesSinceComission[i])
    }
    const mid = Math.floor(daydifferences.length / 2),
    nums = [...daydifferences].sort((a, b) => a - b);
    const median =  daydifferences.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
    console.log(nums);
    const lastdate = new Date(this.statisticsData.reportTimes[this.statisticsData.reportTimes.length-1]);
    const now = new Date();
    var diff = Math.abs(now.getTime() - lastdate.getTime());
    var diffDays = Math.floor(diff / (1000 * 3600 * 24)); 
    diffDays = median-diffDays;
    console.log(diffDays + " nap kell az átvizsgálásig");
    if(diffDays < 0){
      diffDays *= -1;
      this.timeUntilRepair = "A tervezett átvizsgálást "+ diffDays +" nappal ez előtt el kellett volna végezni ezen a gépen." 
    }else if(diffDays == 0){
      this.timeUntilRepair = "A tervezett átvizsgálást a mai napon el kell végezni ezen a gépen." 
    }else{
      this.timeUntilRepair = "A tervezett átvizsgálást "+ diffDays +" napon belül el kell végezni ezen a gépen." 
    }
  }
}