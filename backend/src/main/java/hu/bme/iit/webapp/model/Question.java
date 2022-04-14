package hu.bme.iit.webapp.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name="questions")
public class Question {

    public Question(){}
    public Question(
            Integer id,
            String question_id,
            Integer diagram_id,
            String question,
            String question_type,
            boolean expected,
            Integer unit,
            Integer interval_min,
            Integer interval_max,
            String leaf_solution,
            String image_link,
            String video_link,
            String image_link_suggestion,
            String video_link_suggestion) {
        this.id = id;
        this.question_id = question_id;
        this.diagram_id = diagram_id;
        this.question = question;
        this.question_type = question_type;
        this.expected = expected;
        this.unit = unit;
        this.interval_min = interval_min;
        this.interval_max = interval_max;
        this.leaf_solution = leaf_solution;
        this.image_link = image_link;
        this.video_link = video_link;
        this.image_link_suggestion = image_link_suggestion;
        this.video_link_suggestion = video_link_suggestion;
    }

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Integer id;
    private String question_id;
    private Integer diagram_id;
    private String question;
    private String question_type;
    private boolean expected;
    private Integer unit;
    private Integer interval_min;
    private Integer interval_max;
    private String leaf_solution;
    private String image_link;
    private String video_link;
    private String image_link_suggestion;
    private String video_link_suggestion;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getQuestion_id() {
        return question_id;
    }

    public void setQuestion_id(String question_id) {
        this.question_id = question_id;
    }

    public Integer getDiagram_id() {
        return diagram_id;
    }

    public void setDiagram_id(Integer diagram_id) {
        this.diagram_id = diagram_id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getQuestion_type() {
        return question_type;
    }

    public void setQuestion_type(String question_type) {
        this.question_type = question_type;
    }

    public boolean isExpected() {
        return expected;
    }

    public void setExpected(boolean expected) {
        this.expected = expected;
    }

    public Integer getUnit() {
        return unit;
    }

    public void setUnit(Integer unit) {
        this.unit = unit;
    }

    public Integer getInterval_min() {
        return interval_min;
    }

    public void setInterval_min(Integer interval_min) {
        this.interval_min = interval_min;
    }

    public Integer getInterval_max() {
        return interval_max;
    }

    public void setInterval_max(Integer interval_max) {
        this.interval_max = interval_max;
    }

    public String getLeaf_solution() {
        return leaf_solution;
    }

    public void setLeaf_solution(String leaf_solution) {
        this.leaf_solution = leaf_solution;
    }

    public String getImage_link() {
        return image_link;
    }

    public void setImage_link(String image_link) {
        this.image_link = image_link;
    }

    public String getVideo_link() {
        return video_link;
    }

    public void setVideo_link(String video_link) {
        this.video_link = video_link;
    }

    public String getImage_link_suggestion() {
        return image_link_suggestion;
    }

    public void setImage_link_suggestion(String image_link_suggestion) {
        this.image_link_suggestion = image_link_suggestion;
    }

    public String getVideo_link_suggestion() {
        return video_link_suggestion;
    }

    public void setVideo_link_suggestion(String video_link_suggestion) {
        this.video_link_suggestion = video_link_suggestion;
    }
}
