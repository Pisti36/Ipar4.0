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

    public List<MachineStatisticsData> getStatisticsByMachineId(List<Report> reports){
        List<MachineStatisticsData> statisticsData = new ArrayList<>();
        for (Report re: reports) {
            //reportEventRepository.getStatisticsByMachineId(re.getId());
            Integer id = repository.getStatisticsByMachineId(re.getId());
            MachineStatisticsData mData = new MachineStatisticsData();
            mData.setMachineid(re.getMachine_id());
            mData.setReport_id(re.getId());
            mData.setStatus(re.getStatus());
            mData.setDiagram_id(id);
            statisticsData.add(mData);
        }
        return statisticsData;
    }

    public void delete(ReportElements reportEvent){
        repository.delete(reportEvent);
    }

    public List<ReportElements> findReportElementsByMachine(Integer machineid) {
        List<ReportElements> reportsbymachine = new ArrayList<>();
        List<Integer> ids = reportRepository.getIdsByMachine(machineid);
        for(Integer id : ids ) {
            reportsbymachine.addAll(repository.getReportElementsByReportId(id));
        }
        return reportsbymachine;
    }
}
