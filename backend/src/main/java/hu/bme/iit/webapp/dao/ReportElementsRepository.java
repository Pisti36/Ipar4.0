package hu.bme.iit.webapp.dao;

import hu.bme.iit.webapp.model.Report;
import hu.bme.iit.webapp.model.ReportElements;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReportElementsRepository extends CrudRepository<ReportElements, Integer> {
    @Query("SELECT DISTINCT reportelement.node_id FROM ReportElements reportelement WHERE reportelement.report_id = :id")
    Integer getStatisticsByMachineId(@Param("id") Integer id);

    @Query("SELECT reportelements FROM ReportElements reportelements WHERE reportelements.report_id = :id")
    List<ReportElements> getReportElementsByReportId(@Param("id") Integer id);
}
