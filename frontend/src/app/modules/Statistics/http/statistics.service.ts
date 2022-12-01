import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from './response/report';
import { MachineEntity } from '../../Machines/http/response/machineEntity';
import { BarChartStatistics } from './response/barChartStatistics';
import { Statistics } from './response/statistics';
import { MachineTypeStatistics } from './response/machineTypeStatistics';

@Injectable()
export class StatisticsService {

  private backendURL: string; 
  private reportByMachineUrl: string;
  private statisticsDataByReports: string;
  private statisticsForMachine: string;
  private statisticsForMachineType: string;

  constructor(private http: HttpClient) {
    this.backendURL = 'http://vm.ik.bme.hu:15206';
    this.reportByMachineUrl = this.backendURL + '/statistics/';
    this.statisticsDataByReports = this.backendURL + '/reportevent/statisticsformachines';
    this.statisticsForMachine = this.backendURL + '/statistics/machine/';
    this.statisticsForMachineType = this.backendURL + '/statistics/machinetype/';
  }

  public getReportsByMachine(machines: MachineEntity[]): Observable<Report[]>{
    return this.http.post<Report[]>(this.reportByMachineUrl, machines)
  }

  public getReportsByMachineId(id: number): Observable<Report[]>{
    return this.http.get<Report[]>(this.reportByMachineUrl + id)
  }

  public getStatisticsForMachine(id: number): Observable<Statistics>{
    return this.http.get<Statistics>(this.statisticsForMachine + id)
  }

  public getStatisticsForMachineType(id: number): Observable<MachineTypeStatistics>{
    return this.http.get<MachineTypeStatistics>(this.statisticsForMachineType + id)
  }
}
