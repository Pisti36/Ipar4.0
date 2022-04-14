package hu.bme.iit.webapp.domain;

import java.util.Date;

public class MachineStatisticsData {

    private Integer report_id;
    private String status;
    private Integer machineid;
    private Integer diagram_id;

    public MachineStatisticsData(Integer report_id, String status, Integer machineid, Integer diagram_id) {
        this.report_id = report_id;
        this.status = status;
        this.machineid = machineid;
        this.diagram_id = diagram_id;
    }

    public MachineStatisticsData() {

    }

    public Integer getReport_id() {
        return report_id;
    }

    public void setReport_id(Integer report_id) {
        this.report_id = report_id;
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

    public Integer getDiagram_id() {
        return diagram_id;
    }

    public void setDiagram_id(Integer diagram_id) {
        this.diagram_id = diagram_id;
    }
}
