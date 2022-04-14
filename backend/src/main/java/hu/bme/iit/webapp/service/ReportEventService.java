package hu.bme.iit.webapp.service;

import hu.bme.iit.webapp.dao.ReportEventRepository;
import hu.bme.iit.webapp.domain.MachineStatisticsData;
import hu.bme.iit.webapp.model.Report;
import hu.bme.iit.webapp.model.ReportEvent;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Transactional
@Service
public class ReportEventService {
    ReportEventRepository reportEventRepository;

    public ReportEventService(ReportEventRepository reportEventRepository) {
        this.reportEventRepository = reportEventRepository;
    }

    public List<ReportEvent> getReportEvents(){
        List<ReportEvent> list = new ArrayList<>();
        reportEventRepository.findAll().forEach(list::add);
        return list;
    }

    public ReportEvent findById(Integer id) {
        return reportEventRepository.findById(id).orElse(null);
    }

    public ReportEvent save (ReportEvent reportEvent){
        reportEventRepository.save(reportEvent);
        return reportEvent;
    }

    public List<MachineStatisticsData> getStatisticsByMachineId(List<Report> reports){
        List<MachineStatisticsData> statisticsData = new ArrayList<>();
        for (Report re: reports) {
            //reportEventRepository.getStatisticsByMachineId(re.getId());
            Integer id = reportEventRepository.getStatisticsByMachineId(re.getId());
            MachineStatisticsData mData = new MachineStatisticsData();
            mData.setMachineid(re.getMachineid());
            mData.setReport_id(re.getId());
            mData.setStatus(re.getStatus());
            mData.setDiagram_id(id);
            statisticsData.add(mData);
        }
        return statisticsData;
    }

    public void delete(ReportEvent reportEvent){
        reportEventRepository.delete(reportEvent);
    }

}
