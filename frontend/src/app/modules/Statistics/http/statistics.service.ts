import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from './response/report';
import { MachineEntity } from '../../Machines/http/response/machineEntity';
import { BarChartStatistics } from './response/barChartStatistics';

@Injectable()
export class StatisticsService {

  private reportByMachineUrl: string;
  private statisticsDataByReports: string;

  constructor(private http: HttpClient) {
    this.reportByMachineUrl = 'http://vm.ik.bme.hu:15206/report/statistics/';
    this.statisticsDataByReports = 'http://vm.ik.bme.hu:15206/reportevent/statisticsformachines';
  }

  public getReportsByMachine(machines: MachineEntity[]): Observable<Report[]>{
    return this.http.post<Report[]>(this.reportByMachineUrl, machines)
  }

  public getReportsByMachineId(id: number): Observable<Report[]>{
    return this.http.get<Report[]>(this.reportByMachineUrl + id)
  }

  public getStatisticsForMachines(reports: Report[]): Observable<BarChartStatistics[]>{
    return this.http.post<BarChartStatistics[]>(this.statisticsDataByReports, reports)
  }
}
