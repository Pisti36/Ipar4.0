package hu.bme.iit.webapp.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name="reports")
public class Report {

    public Report(){}
    public Report(Integer id, String status, Integer user_id, Integer machine_id, Date time) {
        this.id = id;
        this.status = status;
        this.user_id = user_id;
        this.machine_id = machine_id;
        this.time = time;
    }

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Integer id;
    private String status;
    private Integer user_id;
    private Integer machine_id;
    private Date time;

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

    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }

    public Integer getMachine_id() {
        return machine_id;
    }

    public void setMachine_id(Integer machine_id) {
        this.machine_id = machine_id;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

}
