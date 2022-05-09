package hu.bme.iit.webapp.controller;

import hu.bme.iit.webapp.model.Nodes;
import hu.bme.iit.webapp.service.NodesService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(path="nodes")
@RestController
@CrossOrigin(origins = "http://vm.ik.bme.hu:10813")
public class NodesController {
    private NodesService service;

    public NodesController(NodesService nodesService) {
        this.service = nodesService;
    }

    @PostMapping(path="/add", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Nodes createNode(@Valid @RequestBody Nodes request){
        return service.save(request);
    }

    //Node-ok listázása
    @GetMapping(path="/list")
    public @ResponseBody
    List<Nodes> getNodesList(){
        return service.getAllNodes();
    }

    //Node-ok keresése id alapján
    @GetMapping(path="/list/{id}")
    public @ResponseBody
    ResponseEntity<Nodes> getNodeById(@PathVariable(value = "id") Integer id) {
        Nodes node = service.findById(id);
        return ResponseEntity.ok().body(node);
    }

    //Node-ok keresése machine_type alapján
    @GetMapping(path = "/find/{machine_type}")
    public @ResponseBody
    ResponseEntity<List<Nodes>> findByMachineTypeId(@PathVariable(value = "machine_type") Integer machine_type) {
        List<Nodes> nodes = service.findByMachineTypeId(machine_type);
        return ResponseEntity.ok().body(nodes);
    }

    //Node-ok keresése type alapján
    @GetMapping(path = "/find_by_type/{type}")
    public @ResponseBody
    ResponseEntity<List<Nodes>> findByType(@PathVariable(value = "type") String type) {
        List<Nodes> nodes = service.findByType(type);
        return ResponseEntity.ok().body(nodes);
    }

    //Node módosítása
    @PutMapping(path="/list/{id}")
    public @ResponseBody
    ResponseEntity<Nodes> editNode(@PathVariable(value = "id") Integer id,
                                          @Valid @RequestBody Nodes nodeDetails) {
        Nodes node = service.findById(id);

        node.setId(nodeDetails.getId());
        node.setPosition(nodeDetails.getPosition());
        node.setMachine_type(nodeDetails.getMachine_type());
        node.setContent(nodeDetails.getContent());
        node.setLeaf(nodeDetails.getLeaf());
        node.setContent(nodeDetails.getContent());
        node.setNext(nodeDetails.getNext());
        node.setImage_link(nodeDetails.getImage_link());
        node.setVideo_link(nodeDetails.getVideo_link());

        final Nodes updatedNode = service.save(node);
        return ResponseEntity.ok().body(updatedNode);
    }

    //Node törlése
    @DeleteMapping(path="/list/{id}")
    public @ResponseBody
    Map<String, Boolean> deleteQuestionById(@PathVariable(value = "id") Integer id) {
        Nodes question = service.findById(id);
        service.delete(question);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    //Node-ok törlése machine_type alapján
    @DeleteMapping(path="/delete/{id}")
    public @ResponseBody
    Map<String, Boolean> deleteNodesByMachineTypeId(@PathVariable(value = "id") Integer machine_type) {
        List<Nodes> nodes = service.findByMachineTypeId(machine_type);
        for (Nodes q : nodes) {
            service.delete(q);
        }
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

}