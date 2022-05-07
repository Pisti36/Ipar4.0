package hu.bme.iit.webapp.controller;

import hu.bme.iit.webapp.model.Machines;
import hu.bme.iit.webapp.service.MachinesService;
import javassist.NotFoundException;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path="/machines")
@CrossOrigin(origins = "http://vm.ik.bme.hu:10813")
public class MachinesController {

    private MachinesService service;

    public MachinesController(MachinesService machinesService) {
        this.service = machinesService;
    }

    @PostMapping(path="/add", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Machines createMachine(@Valid @RequestBody Machines request){
        return service.save(request);
    }

    @GetMapping(path="/list")
    public @ResponseBody
    Iterable<Machines> getMachineList() {
        return service.findAll();
    }

    @GetMapping(path="/list/{id}")
    public @ResponseBody
    ResponseEntity<Machines> getMachineById(@PathVariable(value = "id") Integer id) {
        Machines machine = service.findById(id);
        return ResponseEntity.ok().body(machine);
    }

    @GetMapping(path = "/find/{machineTypeId}")
    public @ResponseBody
    ResponseEntity<List<Machines>> getMachineByMachineTypeId(@PathVariable(value = "machineTypeId") Integer machineTypeId) {
        List<Machines> machines = service.findByMachineTypeId(machineTypeId);
        return ResponseEntity.ok().body(machines);
    }

    @PutMapping(path="/list/{id}")
    public @ResponseBody
    ResponseEntity<Machines> editMachine(@PathVariable(value = "id") Integer id,
                                         @Valid @RequestBody Machines machineDetails) {
        Machines machine = service.findById(id);

        machine.setMachineTypeId(machineDetails.getMachineTypeId());
        machine.setName(machineDetails.getName());
        machine.setLine(machineDetails.getLine());
        machine.setFaultsCount(machineDetails.getFaultsCount());
        machine.setStatus(machineDetails.getStatus());
        machine.setMail(machineDetails.getMail());
        machine.setCommissionDate(machineDetails.getCommissionDate());

        final Machines updatedMachine = service.save(machine);
        return ResponseEntity.ok().body(updatedMachine);
    }

    //Kérdés törlése
    @DeleteMapping(path="/list/{id}")
    public @ResponseBody
    Map<String, Boolean> deleteMachineById(@PathVariable(value = "id") Integer id) {
        Machines machine = service.findById(id);
        service.delete(machine);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
