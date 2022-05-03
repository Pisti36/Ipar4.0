package hu.bme.iit.webapp.controller;

import hu.bme.iit.webapp.model.DiagramElement;
import hu.bme.iit.webapp.service.DiagramElementService;
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
public class DiagramElementController {
    private DiagramElementService diagramElementService;

    public DiagramElementController(DiagramElementService diagramElementService) {
        this.diagramElementService = diagramElementService;
    }

    @PostMapping(path="/add", consumes = MediaType.APPLICATION_JSON_VALUE)
    public DiagramElement createQuestion(@Valid @RequestBody DiagramElement request){
        return diagramElementService.save(request);
    }

    //Node-ok listázása
    @GetMapping(path="/list")
    public @ResponseBody
    List<DiagramElement> getDiagramElementList(){
        return diagramElementService.getAllQuestions();
    }

    //Node-ok keresése id alapján
    @GetMapping(path="/list/{id}")
    public @ResponseBody
    ResponseEntity<DiagramElement> getDiagramElementById(@PathVariable(value = "id") Integer id) {
        DiagramElement diagramElement = diagramElementService.findById(id);
        return ResponseEntity.ok().body(diagramElement);
    }

    //Node-ok keresése machine_type alapján
    @GetMapping(path = "/find/{machine_type}")
    public @ResponseBody
    ResponseEntity<List<DiagramElement>> getDiagramElementByMachineType(@PathVariable(value = "machine_type") String machine_type) {
        List<DiagramElement> diagramElements = diagramElementService.findByMachineType(machine_type);
        return ResponseEntity.ok().body(diagramElements);
    }

    //Node módosítása
    @PutMapping(path="/list/{id}")
    public @ResponseBody
    ResponseEntity<DiagramElement> editDiagramElement(@PathVariable(value = "id") Integer id,
                                                @Valid @RequestBody DiagramElement diagramElementDetails) {
        DiagramElement diagramElement = diagramElementService.findById(id);

        diagramElement.setId(diagramElementDetails.getId());
        diagramElement.setContent(diagramElementDetails.getContent());
        diagramElement.setImage_link(diagramElementDetails.getImage_link());
        diagramElement.setVideo_link(diagramElementDetails.getVideo_link());
        diagramElement.setIsLeaf(diagramElementDetails.isIsLeaf());
        diagramElement.setNext(diagramElementDetails.getNext());
        diagramElement.setMachine_type(diagramElementDetails.getMachine_type());
        diagramElement.setPosition(diagramElementDetails.getPosition());
        diagramElement.setType(diagramElementDetails.getType());

        final DiagramElement updatedDiagramElement = diagramElementService.save(diagramElement);
        return ResponseEntity.ok().body(updatedDiagramElement);
    }

    //Node törlése
    @DeleteMapping(path="/list/{id}")
    public @ResponseBody
    Map<String, Boolean> deleteQuestionById(@PathVariable(value = "id") Integer id) {
        DiagramElement diagramElement = diagramElementService.findById(id);
        diagramElementService.delete(diagramElement);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    //Node-ok törlése machine_type alapján
    @DeleteMapping(path="/delete/{id}")
    public @ResponseBody
    Map<String, Boolean> deleteQuestionsByDiagramId(@PathVariable(value = "id") String machine_type) {
        List<DiagramElement> diagramElements = diagramElementService.findByMachineType(machine_type);
        for (DiagramElement q : diagramElements) {
            diagramElementService.delete(q);
        }
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

}