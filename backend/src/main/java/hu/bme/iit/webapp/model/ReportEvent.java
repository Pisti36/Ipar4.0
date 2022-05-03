package hu.bme.iit.webapp.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name="report_event")
public class ReportEvent {

    public ReportEvent() {}
    public ReportEvent(Integer id, Integer report_id, Integer diagram_id, String node_id, String answer, Integer count) {
        this.id = id;
        this.report_id = report_id;
        this.diagram_id = diagram_id;
        this.node_id = node_id;
        this.answer = answer;
        this.count = count;
    }

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Integer id;
    private Integer report_id;
    private Integer diagram_id;
    private String node_id;
    private String answer;
    private Integer count;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getReport_id() {
        return report_id;
    }

    public void setReport_id(Integer report_id) {
        this.report_id = report_id;
    }

    public Integer getDiagram_id() {
        return diagram_id;
    }

    public void setDiagram_id(Integer diagram_id) {
        this.diagram_id = diagram_id;
    }

    public String getNode_id() {
        return node_id;
    }

    public void setNode_id(String node_id) {
        this.node_id = node_id;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }
}
