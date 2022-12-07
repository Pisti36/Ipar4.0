package hu.bme.iit.webapp.controller;

import hu.bme.iit.webapp.domain.MachineStatisticsData;
import hu.bme.iit.webapp.model.Report;
import hu.bme.iit.webapp.model.ReportElements;
import hu.bme.iit.webapp.service.ReportElementsService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Controller
@RequestMapping(path="/reportevent")
@RestController
@CrossOrigin(origins = "http://vm.ik.bme.hu:10813")
public class ReportElementsController {
    private ReportElementsService service;

    public ReportElementsController(ReportElementsService reportElementsService) {
        this.service = reportElementsService;
    }

    //ReportEvent hozzáadása
    @PostMapping(path="/add", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ReportElements createReportEvent(@Valid @RequestBody ReportElements request){
        return service.save(request);
    }

    //ReportEventek listázása
    @GetMapping(path="/list")
    public @ResponseBody
    List<ReportElements> getReportEventList(){
        return service.getReportEvents();
    }

    //ReportEvent keresése id alapján
    @GetMapping(path="/list/{id}")
    public @ResponseBody
    ResponseEntity<ReportElements> getReportEventById(@PathVariable(value = "id") Integer id) {
        ReportElements reportEvent = service.findById(id);
        return ResponseEntity.ok().body(reportEvent);
    }

}
