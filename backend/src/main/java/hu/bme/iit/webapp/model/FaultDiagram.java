package hu.bme.iit.webapp.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name="fault_diagrams")
public class FaultDiagram {

    public FaultDiagram(){};
    public FaultDiagram(Integer id, String fault_name, Integer machine_type) {
        this.id = id;
        this.fault_name = fault_name;
        this.machine_type = machine_type;
    }

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Integer id;

    private String fault_name;

    private Integer machine_type;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFault_name() {
        return fault_name;
    }

    public void setFault_name(String fault_name) {
        this.fault_name = fault_name;
    }

    public int getMachine_type() {
        return machine_type;
    }

    public void setMachine_type(Integer machine_type) {
        this.machine_type = machine_type;
    }

}
