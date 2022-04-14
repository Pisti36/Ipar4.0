package hu.bme.iit.webapp.controller;

import hu.bme.iit.webapp.model.FaultDiagram;
import hu.bme.iit.webapp.model.Question;
import hu.bme.iit.webapp.service.QuestionService;
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
@CrossOrigin(origins = "http://10.9.0.97:4200")
public class QuestionController {
    private QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @PostMapping(path="/add", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Question createQuestion(@Valid @RequestBody Question request){
        return questionService.save(request);
    }

    //Kérdések listázása
    @GetMapping(path="/list")
    public @ResponseBody
    List<Question> getQuestionList(){
        return questionService.getAllQuestions();
    }

    //Kérdések keresése id alapján
    @GetMapping(path="/list/{id}")
    public @ResponseBody
    ResponseEntity<Question> getQuestionById(@PathVariable(value = "id") Integer id) {
        Question question = questionService.findById(id);
        return ResponseEntity.ok().body(question);
    }

    //Kérdések keresése diagramId alapján
    @GetMapping(path = "/find/{diagramId}")
    public @ResponseBody
    ResponseEntity<List<Question>> getQuestionByDiagramId(@PathVariable(value = "diagramId") Integer diagramId) {
        List<Question> questions = questionService.findByDiagramId(diagramId);
        return ResponseEntity.ok().body(questions);
    }

    //Kérdés módosítása
    @PutMapping(path="/list/{id}")
    public @ResponseBody
    ResponseEntity<Question> editQuestion(@PathVariable(value = "id") Integer id,
                                          @Valid @RequestBody Question questionDetails) {
        Question question = questionService.findById(id);

        question.setQuestion_id(questionDetails.getQuestion_id());
        question.setDiagram_id(questionDetails.getDiagram_id());
        question.setQuestion(questionDetails.getQuestion());
        question.setQuestion_type(questionDetails.getQuestion_type());
        question.setExpected(questionDetails.isExpected());
        question.setUnit(questionDetails.getUnit());
        question.setInterval_min(questionDetails.getInterval_min());
        question.setInterval_max(questionDetails.getInterval_max());
        question.setLeaf_solution(questionDetails.getLeaf_solution());
        question.setImage_link(questionDetails.getImage_link());
        question.setImage_link_suggestion(questionDetails.getImage_link_suggestion());
        question.setVideo_link(questionDetails.getVideo_link());
        question.setVideo_link_suggestion(questionDetails.getVideo_link_suggestion());

        final Question updatedQuestion = questionService.save(question);
        return ResponseEntity.ok().body(updatedQuestion);
    }

    //Kérdés törlése
    @DeleteMapping(path="/list/{id}")
    public @ResponseBody
    Map<String, Boolean> deleteQuestionById(@PathVariable(value = "id") Integer id) {
        Question question = questionService.findById(id);
        questionService.delete(question);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    //Kérdések törlése diagram alapján
    @DeleteMapping(path="/delete/{id}")
    public @ResponseBody
    Map<String, Boolean> deleteQuestionsByDiagramId(@PathVariable(value = "id") Integer diagramId) {
        List<Question> questions = questionService.findByDiagramId(diagramId);
        for (Question q : questions) {
            questionService.delete(q);
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