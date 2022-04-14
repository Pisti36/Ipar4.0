package hu.bme.iit.webapp.controller;

import hu.bme.iit.webapp.model.Machine;
import hu.bme.iit.webapp.model.MachineType;
import hu.bme.iit.webapp.service.MachineService;
import hu.bme.iit.webapp.service.MachineTypeService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(path="/machinetype")
@RestController
@CrossOrigin(origins = "http://10.9.0.97:4200")
public class MachineTypeController {

    private MachineTypeService machineTypeService;
    private MachineService machineService;

    MachineTypeController(MachineTypeService m, MachineService ms){
        this.machineTypeService = m;
        this.machineService = ms;
    }

    @GetMapping(path="/count")
    public @ResponseBody
        //MachineTypeListResponse (machineList: List<MachineType>)
    List<MachineType> getAllMachineTypes(/*Requestparam annotáció és requestmachinetype*/) {
        List<MachineType> list =  machineTypeService.getAllMachineTypes();
        list.forEach(e -> {
            e.setCount(machineService.getCountById(e.getId()));
        });
        return list;
    }

    @PostMapping(path="/add", consumes = MediaType.APPLICATION_JSON_VALUE)
    public MachineType createMachineType(@Valid @RequestBody MachineType request){
        return machineTypeService.save(request);
    }

    @GetMapping(path="/list")
    public @ResponseBody
    List<MachineType> getMachineTypeList(){
        return machineTypeService.getAllMachineTypes();
    }

    @GetMapping(path="/list/{id}")
    public @ResponseBody
    ResponseEntity<MachineType> getMachineTypeById(@PathVariable(value = "id") Integer id) {
        MachineType machineType = machineTypeService.findById(id);
        return ResponseEntity.ok().body(machineType);
    }

    @PutMapping(path="/list/{id}")
    public @ResponseBody
    ResponseEntity<MachineType> editMachineType(@PathVariable(value = "id") Integer id,
                                          @Valid @RequestBody MachineType machineTypeDetails) {
        MachineType machineType = machineTypeService.findById(id);

        machineType.setName(machineTypeDetails.getName());
        machineType.setImage(machineTypeDetails.getImage());
        machineType.setComment(machineTypeDetails.getComment());

        final MachineType updatedMachineType = machineTypeService.save(machineType);
        return ResponseEntity.ok().body(updatedMachineType);
    }

    @DeleteMapping(path="/list/{id}")
    public @ResponseBody
    Map<String, Boolean> deleteMachineTypeById(@PathVariable(value = "id") Integer id) {
        if ( machineService.findByMachineTypeId(id) != null){
            List<Machine> machines = machineService.findByMachineTypeId(id);
            for (Machine m: machines) {
                machineService.delete(m);
            }
        }
        MachineType machineType = machineTypeService.findById(id);
        machineTypeService.delete(machineType);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
