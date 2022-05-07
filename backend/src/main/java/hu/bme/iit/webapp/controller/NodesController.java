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
@RequestMapping(path="question")
@RestController
@CrossOrigin(origins = "http://vm.ik.bme.hu:10813")
public class NodesController {
    private NodesService service;

    public NodesController(NodesService questionService) {
        this.service = questionService;
    }

    @PostMapping(path="/add", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Nodes createQuestion(@Valid @RequestBody Nodes request){
        return service.save(request);
    }

    //Kérdések listázása
    @GetMapping(path="/list")
    public @ResponseBody
    List<Nodes> getQuestionList(){
        return service.getAllQuestions();
    }

    //Kérdések keresése id alapján
    @GetMapping(path="/list/{id}")
    public @ResponseBody
    ResponseEntity<Nodes> getQuestionById(@PathVariable(value = "id") Integer id) {
        Nodes question = service.findById(id);
        return ResponseEntity.ok().body(question);
    }

    //Kérdések keresése diagramId alapján
    @GetMapping(path = "/find/{diagramId}")
    public @ResponseBody
    ResponseEntity<List<Nodes>> getQuestionByDiagramId(@PathVariable(value = "diagramId") Integer diagramId) {
        List<Nodes> questions = service.findByDiagramId(diagramId);
        return ResponseEntity.ok().body(questions);
    }

    //Kérdés módosítása
    @PutMapping(path="/list/{id}")
    public @ResponseBody
    ResponseEntity<Nodes> editQuestion(@PathVariable(value = "id") Integer id,
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

        final Nodes updatedQuestion = service.save(node);
        return ResponseEntity.ok().body(updatedQuestion);
    }

    //Kérdés törlése
    @DeleteMapping(path="/list/{id}")
    public @ResponseBody
    Map<String, Boolean> deleteQuestionById(@PathVariable(value = "id") Integer id) {
        Nodes question = service.findById(id);
        service.delete(question);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    //Kérdések törlése diagram alapján
    @DeleteMapping(path="/delete/{id}")
    public @ResponseBody
    Map<String, Boolean> deleteQuestionsByDiagramId(@PathVariable(value = "id") Integer diagramId) {
        List<Nodes> questions = service.findByDiagramId(diagramId);
        for (Nodes q : questions) {
            service.delete(q);
        }
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

}

//getQuestionList
//getQuestionById
//getQuestionByMachineTypeId
//editQuestion
//deleteQuestionById
//deleteQuestionsByMachineTypeId