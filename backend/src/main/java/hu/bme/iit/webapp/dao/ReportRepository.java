package hu.bme.iit.webapp.dao;

import hu.bme.iit.webapp.model.Machines;
import hu.bme.iit.webapp.model.Report;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ReportRepository extends CrudRepository<Report, Integer> {
    @Query("SELECT report FROM Report report WHERE report.machineid = :id")
    List<Report> findFaultsForMachines(@Param("id") Integer id);

    @Query("SELECT report FROM Report report WHERE report.machineid = :id")
    List<Report> findReportByMachineId(@Param("id") Integer id);
}
