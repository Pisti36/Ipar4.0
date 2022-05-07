package hu.bme.iit.webapp.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name="report_elements")
public class ReportElements {

    public ReportElements() {}
    public ReportElements(Integer id, String answer, Integer count, Integer report_id, Integer node_id) {
        this.id = id;
        this.answer = answer;
        this.count = count;
        this.report_id = report_id;
        this.node_id = node_id;

    }

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Integer id;
    private String answer;
    private Integer count;
    private Integer report_id;
    private Integer node_id;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public Integer getCount() { return count; }

    public void setCount(Integer count) { this.count = count; }

    public Integer getReport_id() {
        return report_id;
    }

    public void setReport_id(Integer report_id) {
        this.report_id = report_id;
    }

    public Integer getNode_id() {
        return node_id;
    }

    public void setNode_id(Integer node_id) {
        this.node_id = node_id;
    }

}
