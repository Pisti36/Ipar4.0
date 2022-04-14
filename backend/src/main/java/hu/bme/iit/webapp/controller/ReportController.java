package hu.bme.iit.webapp.controller;

import hu.bme.iit.webapp.model.Machine;
import hu.bme.iit.webapp.model.Report;
import hu.bme.iit.webapp.service.ReportService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Controller
@RequestMapping(path="report")
@RestController
@CrossOrigin(origins = "http://10.9.0.97:4200")
public class ReportController {
    private ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    //Report hozzáadása
    @PostMapping(path="/add", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Report createReport(@Valid @RequestBody Report request){
        return reportService.save(request);
    }

    //Reportok listázása
    @GetMapping(path="/list")
    public @ResponseBody
    List<Report> getReportsList(){
        return reportService.getReports();
    }

    //Report keresése id alapján
    @GetMapping(path="/list/{id}")
    public @ResponseBody
    ResponseEntity<Report> getReportById(@PathVariable(value = "id") Integer id) {
        Report report = reportService.findById(id);
        return ResponseEntity.ok().body(report);
    }

    //TODO
    @PostMapping(path="/statistics")
    public @ResponseBody
    List<Report> getMachineTypeStatistic(@Valid @RequestBody List<Machine> machines){
            List<Report> faults = reportService.findFaultsForMachines(machines);
            return faults;
    }

    @GetMapping(path = "statistics/{id}")
    public @ResponseBody
    ResponseEntity<List<Report>> getReportsByMachineId(@PathVariable(value="id") Integer id){
        List<Report> reports = reportService.findReportsForMachine(id);
        return ResponseEntity.ok().body(reports);
    }
    //TODO: ilyen nem kell
    //DELETE sem kell
    /*
    //Report módosítása
    @PutMapping(path="/list/{id}")
    public @ResponseBody
    ResponseEntity<Report> editReport(@PathVariable(value ="id") Integer id,
                                      @Valid @RequestBody Report reportDetails) {
        Report report = reportService.findById(id);

        report.setStatus((reportDetails.getStatus()));
        report.setMachineid(reportDetails.getMachineid());
        report.setUser(reportDetails.getUser());
        report.setTime(reportDetails.getTime());

        final Report updatedReport = reportService.save(report);
        return ResponseEntity.ok().body(updatedReport);
    }
    */

}
