package hu.bme.iit.webapp.model;

import javax.persistence.*;

import java.util.Date;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name="report_elements")
public class ReportElements {

    public ReportElements() {}
    public ReportElements( Integer id, Integer report_id, Integer node_id, String summary, Integer count,  Integer duration) {
        this.id = id;
        this.summary = summary;
        this.count = count;
        this.report_id = report_id;
        this.node_id = node_id;
        this.duration = duration;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Integer id;
    @Column(name="report_id")
    private Integer report_id;
    @Column(name="node_id")
    private Integer node_id;
    @Column(name="summary")
    private String summary;
    @Column(name="count")
    private Integer count;
    @Column(name="duration")
    private Integer duration; // duration of time spent in the node in seconds

    public Integer getDuration() {return duration; }

    public void setDuration(Integer duration) { this.duration = duration;}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
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
