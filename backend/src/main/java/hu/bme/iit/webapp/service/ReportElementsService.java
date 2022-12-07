package hu.bme.iit.webapp.service;

import hu.bme.iit.webapp.dao.ReportElementsRepository;
import hu.bme.iit.webapp.dao.ReportRepository;
import hu.bme.iit.webapp.domain.MachineStatisticsData;
import hu.bme.iit.webapp.model.Report;
import hu.bme.iit.webapp.model.ReportElements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Transactional
@Service
public class ReportElementsService {
    @Autowired
    ReportElementsRepository repository;
    @Autowired
    ReportRepository reportRepository;

    public ReportElementsService(ReportElementsRepository reportEventRepository) {
        this.repository = reportEventRepository;
    }

    public List<ReportElements> getReportEvents(){
        List<ReportElements> list = new ArrayList<>();
        repository.findAll().forEach(list::add);
        return list;
    }

    public ReportElements findById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public ReportElements save (ReportElements reportEvent){
        return repository.save(reportEvent);
    }


    public void delete(ReportElements reportEvent){
        repository.delete(reportEvent);
    }

    public List<ReportElements> getReportElementsByReportId(Integer id){
        return repository.getReportElementsByReportId(id);
    }
}
