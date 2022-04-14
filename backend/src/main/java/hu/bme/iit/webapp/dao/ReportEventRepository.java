package hu.bme.iit.webapp.dao;

import hu.bme.iit.webapp.model.Report;
import hu.bme.iit.webapp.model.ReportEvent;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReportEventRepository extends CrudRepository<ReportEvent, Integer> {
    @Query("SELECT distinct reportevent.diagram_id FROM ReportEvent reportevent WHERE reportevent.report_id = :id")
    Integer getStatisticsByMachineId(@Param("id") Integer id);
}
