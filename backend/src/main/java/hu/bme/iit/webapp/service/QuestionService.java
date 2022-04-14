package hu.bme.iit.webapp.service;

import hu.bme.iit.webapp.dao.QuestionRepository;
import hu.bme.iit.webapp.model.Question;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Transactional
@Service
public class QuestionService {
    QuestionRepository questionrepository;

    public QuestionService(QuestionRepository questionrepository) {
        this.questionrepository = questionrepository;
    }

    public List<Question> getAllQuestions(){
        List<Question> list = new ArrayList<>();
        questionrepository.findAll().forEach(list::add);
        return list;
    }

    public Question findById(Integer id) {
        return questionrepository.findById(id).orElse(null);
    }

    public List<Question> findByDiagramId (Integer machineTypeId){
        return questionrepository.getQuestionsByDiagramId(machineTypeId).orElse(null);
    }

    public Question save (Question question){
        questionrepository.save(question);
        return question;
    }

    public void delete(Question question){
        questionrepository.delete(question);
    }

}
