package hu.bme.iit.webapp.service;

import hu.bme.iit.webapp.dao.ReportElementsRepository;
import hu.bme.iit.webapp.dao.ReportRepository;
import hu.bme.iit.webapp.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
public class StatisticsService {

    @Autowired
    ReportService reportService;
    @Autowired
    ReportElementsRepository reportElementsRepository;
    @Autowired
    MachinesService machinesService;

    private Integer reportCount = 0;

    public MachineTypeStatistics createStatisticForMachineType(Integer machinetypeid){
        this.reportCount  =0;
        int tempReportCount = 0;
        Statistics statistics = new Statistics();
        List<Integer> reportCount= new ArrayList<>();
        List<String> machinenames = new ArrayList<>();
        List<Machines> machines = machinesService.findByMachineTypeId(machinetypeid);
        for(Machines machine : machines){
            tempReportCount  =this.reportCount;
            statistics = addMachineStatistic(statistics, machine.getId());
            reportCount.add(this.reportCount-tempReportCount);
            machinenames.add(machine.getName());
        }
        MachineTypeStatistics machineTypeStatistics = new MachineTypeStatistics(machinenames, reportCount,statistics);
        return machineTypeStatistics;
    }

    public Statistics createStatisticForMachine(Integer machineid){
        return addMachineStatistic(new Statistics(),machineid);
    }

    public Statistics addMachineStatistic(Statistics statistics, Integer machineid){
        List<Report> machineReports = reportService.findReportsForMachine(machineid);
        Date comissionDate = machinesService.findById(machineid).getCommissionDate();

        int solved = statistics.getSolved(),unsolved = statistics.getUnsolved();
        List<Date> reportTimes= statistics.getReportTimes();
        List<Integer> reportsTimesSinceComission= statistics.getReportsTimesSinceComission();
        List<Integer> reportDuration = statistics.getReportDuration();
        List<NodeReport> nodeReports= statistics.getNodeReports();
        for(Report report : machineReports){
            boolean issolved = false;
            if(report.getStatus().equals("Solved")){
                solved++;
                issolved = true;
            }
            else if(report.getStatus().equals("Unsolved")){
                unsolved++;
            }else{
                continue;
            }
            if(report.getStartTime() != null && report.getEndTime() != null) {
                this.reportCount++;
                reportTimes.add(report.getStartTime());
                reportsTimesSinceComission.add((int) (TimeUnit.MILLISECONDS.toDays(report.getStartTime().getTime() - comissionDate.getTime())));
                reportDuration.add((int) ((report.getEndTime().getTime() - report.getStartTime().getTime()) / 1000));

                List<ReportElements> reportsReportElemnets = reportElementsRepository.getReportElementsByReportId(report.getId());
                for (int i = 0; i < reportsReportElemnets.size(); i++) {
                    ReportElements curr = reportsReportElemnets.get(i);
                    if (curr.getNode_id() != null) {
                        nodeReports.add(new NodeReport(curr.getNode_id(), curr.getSummary(), curr.getDuration()));
                    }
                }
            }
        }
        return new Statistics(solved, unsolved, reportTimes, reportsTimesSinceComission, reportDuration, nodeReports);
    }
}
