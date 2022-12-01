package hu.bme.iit.webapp.model;

import javax.persistence.*;
import java.util.Date;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name="reports")
public class Report {

    public Report(){}
    public Report(String status, Integer machinetype_id, Integer machine_id, Date starttime, Date endtime, Integer lastNode) {
        this.status = status;
        this.machinetype_id = machinetype_id;
        this.machine_id = machine_id;
        this.startTime = starttime;
        this.endTime = endtime;
        this.lastNode = lastNode;
    }

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name="id")
    private Integer id;
    @Column(name="status")
    private String status;
    @Column(name="machinetype_id")
    private Integer machinetype_id;
    @Column(name="machine_id")
    private Integer machine_id;
    @Column(name="start_time")
    private Date startTime;
    @Column(name="end_time")
    private Date endTime;
    @Column(name="last_node")
    private Integer lastNode;

    public Integer getLastNode() {
        return lastNode;
    }

    public void setLastNode(Integer lastNode) {
        this.lastNode = lastNode;
    }

    public Date getEndTime() { return endTime;}

    public void setEndTime(Date endtime) {this.endTime = endtime; }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getMachineType_id() {
        return machinetype_id;
    }

    public void setMachineType_id(Integer machinetype_id) {
        this.machinetype_id = machinetype_id;
    }

    public Integer getMachine_id() {
        return machine_id;
    }

    public void setMachine_id(Integer machine_id) {
        this.machine_id = machine_id;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date time) {
        this.startTime = time;
    }

}
