package hu.bme.iit.webapp.model;

import javax.persistence.*;
import java.util.Date;


@Entity
@Table(name="machines")
public class Machines {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String name;
    private Integer line;
    private Integer faultsCount;
    private Integer status;
    private String mail;
    private Date commissionDate;
    private Integer machineTypeId;

    public Machines(){}

    public Machines(Integer id, String name, Integer line, Integer faultsCount, Integer status, String mail, Date commissionDate, Integer machineTypeId){
        this.id = id;
        this.name = name;
        this.line = line;
        this.faultsCount = faultsCount;
        this.status = status;
        this.mail = mail;
        this.commissionDate = commissionDate;
        this.machineTypeId = machineTypeId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getLine() {
        return line;
    }

    public void setLine(Integer line) {
        this.line = line;
    }

    public Integer getFaultsCount() {
        return faultsCount;
    }

    public void setFaultsCount(Integer faultsCount) {
        this.faultsCount = faultsCount;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public Date getCommissionDate() {
        return commissionDate;
    }

    public void setCommissionDate(Date commissionDate) {
        this.commissionDate = commissionDate;
    }

    public Integer getMachineTypeId() {
        return machineTypeId;
    }

    public void setMachineTypeId(Integer machineTypeId) {
        this.machineTypeId = machineTypeId;
    }
}
