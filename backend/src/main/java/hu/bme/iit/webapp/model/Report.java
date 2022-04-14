package hu.bme.iit.webapp.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.Instant;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Locale;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name="reports")
public class Report {

    public Report(){}
    public Report(Integer id, String status, Integer machineid, String user, Date time) {
        this.id = id;
        this.status = status;
        this.machineid = machineid;
        this.user = user;
        this.time = time;
    }

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Integer id;
    private String status;
    private Integer machineid;
    private String user;
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

    public Integer getMachineid() {
        return machineid;
    }

    public void setMachineid(Integer machineid) {
        this.machineid = machineid;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }
}
