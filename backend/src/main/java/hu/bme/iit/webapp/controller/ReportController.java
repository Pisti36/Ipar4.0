package hu.bme.iit.webapp.controller;

import hu.bme.iit.webapp.model.Machines;
import hu.bme.iit.webapp.model.Report;
import hu.bme.iit.webapp.model.Statistics;
import hu.bme.iit.webapp.service.ReportService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping(path="report")
@RestController
@CrossOrigin(origins = "http://vm.ik.bme.hu:10813")
public class ReportController {
    private ReportService service;

    public ReportController(ReportService reportService) {
        this.service = reportService;
    }

    //Report hozzáadása
    @PostMapping(path="/add", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Report createReport(@Valid @RequestBody Report request){
        request.setId(null);
        request.setEndTime(null);
        request.setLastNode(null);
        return service.save(request);
    }

    //Reportok listázása
    @GetMapping(path="/list")
    public @ResponseBody
    List<Report> getReportsList(){
        return service.getReports();
    }

    //Report keresése id alapján
    @GetMapping(path="/list/{id}")
    public @ResponseBody
    ResponseEntity<Report> getReportById(@PathVariable(value = "id") Integer id) {
        Report report = service.findById(id);
        return ResponseEntity.ok().body(report);
    }

    @PutMapping(path="/add", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Report updateReport(@Valid @RequestBody Report request){
        return service.save(request);
    }

    //TODO
    @PostMapping(path="/statistics")
    public @ResponseBody
    List<Report> getMachineTypeStatistic(@Valid @RequestBody List<Machines> machines){
        return service.findFaultsForMachines(machines);
    }

    @GetMapping(path = "/{id}")
    public @ResponseBody
    ResponseEntity<List<Report>> getReportsByMachineId(@PathVariable(value="id") Integer id){
        List<Report> reports = service.findReportsForMachine(id);
        return ResponseEntity.ok().body(reports);
    }

}
