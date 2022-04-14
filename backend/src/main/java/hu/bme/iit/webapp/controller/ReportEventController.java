package hu.bme.iit.webapp.controller;

import hu.bme.iit.webapp.domain.MachineStatisticsData;
import hu.bme.iit.webapp.model.Report;
import hu.bme.iit.webapp.model.ReportEvent;
import hu.bme.iit.webapp.service.ReportEventService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Controller
@RequestMapping(path="reportevent")
@RestController
@CrossOrigin(origins = "http://10.9.0.97:4200")
public class ReportEventController {
    private ReportEventService reportEventService;

    public ReportEventController(ReportEventService reportEventService) {
        this.reportEventService = reportEventService;
    }

    //ReportEvent hozzáadása
    @PostMapping(path="/add", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ReportEvent createReportEvent(@Valid @RequestBody ReportEvent request){
        return reportEventService.save(request);
    }

    //ReportEventek listázása
    @GetMapping(path="/list")
    public @ResponseBody
    List<ReportEvent> getReportEventList(){
        return reportEventService.getReportEvents();
    }

    //ReportEvent keresése id alapján
    @GetMapping(path="/list/{id}")
    public @ResponseBody
    ResponseEntity<ReportEvent> getReportEventById(@PathVariable(value = "id") Integer id) {
        ReportEvent reportEvent = reportEventService.findById(id);
        return ResponseEntity.ok().body(reportEvent);
    }

    @PostMapping(path = "/statisticsformachines")
    public @ResponseBody
    ResponseEntity<List<MachineStatisticsData>> getStatisticsByMachineId(@Valid @RequestBody List<Report> reports){
        List<MachineStatisticsData> list = reportEventService.getStatisticsByMachineId(reports);
        return ResponseEntity.ok().body(list);
    }

}
