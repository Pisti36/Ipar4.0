package hu.bme.iit.webapp.dao;

import hu.bme.iit.webapp.model.Question;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface QuestionRepository extends CrudRepository<Question, Integer> {
    @Query("SELECT question FROM Question question WHERE question.diagram_id = :id")
    Optional<List<Question>> getQuestionsByDiagramId(@Param("id") Integer id);
}
