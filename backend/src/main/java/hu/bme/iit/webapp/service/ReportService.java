package hu.bme.iit.webapp.service;

import hu.bme.iit.webapp.dao.ReportElementsRepository;
import hu.bme.iit.webapp.dao.ReportRepository;
import hu.bme.iit.webapp.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Transactional
@Service
public class ReportService {
    @Autowired
    ReportRepository reportRepository;

    public ReportService(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    public List<Report> getReports(){
        List<Report> list = new ArrayList<>();
        reportRepository.findAll().forEach(list::add);
        return list;
    }

    public Report findById(Integer id) {
        return reportRepository.findById(id).orElse(null);
    }

    public Report save (Report report){
        reportRepository.save(report);
        return report;
    }

    public void delete(Report report){
        reportRepository.delete(report);
    }

    public List<Report> findFaultsForMachines(List<Machines> machines){
        List<Report> list = new ArrayList<>();
        for (Machines m : machines) {
            reportRepository.findReportByMachineId(m.getId()).forEach(list::add);
        }
        return list;
    }

    public List<Report> findReportsForMachine(Integer id){
        List<Report> list = reportRepository.findReportByMachineId(id);
        return list;
    }

}
