package hu.bme.iit.webapp.controller;

import hu.bme.iit.webapp.model.FaultDiagram;
import hu.bme.iit.webapp.model.Question;
import hu.bme.iit.webapp.service.FaultDiagramService;
import hu.bme.iit.webapp.service.QuestionService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(path="/faultdiagram")
@RestController
@CrossOrigin(origins = "http://10.9.0.97:4200")
public class FaultDiagramController {
    private FaultDiagramService faultDiagramService;
    private QuestionService questionService;

    FaultDiagramController(FaultDiagramService service, QuestionService questionService){
        this.faultDiagramService = service;
        this.questionService = questionService;
    }

    //Diagramok listázása
    @GetMapping(path="/list")
    public @ResponseBody
    List<FaultDiagram> getFaultDiagramList() {
        return faultDiagramService.getAllDiagram();
    }

    //Diagram keresése id alapján
    @GetMapping(path="/list/{id}")
    public @ResponseBody
    ResponseEntity<FaultDiagram> getFaultDiagramById(@PathVariable(value = "id") Integer faultdiagramid) {
        FaultDiagram diagram = faultDiagramService.find(faultdiagramid);
        return ResponseEntity.ok().body(diagram);
    }

    //Diagram szerkesztése
    @PutMapping(path="/list/{id}")
    public @ResponseBody
    ResponseEntity<FaultDiagram> updateFaultDiagram(@PathVariable(value = "id") Integer faultdiagramid,
        @Valid @RequestBody FaultDiagram diagramDetails) {
        FaultDiagram diagram = faultDiagramService.find(faultdiagramid);

        diagram.setMachine_type(diagramDetails.getMachine_type());
        diagram.setFault_name(diagramDetails.getFault_name());
        final FaultDiagram updatedFaultDiagram = faultDiagramService.save(diagram);
        return ResponseEntity.ok(updatedFaultDiagram);
    }

    //Diagram hozzáadása
    @PostMapping(path="/add", consumes = MediaType.APPLICATION_JSON_VALUE)
    public FaultDiagram createFaultDiagram(@Valid @RequestBody FaultDiagram request){
        return faultDiagramService.save(request);
    }

    //Diagram törlése
    @DeleteMapping(path="/list/{id}")
    public @ResponseBody
    Map<String, Boolean> deleteFaultDiagram(@PathVariable(value = "id") Integer faultdiagramid) {
        if (questionService.findByDiagramId(faultdiagramid) != null){
            List<Question> questions = questionService.findByDiagramId(faultdiagramid);
            for (Question q: questions){
                questionService.delete(q);
            }
        }
        FaultDiagram diagram = faultDiagramService.find(faultdiagramid);
        faultDiagramService.delete(diagram);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    @GetMapping(path="/count")
    List<FaultDiagramService.CountModel> getCount(){
        return faultDiagramService.getCount();
    }

    @GetMapping(path="/diagrams/{id}")
    List<FaultDiagram> getDiagramsByMachineTypeId(@PathVariable(value = "id") Integer machinetypeid){
        return faultDiagramService.getDiagramsByMachineTypeId(machinetypeid);
    }
}
