package hu.bme.iit.webapp.service;

import hu.bme.iit.webapp.dao.ReportElementsRepository;
import hu.bme.iit.webapp.domain.MachineStatisticsData;
import hu.bme.iit.webapp.model.Report;
import hu.bme.iit.webapp.model.ReportElements;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Transactional
@Service
public class ReportElementsService {
    ReportElementsRepository repository;

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
        repository.save(reportEvent);
        return reportEvent;
    }

    public List<MachineStatisticsData> getStatisticsByMachineId(List<Report> reports){
        List<MachineStatisticsData> statisticsData = new ArrayList<>();
        for (Report re: reports) {
            //reportEventRepository.getStatisticsByMachineId(re.getId());
            Integer id = repository.getStatisticsByMachineId(re.getId());
            MachineStatisticsData mData = new MachineStatisticsData();
            mData.setMachineid(re.getMachineid());
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

}
