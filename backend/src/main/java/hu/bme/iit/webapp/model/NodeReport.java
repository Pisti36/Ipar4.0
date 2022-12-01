package hu.bme.iit.webapp.model;

public class NodeReport {
    Integer nodeId;
    String summary;
    Integer duration;

    public NodeReport(Integer nodeId, String summary, Integer duration) {
        this.nodeId = nodeId;
        this.summary = summary;
        this.duration = duration;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public Integer getNodeId() {
        return nodeId;
    }

    public void setNodeId(Integer nodeId) {
        this.nodeId = nodeId;
    }
}