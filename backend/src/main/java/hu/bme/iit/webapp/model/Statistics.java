package hu.bme.iit.webapp.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Statistics {
    Integer solved;
    Integer unsolved;
    List<Date> reportTimes;
    List<Integer> reportsTimesSinceComission;
    List<Integer> reportDuration;
    List<NodeReport> nodeReports;

    public Statistics(Integer solved, Integer unsolved, List<Date> reportsTimes, List<Integer> reportsTimesSinceComission, List<Integer> reportDuration, List<NodeReport> nodeReports) {
        this.solved = solved;
        this.unsolved = unsolved;
        this.reportTimes = reportsTimes;
        this.reportsTimesSinceComission = reportsTimesSinceComission;
        this.reportDuration = reportDuration;
        this.nodeReports = nodeReports;
    }

    public Statistics() {
        this.solved = 0;
        this.unsolved = 0;
        this.reportTimes= new ArrayList<>();
        this.reportsTimesSinceComission= new ArrayList<>();
        this.reportDuration = new ArrayList<>();
        this.nodeReports= new ArrayList<>();
    }

    public Integer getSolved() {
        return solved;
    }

    public void setSolved(Integer solved) {
        this.solved = solved;
    }

    public Integer getUnsolved() {
        return unsolved;
    }

    public void setUnsolved(Integer unsolved) {
        this.unsolved = unsolved;
    }

    public List<Date> getReportTimes() {
        return reportTimes;
    }

    public void setReportTimes(List<Date> reportTimes) {
        this.reportTimes = reportTimes;
    }

    public List<Integer> getReportsTimesSinceComission() {
        return reportsTimesSinceComission;
    }

    public void setReportsTimesSinceComission(List<Integer> reportsTimesSinceComission) {
        this.reportsTimesSinceComission = reportsTimesSinceComission;
    }

    public List<Integer> getReportDuration() {
        return reportDuration;
    }

    public void setReportDuration(List<Integer> reportDuration) {
        this.reportDuration = reportDuration;
    }

    public List<NodeReport> getNodeReports() {
        return nodeReports;
    }

    public void setNodeReports(List<NodeReport> nodeReports) {
        this.nodeReports = nodeReports;
    }
}
