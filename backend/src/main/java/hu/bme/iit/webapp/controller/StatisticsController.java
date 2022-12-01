package hu.bme.iit.webapp.controller;

import hu.bme.iit.webapp.model.MachineTypeStatistics;
import hu.bme.iit.webapp.model.Report;
import hu.bme.iit.webapp.model.Statistics;
import hu.bme.iit.webapp.service.ReportService;
import hu.bme.iit.webapp.service.StatisticsService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping(path="statistics")
@RestController
@CrossOrigin(origins = "http://vm.ik.bme.hu:10813")
public class StatisticsController {
    private StatisticsService service;

    public StatisticsController(StatisticsService service) {
        this.service = service;
    }

    @GetMapping(path = "/machine/{id}")
    public @ResponseBody
    ResponseEntity<Statistics> getStatisticsByMachineId(@PathVariable(value="id") Integer id){
        Statistics statistics = service.createStatisticForMachine(id);
        return ResponseEntity.ok().body(statistics);
    }

    @GetMapping(path = "/machinetype/{machinetype_id}")
    public @ResponseBody
    ResponseEntity<MachineTypeStatistics> getStatisticsByMachineTypeId(@PathVariable(value="machinetype_id") Integer id){
        MachineTypeStatistics statistics = service.createStatisticForMachineType(id);
        return ResponseEntity.ok().body(statistics);
    }
}
