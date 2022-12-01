package hu.bme.iit.webapp.model;

import java.util.ArrayList;
import java.util.List;

public class MachineTypeStatistics {
    List<String> machines;
    List<Integer> machineReportCount;
    Statistics statistics;

    public MachineTypeStatistics() {
        this.machines = new ArrayList<>();
        this.machineReportCount = new ArrayList<>();
        this.statistics= new Statistics();
    }

    public MachineTypeStatistics(List<String> machines, List<Integer> machineReportCount, Statistics statistics) {
        this.machines = machines;
        this.machineReportCount = machineReportCount;
        this.statistics = statistics;
    }

    public List<String> getMachines() {
        return machines;
    }

    public void setMachines(List<String> machines) {
        this.machines = machines;
    }

    public List<Integer> getMachineReportCount() {
        return machineReportCount;
    }

    public void setMachineReportCount(List<Integer> machineReportCount) {
        this.machineReportCount = machineReportCount;
    }

    public Statistics getStatistics() {
        return statistics;
    }

    public void setStatistics(Statistics statistics) {
        this.statistics = statistics;
    }
}
