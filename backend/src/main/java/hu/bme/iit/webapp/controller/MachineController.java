package hu.bme.iit.webapp.controller;

import hu.bme.iit.webapp.model.Machine;
import hu.bme.iit.webapp.service.MachineService;
import javassist.NotFoundException;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(path="/machine")
@RestController
@CrossOrigin(origins = "http://10.9.0.97:4200")
public class MachineController {

    private MachineService machineService;

    public MachineController(MachineService machineService) {
        this.machineService = machineService;
    }

    @PostMapping(path="/add", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Machine createMachine(@Valid @RequestBody Machine request){
        return machineService.save(request);
    }

    @GetMapping(path="/list")
    public @ResponseBody
    Iterable<Machine> getMachineList() {
        return machineService.findAll();
    }

    @GetMapping(path="/list/{id}")
    public @ResponseBody
    ResponseEntity<Machine> getMachineById(@PathVariable(value = "id") Integer id) {
        Machine machine = machineService.findById(id);
        return ResponseEntity.ok().body(machine);
    }

    @GetMapping(path = "/find/{machineTypeId}")
    public @ResponseBody
    ResponseEntity<List<Machine>> getMachineByMachineTypeId(@PathVariable(value = "machineTypeId") Integer machineTypeId) {
        List<Machine> machines = machineService.findByMachineTypeId(machineTypeId);
        return ResponseEntity.ok().body(machines);
    }

    @PutMapping(path="/list/{id}")
    public @ResponseBody
    ResponseEntity<Machine> editMachine(@PathVariable(value = "id") Integer id,
                                          @Valid @RequestBody Machine machineDetails) {
        Machine machine = machineService.findById(id);

        machine.setMachineTypeId(machineDetails.getMachineTypeId());
        machine.setName(machineDetails.getName());
        machine.setLine(machineDetails.getLine());
        machine.setFaultsCount(machineDetails.getFaultsCount());
        machine.setStatus(machineDetails.getStatus());
        machine.setMail(machineDetails.getMail());
        machine.setCommissionDate(machineDetails.getCommissionDate());

        final Machine updatedMachine = machineService.save(machine);
        return ResponseEntity.ok().body(updatedMachine);
    }

    //Kérdés törlése
    @DeleteMapping(path="/list/{id}")
    public @ResponseBody
    Map<String, Boolean> deleteMachineById(@PathVariable(value = "id") Integer id) {
        Machine machine = machineService.findById(id);
        machineService.delete(machine);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
